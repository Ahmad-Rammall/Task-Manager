let addBtn = document.getElementById("addBtn");
let taskName = document.getElementById("taskName");
let priority = document.getElementById("priority");

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
});
