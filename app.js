// Define UI Variables, like the form

const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event (inidividual task)
  taskList.addEventListener('click', removeTask);
  // Clear task event (list)
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  
}

// 6. Get Tasks from Local Storage
function getTasks (){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks =[];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
tasks.forEach(function(task){
// Create li element
const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// Create text node and append to li
li.appendChild(document.createTextNode(task));
// Create link element for removal of tasks
const link = document.createElement('a');
// Add class to new link
link.className = 'delete-item secondary-content';
// Add icon html ("x")
link.innerHTML = '<i class="fa fa-remove"></i>';
//Append the link to li
li.appendChild(link);
// Append li to ul
taskList.appendChild(li);
})
}

// 1. Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create link element for removal of tasks
  const link = document.createElement('a');
  // Add class to new link
  link.className = 'delete-item secondary-content';
  // Add icon html ("x")
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // 5. Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  console.log(li);

  e.preventDefault();
}

// 5. Store task in local storage
// we have to add to local storage and then 6. make the new task appear in the ul and not disappear when the browser is refreshed. So add to new function and event up (6), inside leadEventListeners() ~ DOM load event and then get tasks from LS (6). Then if we remove the asks from ul, they need to be removed from local storage, too (7) ~ under 2. "Remove Tasks" add a line.

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks =[];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(task));
}

// 2. Remove Tasks (when you click on "x") 

// use event delegation since we have multiple tasks ~ we go add a new event listnener up, inside loadEventsListeners()

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      // remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement); // and then we create a function remove from LS - 7
    }
  }
}

// 7. Remove from local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks =[];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// After removing from LS, we also need to Clear from LS ~ 8.

// 3. Clear the entire tasks list when we click "Clear Tasks" black button ~ create a new event listener for this inside loadEventListeners()

function clearTasks() {
  // Two ways of doing this ~ first
  taskList.innerHTML = '';
  // Second way (faster) ~ with while loop and remove each task
  // Link to check the speed: https://jsperf.com/innerhtml-vs-removechild
  while (taskList.firstChild) { // while there is a task in the list
    taskList.removeChild(taskList.firstChild);
  }
  // 8. Clear from LS
  clearTasksFromLocalStorage();
}

// 8. Clear Tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// 4. Filter Tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}

// 5-6. Persist the task to Local Storage (part of JS)
// Call the function up, after we create and add the task.