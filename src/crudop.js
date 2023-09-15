const formEl = document.querySelector('.input-container');
const taskTitle = document.querySelector('#taskInput');
const taskList = document.querySelector('.taskList');

let taskArr = [];

// Load tasks from local storage
if (localStorage.length > 0) {
  const stored = JSON.parse(localStorage.getItem('tasks'));
  taskArr = [...stored];
}

export default taskList;

// Update the UI to display tasks
export const updateUI = () => {
  taskList.innerHTML = ''; // Clear the previous content
  for (let i = 0; i < taskArr.length; i++) {
    const task = taskArr[i];
    const completedClass = task.completed ? 'active' : '';
    const crossClass = task.completed ? 'cross' : '';
    const createList = `
      <li id=${task.index} class="list list-${task.index}">
        <button class="check" data-btn="${task.index}">
          <span class="empty-check ${completedClass}"><i class="fa-regular fa-square"></i></span>
          <span class="checked ${completedClass}"><i class="fa-solid fa-check"></i></span>
        </button>
        <input id=${task.index} type="text" data-desc="${task.index}" class="task ${crossClass}" value="${task.tasktitle}"/>
        <button id=${task.index} class="btn btn-delete"><i class="fa-solid fa-trash-can"></i></button>
      </li>`;
    taskList.insertAdjacentHTML('beforeend', createList);
  }
};

updateUI();

class TaskObj {
  constructor() {
    this.tasktitle = taskTitle.value;
    this.completed = false;
    this.index = taskArr.length + 1;
  }
}

const addTask = (e) => {
  e.preventDefault();
  const newTask = new TaskObj();
  taskArr.push(newTask);
  const createList = `
    <li id=${newTask.index} class="list list-${newTask.index}">
      <button class="check" data-btn="${newTask.index}">
        <span class="empty-check active"><i class="fa-regular fa-square"></i></span>
        <span class="checked"></span>
      </button>
      <input id=${newTask.index} type="text" data-desc="${newTask.index}" class="task" value="${newTask.tasktitle}"/>
      <button id=${newTask.index} class="btn btn-delete"><i class="fa-solid fa-trash-can"></i></button>
    </li>`;
  taskList.insertAdjacentHTML('beforeend', createList);
  taskTitle.value = ''; // Clear task input value
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};

formEl.addEventListener('submit', addTask);

const remove = (e) => {
  const clicked = e.target.closest('.btn');
  if (!clicked) return;
  const taskId = parseInt(clicked.id);
  taskArr = taskArr.filter((task) => task.index !== taskId);
  taskArr.forEach((task, index) => {
    task.index = index + 1;
  });
  const taskToRemove = document.getElementById(taskId);
  taskToRemove && taskToRemove.remove();
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};

const update = (e) => {
  const clicked = e.target.closest('.task');
  if (!clicked) return;
  const listNum = +clicked.dataset.desc;
  const task = taskArr.find((newTask) => newTask.index === listNum);
  if (task) {
    task.tasktitle = clicked.value.trim();
    localStorage.setItem('tasks', JSON.stringify(taskArr));
  }
};

taskList.addEventListener('click', remove);
taskList.addEventListener('input', update);
