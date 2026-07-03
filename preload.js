'use strict';
const { contextBridge, ipcRenderer } = require('electron');

// 렌더러에서 안전하게 IPC 호출
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  hide:     () => ipcRenderer.send('window-hide'),
  close:    () => ipcRenderer.send('window-close'),
  
  // 자동 업데이트
  startDownload: () => ipcRenderer.send('start-download'),
  quitAndInstall: () => ipcRenderer.send('quit-and-install'),
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', (event, info) => callback(info)),
  onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (event, progressObj) => callback(progressObj)),
  onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', (event, info) => callback(info)),
});
