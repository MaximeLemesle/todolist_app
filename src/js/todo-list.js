import { generateId } from "./utils.js";

const input = document.querySelector("#input");
const button = document.querySelector("#add_task");
const list = document.querySelector("#list");

// Ajout d'une tache
function addTask(task) {
  const id = generateId();

  const listItem = document.createElement("li");
  listItem.classList.add("item");
  listItem.id = id;
  listItem.innerHTML = `
    <div class="check"></div>
    <div class="content">
        <p class="text">${task}</p>
    </div>
    <img class="icon" src="images/poubelle.png" alt="delete task">
  `;
  list.appendChild(listItem);
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
        } else {
          element.setAttribute("checked", true);
        }
      });
    });
  }
}
const observer = new MutationObserver(callback);
observer.observe(list, { attributes: true, childList: true, subtree: true });
