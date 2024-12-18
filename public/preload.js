const { contextBridge, ipcRenderer } = require('electron');

// Expose a secure API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Function to send data to the main process
  send: (channel, data) => {
    const validChannels = ['toMain']; // Define allowed channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // Function to receive data from the main process
  receive: (channel, callback) => {
    const validChannels = ['fromMain']; // Define allowed channels
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
  // Function to invoke a synchronous event
  invoke: async (channel, data) => {
    const validChannels = ['invokeMain']; // Define allowed channels
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, data);
    }
  },
});
