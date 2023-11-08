let addBtn = document.getElementById("addBtn");
let taskName = document.getElementById("taskName");
let priority = document.getElementById("priority");
let tasksList = document.getElementById("tasksList");

let tasks = [];
let id = -1;

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (taskName.value == "") {
    alert("You can't add an empty Task !");
    return;
  }

  if (priority.value == "") {
    priority.value = "low";
  }

  id++;

  const taskObject = {
    id: id,
    taskName: taskName.value,
    priority: priority.value,
  };

  tasks.push(taskObject);
  addTasksToList(tasks);
});

function addTasksToList(tasksArray) {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasksArray.length; i++) {
    const taskItem = document.createElement("div");
    taskItem.innerHTML = `
        <div class="task" id="task-${i}-name">
          ${tasksArray[i].taskName}
        </div>
        <div class="date" id="task-${i}-date">Date</div>
        <div class="priority" id="task-${i}-priority">${tasksArray[i].priority}</div>
        <div class="actions">
          <button class="btn-icon" name="${i}"><i class="fa-solid fa-check"></i></button>
          <button class="btn-icon" name="${i}">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn-icon" name="${i}"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
    taskItem.setAttribute('class','content-row')
    tasksList.appendChild(taskItem);
  }
}
