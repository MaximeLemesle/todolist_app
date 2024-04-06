const input = document.querySelector("#input");
const button = document.querySelector("#add_task");
const list = document.querySelector("#list");


// Affichage des taches dans la db
async function displayTasks() {
  try {
    const response = await fetch("http://localhost:1234/todos");

    const tasks = await response.json();

    tasks.forEach((task) => {
      const listItem = createTask(task);
      list.appendChild(listItem);
    });
  } catch (err) {
    console.error("Erreur lors de l'affichage des taches:", err);
  }
}

// Créer une tache
function createTask(task) {
  const listItem = document.createElement("li");
  listItem.classList.add("item");
  listItem.id = task._id;
  if (task.checked === true) {
    listItem.setAttribute("checked", true);
  };
  listItem.innerHTML = `
  <div class="check" data-id="${task._id}"></div>
  <div class="content">
      <p class="text">${task.task}</p>
    </div>
    <img id="delete" class="icon" src="../img/poubelle.png" alt="delete task">
  `;

  const checkbox = listItem.querySelector(".check");
  checkbox.addEventListener("click", () => {
    updateTask(task._id, !task.checked);
  });

  return listItem;
}

// Ajouter une tache
async function addTask(task) {
  try {
    const response = await fetch("http://localhost:1234/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task, checked: false }),
    });

    const newTask = await response.json();

    const listItem = createTask(newTask);
    list.appendChild(listItem);

    input.value = "";
  } catch (err) {
    console.error("Erreur lors de l'ajout de tache:", err);
  }
}

// Mettre à jour une tache
async function updateTask(taskId, checked) {
  try {
    const response = await fetch(`http://localhost:1234/todos/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: checked }),
    });

    const updatedTask = await response.json();

    const checkbox = document.querySelector(`.check[data-id="${taskId}"]`);
    checkbox.dataset.checked = updatedTask.checked;
  } catch (err) {
    console.error("Erreur lors de la modification de la tache:", err);
  }
}

// Détecter les changements
const callback = (list) => {
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
};
const observer = new MutationObserver(callback);
observer.observe(list, { attributes: true, childList: true, subtree: true });


// Supprimer une tache
async function deleteTask(taskId) {
  try {
    const response = await fetch(`http://localhost:1234/todos/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Tâche supprimée avec succès");

      const listItemToRemove = document.getElementById(taskId);
      const checkbox = listItemToRemove.querySelector('.check');

      if (checkbox.dataset.checked === "true") {
        updateTask(taskId, false);
        listItemToRemove.remove();
      }

      listItemToRemove.remove();
    }
  } catch (err) {
    console.error("Erreur lors de la suppresion d'une tache:", err);
  }
}


// Ajout d'une tache avec le btn "ajouter"
button.addEventListener("click", () => {
  const task = input.value.trim();
  if (task !== "") {
    addTask(task);
  }
});

// Ajout d'une tache avec la touche entrer
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const task = input.value.trim();
    if (task !== "") {
      addTask(task);
    }
  }
});

// Clique sur la poubelle d'une tache
list.addEventListener("click", (event) => {
  if (event.target && event.target.id === "delete") {
    const taskId = event.target.parentElement.id;
    deleteTask(taskId);
  }
});


window.addEventListener("DOMContentLoaded", displayTasks);