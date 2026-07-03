'use strict';

const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, screen } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const fs   = require('fs');

// ─── 자동 업데이트 설정 ─────────────────────────────────────
autoUpdater.autoDownload = false;
autoUpdater.on('update-available', (info) => {
  if (mainWindow) mainWindow.webContents.send('update-available', info);
});
autoUpdater.on('download-progress', (progressObj) => {
  if (mainWindow) mainWindow.webContents.send('download-progress', progressObj);
});
autoUpdater.on('update-downloaded', (info) => {
  if (mainWindow) mainWindow.webContents.send('update-downloaded', info);
});
autoUpdater.on('error', (err) => {
  console.error('자동 업데이트 오류:', err);
});

// ─── 간단한 JSON 파일 기반 영구 저장소 ───────────────
const userDataPath = app.getPath('userData');
const configFile   = path.join(userDataPath, 'config.json');

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(configFile, 'utf-8'));
  } catch {
    return {};
  }
}

function saveConfig(data) {
  try {
    fs.mkdirSync(userDataPath, { recursive: true });
    fs.writeFileSync(configFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('설정 저장 실패:', e);
  }
}

function getConfig(key, defaultValue) {
  const cfg = loadConfig();
  return cfg[key] !== undefined ? cfg[key] : defaultValue;
}

function setConfig(key, value) {
  const cfg = loadConfig();
  cfg[key] = value;
  saveConfig(cfg);
}

// ─── 상태 ─────────────────────────────────────────────
let mainWindow = null;
let tray       = null;

// ─── 창 생성 ─────────────────────────────────────────
function createWindow() {
  const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;
  const savedBounds = getConfig('windowBounds', {});
  const width  = savedBounds.width  || 420;
  const height = savedBounds.height || 680;
  const x = savedBounds.x !== undefined ? savedBounds.x : sw - width - 24;
  const y = savedBounds.y !== undefined ? savedBounds.y : sh - height - 24;

  mainWindow = new BrowserWindow({
    x, y, width, height,
    minWidth: 320,
    minHeight: 400,
    frame: false,
    resizable: true,
    skipTaskbar: false,
    alwaysOnTop: false,
    backgroundColor: '#0d0f17',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  // 창 이동/크기 변경 시 저장
  const saveBounds = () => {
    if (mainWindow) setConfig('windowBounds', mainWindow.getBounds());
  };
  mainWindow.on('moved',   saveBounds);
  mainWindow.on('resized', saveBounds);
  mainWindow.on('closed',  () => { mainWindow = null; });
}

// ─── 시스템 트레이 ────────────────────────────────────
function createTray() {
  try {
    // 기본 내장 아이콘 사용
    const icon = nativeImage.createFromDataURL(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAW0lEQVQ4jWNgGAWDDPz//58hLS2NgYGBgRUDA8N/IiT+MzAwMBAr+Z+BgYGBiIAli2lgYGBg+P//P8P//4yMjAyUGDiqGUQDIxoYNYOogVEzKBkAAAAAAP//AwABgAF/hc3REQAAAABJRU5ErkJggg=='
    );

    tray = new Tray(icon);

    const buildMenu = () => Menu.buildFromTemplate([
      {
        label: '체크리스트 보기/숨기기',
        click: () => {
          if (!mainWindow) { createWindow(); return; }
          mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
        }
      },
      { type: 'separator' },
      {
        label: '시작 시 자동 실행',
        type: 'checkbox',
        checked: getConfig('autoLaunch', false),
        click: (item) => {
          const enable = item.checked;
          setConfig('autoLaunch', enable);
          try {
            app.setLoginItemSettings({ openAtLogin: enable, openAsHidden: true });
          } catch (err) {
            console.error('자동 실행 설정 오류:', err);
          }
          // 메뉴 갱신
          tray.setContextMenu(buildMenu());
        }
      },
      { type: 'separator' },
      { label: '종료', click: () => app.quit() }
    ]);

    tray.setToolTip('체크리스트 위젯');
    tray.setContextMenu(buildMenu());
    tray.on('double-click', () => {
      if (!mainWindow) { createWindow(); return; }
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
  } catch (err) {
    console.error('시스템 트레이 생성 오류 (무시됨):', err);
  }
}

// ─── IPC ─────────────────────────────────────────────
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-hide',     () => mainWindow?.hide());
ipcMain.on('window-close',    () => app.quit());

ipcMain.on('start-download',  () => autoUpdater.downloadUpdate());
ipcMain.on('quit-and-install', () => autoUpdater.quitAndInstall());

// ─── 앱 초기화 ───────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  createTray();
  try {
    app.setLoginItemSettings({
      openAtLogin: getConfig('autoLaunch', false),
      openAsHidden: true,
    });
  } catch (err) {
    console.error('자동 실행 동기화 오류:', err);
  }

  // Windows 빌드된 버전에서만 3초 후 업데이트 체크
  setTimeout(() => {
    if (process.platform === 'win32' && app.isPackaged) {
      autoUpdater.checkForUpdates().catch(err => console.error(err));
    }
  }, 3000);
});

// 모든 창 닫혀도 트레이로 유지
app.on('window-all-closed', (e) => e.preventDefault());
