const { ipcRenderer } = require('electron')

window.electronAPI = {
  readExcelFile: () => ipcRenderer.invoke('read-excel-file')
}