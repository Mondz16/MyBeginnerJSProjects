document.addEventListener("DOMContentLoaded", refreshTaskList);

let tasks = JSON.parse(localStorage.getItem("task")) || [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  const newTask = {
    id: Date.now(),
    task: task,
    completed: false,
  };

  if (task) {
    tasks.push(newTask);
    saveTask();
    refreshTaskList();
    taskInput.value = "";
  } else {
    alert("Please enter a task!");
  }
}

function saveTask() {
  localStorage.setItem("task", JSON.stringify(tasks));
}

function refreshTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  renderTaskList();
}

function renderTaskList() {
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-id", task.id);
    if (task.completed) listItem.classList.add("completed");
    listItem.innerHTML = `
            <div class="task">${task.task}
            <button>Remove</button>
            </div>`;

    listItem.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      listItem.classList.toggle("completed");
    });

    listItem.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      removeTask(listItem, task);
    });

    taskList.appendChild(listItem);
  });
}

function removeTask(listItem, task) {
  tasks = tasks.filter((t) => t.id !== task.id);
  listItem.remove();
  saveTask();
}

function removeAllTask() {
  localStorage.clear();
  refreshTaskList();
}
