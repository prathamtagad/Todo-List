// Load saved tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show all tasks on the screen
function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
        <span>${task}</span>
        <div class="todo-edit-buttons">
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  let task = taskInput.value.trim();
  if (task === "") return;

  tasks.push(task);
  taskInput.value = "";
  saveTasks();
  showTasks();
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}

// Edit a task
function editTask(index) {
  let updated = prompt("Edit your task:", tasks[index]);
  if (updated) {
    tasks[index] = updated.trim();
    saveTasks();
    showTasks();
  }
}

taskInput.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        addTask();
    }
})

// Show tasks when page loads
showTasks();
