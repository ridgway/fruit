const { app, BrowserWindow } = require('electron')
const path = require('path')
require('@electron/remote/main').initialize()

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  require('@electron/remote/main').enable(win.webContents)
  win.loadFile('app.html')
  // 开发时可以打开开发者工具
  // win.webContents.openDevTools()

  // 添加窗口关闭事件处理
  win.on('closed', () => {
    app.quit()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) 