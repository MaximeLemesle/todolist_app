import { app, BrowserWindow, ipcMain } from "electron";
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

// Créer la fenetre d'affichage
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

  win.webContents.on("did-finish-load", () => {
    win.webContents.executeJavaScript(`
      addTask('Nouvelle tâche');
    `);
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Arrete l'app quand la fenetre se ferme
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Ferme la db quand l'app se ferme
app.on("before-quit", () => {
  db.close();
});

// Écoute l'event "add-task"
ipcMain.on("add-task", (event, task) => {
  db.run(
    "INSERT INTO Tasks (task, checked) VALUES (?, ?)",
    [task, false],
    (err) => {
      if (err) {
        console.error(err.message);
        // Envoie une réponse au processus de rendu avec le statut d'erreur
        event.reply("add-task-response", { success: false, error: err.message });
      } else {
        console.log("Task added:", task);
        // Envoie une réponse au processus de rendu pour indiquer que la tâche a été ajoutée avec succès
        event.reply("add-task-response", { success: true });
      }
    }
  );
});


// erreur lors de l'ajout d'une tache à ma db, comment faire le lien entre todo-list.js et main.js 