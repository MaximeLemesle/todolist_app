import Store from "electron-store";
import { generateId } from "./utils";

const store = new Store();

const input = document.querySelector("#input");
const button = document.querySelector("#add_task");
const list = document.querySelector("#list");

let task = "";
const check = document.querySelectorAll(".check");

// Ajout d'une tache
function addTask() {
  if (input.value !== "") {
    task = input.value;

    const id = generateId();

    list.innerHTML += `
        <li class="item" id="${id}">
            <div class="check"></div>
            <div class="content">
                <p class="text">${task}</p>
            </div>
            <img class="icon" src="assets/poubelle.png" alt="delete task">
        </li>`;

    store.set(id, {
      task,
      checked: false
    })

    input.value = "";
  }
}

button.addEventListener("click", addTask);
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Détecter les changements

function callback(list) {
  for (let i = 0; i < list.length; i++) {
    const elements = list[i].addedNodes;
    elements.forEach((element) => {
      element.addEventListener("click", () => {
        const checked = element.getAttribute("checked");

        if(checked) {
          element.removeAttribute("checked")
          fs.writeFile
        } else {
          element.setAttribute("checked", true);
        }
      });
    });
  }
}

const observer = new MutationObserver(callback);
observer.observe(list, { attributes: true, childList: true, subtree: true });



// Problème :
// electron n'accède pas à node_modules, uniquement src, donc electron-store ne fonctionne pas