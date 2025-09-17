# 水果工具应用

## 应用图标设置

为了为应用设置启动图标，请按照以下步骤操作：

### 1. 创建build目录
在项目根目录下创建一个名为`build`的文件夹。

### 2. 准备图标文件
将`images/logo.png`转换为以下格式并放入build目录：

- Windows: `icon.ico` (256x256像素)
- macOS: `icon.icns` (包含多种尺寸的图标)

### 3. 转换图标的方法

#### 使用在线工具转换
1. 访问在线图标转换网站，如 https://convertio.co/zh/png-ico/
2. 上传`images/logo.png`文件
3. 选择转换为ICO格式（Windows）或ICNS格式（macOS）
4. 下载转换后的文件并放入build目录

#### 使用Node.js脚本转换
可以安装`electron-icon-builder`包自动生成所需格式的图标：

```bash
npm install --save-dev electron-icon-builder
```

然后在package.json中添加脚本：

```json
"scripts": {
  "build-icon": "electron-icon-builder --input=./images/logo.png --output=./build"
}
```

运行以下命令生成图标：

```bash
npm run build-icon
```

### 4. 构建应用
完成图标设置后，可以运行以下命令构建应用：

```bash
npm run build:win  # 构建Windows版本
npm run build:mac  # 构建macOS版本
```

构建后的应用将显示您设置的图标。