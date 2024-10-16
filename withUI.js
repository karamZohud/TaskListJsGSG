// DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
let count =1;
// Load tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Add task
let taskCounter = tasks.length > 0 ? tasks.length++ : 0; // Initialize ID counter based on existing tasks

// Add task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask = {
      id: ++taskCounter, // Increment task counter
      description: taskText,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});
// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks in the list
function renderTasks(filter = '') {
  taskList.innerHTML = '';
  const filteredTasks = tasks.filter(task => 
    task.description.toLowerCase().includes(filter.toLowerCase())
  );
  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.id}: ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]</span>
      <div>
        <button class="toggle" onclick="toggleCompletion(${task.id})">Toggle</button>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Toggle task completion
function toggleCompletion(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Edit task description
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const newDescription = prompt('Edit task description:', task.description);
    if (newDescription !== null && newDescription.trim() !== '') {
      task.description = newDescription;
      saveTasks();1
      renderTasks();
    }
  }
}

// Search tasks
searchInput.addEventListener('input', (e) => {
  renderTasks(e.target.value);
});

// Load tasks on startup
// Load tasks on startup
window.addEventListener('load', () => renderTasks());
