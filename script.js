 let taskInput = document.getElementById("enter");
let addBtn = document.getElementById("add");
let tasksList = document.getElementById("tasks");
let allTasks = document.getElementById("All");
let completeT = document.getElementById("Completed");
let unCompletedT = document.getElementById("Pending");

let Tasks = [];

function displayTasks() {
  tasksList.innerHTML = "";
  if (Tasks.length === 0) {
    let emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = " No Tasks Add New One🎯 ";
    emptyMessage.style.cssText = `
            list-style: none;
            text-align: center;
            color: #999;
            padding: 40px 20px;
            font-size: 18px;
            border: 2px dashed #ddd;
        `;
    tasksList.appendChild(emptyMessage);
    return;
  }
  Tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `
            <span style="text-decoration: ${task.completed ? "line-through" : "none"}">
                ${task.text}
            </span>
            <div style="margin-top: 5px;">
                <button class="complete-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? "↩️ Undo" : "✅ Done"}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">✏️ Edit</button>
                <button class="delete-btn" onclick="confirmDelete(${task.id})">🗑️ Delete</button>
            </div>
        `;
    tasksList.appendChild(li);
  });
}

function displayFilteredTasks(filteredTasks) {
  tasksList.innerHTML = "";
  if (filteredTasks.length === 0) {
    let emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "No Tasks Here Add New One To Display🔍";
    emptyMessage.style.cssText = `
            list-style: none;
            text-align: center;
            color: #999;
            padding: 40px 20px;
            font-size: 18px;
            border: 2px dashed #ddd;
        `;
    tasksList.appendChild(emptyMessage);
    return;
  }
  filteredTasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `
            <span style="text-decoration: ${task.completed ? "line-through" : "none"}">
                ${task.text}
            </span>
            <div style="margin-top: 5px;">
                <button class="complete-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? "↩️ Undo" : "✅ Done"}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">✏️ Edit</button>
                <button class="delete-btn" onclick="confirmDelete(${task.id})">🗑️ Delete</button>
            </div>
        `;
    tasksList.appendChild(li);
  });
}

function confirmDelete(id) {
  let overlay = document.createElement("div");
  overlay.className = "overlay";

  let confirmBox = document.createElement("div");
  confirmBox.className = "custom-confirm";
  confirmBox.innerHTML = `
        <p>Are You Sure To Delete ?🗑️</p>
        <div class="confirm-btns">
            <button class="confirm-yes" id="confirmYes"> yes, delete </button>
            <button class="confirm-no" id="confirmNo"> cancel</button>
        </div>
    `;

  document.body.appendChild(overlay);
  document.body.appendChild(confirmBox);

  document.getElementById("confirmYes").addEventListener("click", function () {
    deleteTask(id);
    document.body.removeChild(overlay);
    document.body.removeChild(confirmBox);
  });

  document.getElementById("confirmNo").addEventListener("click", function () {
    document.body.removeChild(overlay);
    document.body.removeChild(confirmBox);
  });
}

function editTask(id) {
  let task = Tasks.find((t) => t.id === id);
  let newText = prompt("Edit Task Title:", task.text);

  if (newText && newText.trim() !== "") {
    Tasks = Tasks.map((t) => {
      if (t.id === id) {
        t.text = newText.trim();
      }
      return t;
    });
    displayTasks();
  }
}

function addTask() {
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please Enter task Title");
    return;
  }

  let task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  Tasks.push(task);
  taskInput.value = "";
  displayTasks();
}

function deleteTask(id) {
  Tasks = Tasks.filter((task) => task.id !== id);
  displayTasks();
}

function toggleTask(id) {
  Tasks = Tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  displayTasks();
}


addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});


allTasks.addEventListener("click", function () {
  displayTasks();
});

completeT.addEventListener("click", function () {
  let completedTasks = Tasks.filter((task) => task.completed);
  displayFilteredTasks(completedTasks);
});

unCompletedT.addEventListener("click", function () {
  let pendingTasks = Tasks.filter((task) => !task.completed);
  displayFilteredTasks(pendingTasks);
});
