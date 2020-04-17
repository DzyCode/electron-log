'use strict'

import { app, protocol, BrowserWindow, ipcMain, Event, Menu, net } from 'electron';

import { platform } from 'os';

const isDevelopment = process.env.NODE_ENV !== 'production';

let win: BrowserWindow | null;

function createWindow () {
  // Create the browser window.
  let width = 360;
  if(process.env.WEBPACK_DEV_SERVER_URL) {
    width = 1360;
  }
  win = new BrowserWindow({ width: width, height: 640, resizable: false, autoHideMenuBar: true, webPreferences: {
    nodeIntegration: true,
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    win.webContents.on('devtools-opened', () => {
      win?.webContents.closeDevTools();
    })
    // Load the index.html when not in development
    win.loadURL('index.html')
  }

  const minimizeWindowToTray = (event: Event) => {
    if (!win) {
      return;
    }
    event.preventDefault();  // Prevent the app from exiting on the 'close' event.
    win.hide();
  };
  win.on('minimize', minimizeWindowToTray);
  win.on('close', minimizeWindowToTray);
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  } else {
    win.show();
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
} else {

}
