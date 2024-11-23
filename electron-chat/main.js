//main process run this process 
const { app, BrowserWindow ,Notification} = require('electron');
const path = require('path');
const { electron } = require('process');
const isDev = !app.isPackaged;

function createWindow() {
    //Browser  window is rendering process 
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation:true
    }
    
  })

  win.loadFile('index.html')
  // win.webContents.openDevTools();
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });
}


// console.log('Hello World');
app.whenReady()
.then(() =>{
    createWindow();
    const notification = new Notification({title:"hello world",body:"My test massage"});
    notification.show();
});

