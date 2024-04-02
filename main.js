import { app, BrowserWindow } from "electron";
import sqlite3 from "sqlite3";
// import icon from "./src/images/logo-todolist.png?asset";

// Mise en place de la db locale
const dbPath = "./src/data/tasks.db";

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) throw err;

  console.log(`Database start on ${dbPath}`);

  db.run(
    "CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY, task TEXT, checked BOOLEAN)"
  );
});

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

app.on("will-quit", () => {
  db.close();
});
