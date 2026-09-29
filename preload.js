const { contextBridge, ipcRenderer, webUtils } = require("electron");

// The web app detects this bridge and enables desktop-only features
// (move to Trash). In a plain browser it's absent and the app stays read-only.
contextBridge.exposeInMainWorld("photostackerDesktop", {
  isDesktop: true,
  /** Resolve real filesystem paths for File objects (Electron ≥32 removed File.path). */
  getPaths: (files) =>
    files.map((f) => {
      try {
        return webUtils.getPathForFile(f);
      } catch {
        return f.path || "";
      }
    }),
  trashFiles: (paths) => ipcRenderer.invoke("trash-files", paths),
});
