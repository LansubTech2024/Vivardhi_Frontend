
import { app, BrowserWindow, protocol } from 'electron';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createWindow() {
  const isDev = (await import('electron-is-dev')).default;

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Ensure this file exists
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.resolve(__dirname, '../build/index.html')}`;

  console.log('Start URL:', startURL); // Debugging

  try {
    await win.loadURL(startURL);
  } catch (error) {
    console.error('Error loading the URL:', error);
  }

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(() => {
  console.log('App is ready');
  try {
    createWindow();
  } catch (error) {
    console.error('Error creating the window:', error);
  }

  app.on('activate', () => {
    console.log('App activated');
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  console.log('All windows closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Enable file protocol
app.whenReady().then(() => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substring(7);
    callback({ path: path.normalize(url) });
  });
});
