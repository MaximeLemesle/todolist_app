import { generateId } from "./utils.js";

const input = document.querySelector("#input");
const button = document.querySelector("#add_task");
const list = document.querySelector("#list");

let tasks = [];
const check = document.querySelectorAll(".check");

// Ajout d'une tache
function addTask(task) {
  const id = generateId();

  tasks.push({ id, task, checked: false });

  if (input.value !== "") {
    task = input.value;

    const id = generateId();

    list.innerHTML += `
      <li class="item" id="${id}">
          <div class="check"></div>
          <div class="content">
              <p class="text">${task}</p>
          </div>
          <img class="icon" src="images/poubelle.png" alt="delete task">
      </li>`;

    input.value = "";

    saveTasksInJson();
  }
}

// Ajout d'une tache avec le btn "ajouter"
button.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    addTask(input.value.trim());
    input.value = "";
  }
});

// Ajout d'une tache avec la touche entrer
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && input.value.trim() !== "") {
    addTask(input.value.trim());
    input.value = "";
  }
});

// Détecter les changements
function callback(list) {
  for (let i = 0; i < list.length; i++) {
    const elements = list[i].addedNodes;
    elements.forEach((element) => {
      element.addEventListener("click", () => {
        const checked = element.getAttribute("checked");

        if (checked) {
          element.removeAttribute("checked");
          fs.writeFile;
        } else {
          element.setAttribute("checked", true);
        }
      });
    });
  }
}
const observer = new MutationObserver(callback);
observer.observe(list, { attributes: true, childList: true, subtree: true });

// Sauvegarder les taches
const saveTasksInJson = () => {
  fs.writeFile("../data/data.json", JSON.stringify(tasks), (err) => {
    if (err) throw err;
    console.log("Tasks saved :" + tasks)
  })
};

// Afficher les taches
const loadTasksFromJson = () => {
  fs.readFile("../data/data.json", (err, data) => {
    if (err) throw err;
    tasks = JSON.parse(data);
    tasks.forEach((task) => {
      addTaskToList(task.task, task.id, task.checked);
    });
  });
};

window.addEventListener("load", () => {
  loadTasksFromJson();
});
