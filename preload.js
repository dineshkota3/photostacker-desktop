const { contextBridge, ipcRenderer } = require("electron");

// The web app detects this bridge and enables desktop-only features
// (move to Trash). In a plain browser it's absent and the app stays read-only.
contextBridge.exposeInMainWorld("photostackerDesktop", {
  isDesktop: true,
  trashFiles: (paths) => ipcRenderer.invoke("trash-files", paths),
});
