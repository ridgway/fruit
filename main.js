const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const XLSX = require('xlsx')
require('@electron/remote/main').initialize()

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js') // 添加preload配置
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
  win.webContents.openDevTools();
}

// 添加IPC处理器来读取Excel文件
ipcMain.handle('read-excel-file', async (event) => {
  console.log('=== IPC处理器被调用 ===');
  try {
    const excelPath = path.join(__dirname, 'src', 'meituan.xlsx')
    console.log('Excel文件路径:', excelPath);
    
    // 检查文件是否存在
    if (!fs.existsSync(excelPath)) {
      console.log('Excel文件不存在:', excelPath);
      return { success: false, error: 'Excel文件不存在: ' + excelPath }
    }
    
    console.log('Excel文件存在，开始读取...');
    
    // 读取文件内容
    const fileData = fs.readFileSync(excelPath)
    console.log('文件读取成功，数据大小:', fileData.length, 'bytes');
    
    const result = { success: true, data: fileData, path: excelPath }
    console.log('返回结果:', result);
    return result
  } catch (error) {
    console.error('读取Excel文件时出错:', error);
    return { success: false, error: error.message }
  }
})

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