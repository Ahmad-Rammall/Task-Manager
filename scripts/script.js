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
  addTasksToList(tasks, taskObject);
  console.log(tasks);
});

function addTasksToList(tasksArray, taskObject) {
  const taskItem = document.createElement("div");
  taskItem.innerHTML = `
        <div class="task">
          ${taskObject.taskName}
        </div>
        <div class="date">Date</div>
        <div class="priority">${taskObject.priority}</div>
        <div class="actions">
          <button class="btn-icon" id="checkBtn" ><i class="fa-solid fa-check"></i></button>
          <button class="btn-icon" id="editBtn">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn-icon" id="deleteBtn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
  taskItem.setAttribute("class", "content-row");
  tasksList.appendChild(taskItem);

  taskItem.querySelector("#checkBtn").addEventListener("click", function () {
    taskItem.setAttribute("class", "content-row checked-task");
  });

  taskItem.querySelector("#editBtn").addEventListener("click", function () {
    taskItem.style.color = "red";
  });

  taskItem.querySelector("#deleteBtn").addEventListener("click", function () {
    //remove the task from the array
    tasksArray.splice(taskObject.id, 1);
    // Remove the task item from the DOM
    taskItem.remove();
  });
}
