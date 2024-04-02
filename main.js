import { app, BrowserWindow, ipcMain } from "electron";
// import icon from "./src/images/logo-todolist.png?asset";
import path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 600,
    width: 900,
    height: 800,
    autoHideMenuBar: true,
    // icon: icon,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Affiche les devsTools
  win.webContents.openDevTools();

  win.loadFile("./src/index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
