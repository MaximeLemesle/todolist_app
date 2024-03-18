import { app, BrowserWindow } from "electron";
// import icon from "./src/images/logo-todolist.png?asset"

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    autoHideMenuBar: true,
    // icon: icon,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("./src/index.html");
  win.webContents.openDevTools();
};

try {
  require("electron-reloader")(module, {
    debug: true,
    watchRenderer: true,
  });
} catch (_) {}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
