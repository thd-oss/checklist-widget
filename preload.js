'use strict';
const { contextBridge, ipcRenderer } = require('electron');

// 렌더러에서 안전하게 IPC 호출
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  hide:     () => ipcRenderer.send('window-hide'),
  close:    () => ipcRenderer.send('window-close'),
});
