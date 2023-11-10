let addBtn = document.getElementById("addBtn");
let taskName = document.getElementById("taskName");
let priority = document.getElementById("priority");
let tasksList = document.getElementById("tasksList");
let popup = document.getElementById("popup");
let popupText = document.getElementById("popupText");
let popupPriority = document.getElementById("popupPriority");
let filterAll = document.getElementById("filterAll");
let filterCompleted = document.getElementById("filterCompleted");
let filterActive = document.getElementById("filterActive");

let tasks = [];

function sortTasksByPriority() {
  tasks.sort((a, b) => {
    return parseInt(b.priority) - parseInt(a.priority);
  });
  displayTasks();
}

function displayTasks() {
  tasksList.innerHTML = "";

  // Add the sorted tasks to the DOM
  tasks.forEach((task) => {
    addTasksToList(task);
  });
}

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (taskName.value == "") {
    alert("You can't add an empty Task !");
    return;
  }

  if (priority.value == "") {
    priority.value = "low";
  }

  const taskObject = {
    id: tasks.length,
    taskName: taskName.value,
    date: "",
    priority: priority.value,
    isChecked: false,
  };

  tasks.push(taskObject);
  sortTasksByPriority();
  console.log(tasks);
  addTasksToList(taskObject);
});

function convertPriority(taskObject) {
  switch (taskObject.priority) {
    case "1":
      return "Low";
    case "2":
      return "Middle";
    case "3":
      return "High";
  }
}

function addTasksToList(taskObject) {
  const existingTask = document.getElementById(`task-${taskObject.id}`);

  if (existingTask) return;

  const taskItem = document.createElement("div");
  taskItem.innerHTML = `
        <div class="task" id="taskName">
          ${taskObject.taskName}
        </div>
        <div class="date">${taskObject.date}</div>
        <div class="priority" id="taskPriority">${convertPriority(
          taskObject
        )}</div>
        <div class="actions">
          <button class="btn-icon" id="checkBtn" ><i class="fa-solid fa-check"></i></button>
          <button class="btn-icon" id="editBtn">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn-icon" id="deleteBtn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
  taskItem.setAttribute("class", "content-row");
  taskItem.setAttribute("id", `task-${taskObject.id}`);
  if (taskObject.isChecked) taskItem.classList.add("checked-task");
  tasksList.appendChild(taskItem);

  taskItem.querySelector("#checkBtn").addEventListener("click", function () {
    taskItem.classList.add("checked-task");
    taskObject.isChecked = true;
  });

  taskItem.querySelector("#editBtn").addEventListener("click", function () {
    openPopup(taskObject);
  });

  taskItem.querySelector("#deleteBtn").addEventListener("click", function () {
    //remove the task from the array
    tasksArray.splice(taskObject.id, 1);
    // Remove the task item from the DOM
    taskItem.remove();
  });
}

function openPopup(taskObject) {
  popupText.value = taskObject.taskName;
  popupPriority.value = taskObject.priority;
  popup.setAttribute("class", "popup open-popup");
  popup.setAttribute("edited-task-id", `${taskObject.id}`);
}

document.getElementById("savePopup").addEventListener("click", function () {
  const editedTaskName = popupText.value;
  const editedPriority = popupPriority.value;
  console.log(editedPriority);

  if (editedTaskName == "") {
    alert("Task name cannot be empty!");
    return;
  }

  const taskId = parseInt(popup.getAttribute("edited-task-id"));

  // Find the task in the tasks array based on its ID
  const editedTask = tasks.find((task) => task.id === taskId);

  // Update the task properties
  editedTask.taskName = editedTaskName;
  editedTask.priority = editedPriority;

  // Update the corresponding DOM elements
  const taskItem = tasksList.querySelector(
    `.content-row[id="task-${editedTask.id}"]`
  );
  taskItem.querySelector("#taskName").textContent = editedTaskName;
  taskItem.querySelector("#taskPriority").textContent = editedPriority;
  sortTasksByPriority();
});

document.getElementById("cancelPopup").addEventListener("click", function () {
  popup.setAttribute("class", "popup");
});

filterAll.addEventListener("click", function () {
  filterAll.classList.add("activated-filter");
  filterActive.classList.remove("activated-filter");
  filterCompleted.classList.remove("activated-filter");

  const checkedTasks = tasksList.querySelectorAll(".checked-task");
  const uncheckedTasks = tasksList.querySelectorAll(
    `.content-row:not(.checked-task)`
  );
  checkedTasks.forEach((element) => {
    element.style.display = "flex";
  });
  uncheckedTasks.forEach((element) => {
    element.style.display = "flex";
  });
});

filterActive.addEventListener("click", function () {
  filterAll.classList.remove("activated-filter");
  filterActive.classList.add("activated-filter");
  filterCompleted.classList.remove("activated-filter");
  const checkedTasks = tasksList.querySelectorAll(".checked-task");
  const uncheckedTasks = tasksList.querySelectorAll(
    `.content-row:not(.checked-task)`
  );
  checkedTasks.forEach((element) => {
    element.style.display = "none";
  });
  uncheckedTasks.forEach((element) => {
    element.style.display = "flex";
  });
});

filterCompleted.addEventListener("click", function () {
  filterAll.classList.remove("activated-filter");
  filterActive.classList.remove("activated-filter");
  filterCompleted.classList.add("activated-filter");
  const uncheckedTasks = tasksList.querySelectorAll(
    `.content-row:not(.checked-task)`
  );

  const checkedTasks = tasksList.querySelectorAll(".checked-task");

  uncheckedTasks.forEach((element) => {
    element.style.display = "none";
  });

  checkedTasks.forEach((element) => {
    element.style.display = "flex";
  });
});
