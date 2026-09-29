const { app, BrowserWindow, shell, ipcMain, dialog } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 860,
    title: "Photo Stacker",
    backgroundColor: "#0f1115",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile(path.join(__dirname, "web", "dist", "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// ---- Desktop-only capabilities (web version stays read-only) ----

/** Move files to the macOS Trash (recoverable, never a hard delete). */
ipcMain.handle("trash-files", async (_evt, paths) => {
  if (!Array.isArray(paths) || paths.length === 0) return { ok: false };
  // Test hook: PHOTOSTACKER_AUTOCONFIRM=1 skips the native dialog (used by
  // the automated e2e test only).
  if (process.env.PHOTOSTACKER_AUTOCONFIRM !== "1") {
    const confirm = await dialog.showMessageBox(win, {
      type: "warning",
      buttons: ["Cancel", `Move ${paths.length} to Trash`],
      defaultId: 1,
      message: `Move ${paths.length} photo${paths.length !== 1 ? "s" : ""} to the Trash?`,
      detail: "You can restore them from the Trash. This cannot be done from the browser version.",
    });
    if (confirm.response !== 1) return { ok: false, cancelled: true };
  }
  const failed = [];
  for (const p of paths) {
    try {
      await shell.trashItem(p);
    } catch {
      failed.push(p);
    }
  }
  return { ok: failed.length === 0, failed };
});
