import express from "express";
import mongoose from "mongoose";

// Création du serveur
const PORT = 8080;
const app = express();

// Connexion à la db
const connectionString =
  "mongodb+srv://maximelemesle2:rl4TUckUBGQ7BNUX@todolist.de87k7p.mongodb.net/?retryWrites=true&w=majority&appName=TodoList";

// Middleware
app.use(express.json());

// Création de la page home
app.get("/", (req, res) => {
  res.render("index");
});

// Page todo
import todos from "./routes/todos.routes.js";
app.use("/todos", todos);

const connectDB = (url) => {
  return mongoose.connect(url);
};

// Lancement du serveur
async function start() {
  try {
    await connectDB(connectionString);
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
