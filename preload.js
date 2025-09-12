// 导入ipcRenderer模块
const { ipcRenderer } = require('electron')

window.electronAPI = {
  readExcelFile: () => ipcRenderer.invoke('read-excel-file'),
  closeApp: () => ipcRenderer.send('close-app')
}