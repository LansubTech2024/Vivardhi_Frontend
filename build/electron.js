import { app, BrowserWindow } from 'electron';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Manually define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createWindow() {
  const isDev = await import('electron-is-dev');  // Dynamic import for electron-is-dev

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // __dirname now defined
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const startURL = isDev.default
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  win.loadURL(startURL);

  if (isDev.default) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
