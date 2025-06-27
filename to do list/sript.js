let tasks = [];
let currentFilter = "all";

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);
  input.value = "";
  displayTasks();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  displayTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  displayTasks();
}

function displayTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  let filtered = tasks;
  if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filtered = tasks.filter(t => !t.completed);
  }

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
    list.appendChild(li);
  });
}
