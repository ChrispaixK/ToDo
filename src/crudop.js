// get input from task form
const formEl = document.querySelector('.input-container');
const taskTitle = document.querySelector('#taskInput');
const taskList = document.querySelector('.taskList');
export default taskList;
// array of task items
let taskArr = [];
if (localStorage.length > 0) {
  const stored = JSON.parse(localStorage.getItem('tasks'));
  taskArr = [...stored];
}

// update UI
export const updateUI = () => {
  let dyclass = '';
  let classdy = '';
  let cross = '';
  for (let i = 0; i < taskArr.length; i += 1) {
    if (taskArr[i].completed) {
      dyclass = '';
      classdy = 'active';
      cross = 'cross';
    } else {
      dyclass = 'active';
      classdy = '';
      cross = '';
    }
    const createList = `
  <li id=${taskArr[i].index} class="list list-${taskArr[i].index}">

  <button class="check" data-btn="${taskArr[i].index}">
  <span class="empty-check ${dyclass}"><i class="fa-regular fa-square"></i></span>
  <span class="checked  ${classdy}"><i class="fa-solid fa-check"></i></span>
  </button>

  <input id=${taskArr[i].index}  type="text" data-desc="${taskArr[i].index}" class="task ${cross}" value="${taskArr[i].tasktitle}"/>
  <button id=${taskArr[i].index} class="btn btn-delete"><i class="fa-solid fa-trash-can"></i></button></li>
  
  `;
    taskList.insertAdjacentHTML('beforeend', createList);
  }
};

updateUI();
// task object
class TaskObj {
  'tasktitle'=taskTitle.value

  'completed'=false

  'index'=taskArr.length + 1
}

// adding task function

const addTask = (e) => {
  e.preventDefault();
  const newTask = new TaskObj();
  taskArr.push(newTask);
  const createList = `
  <li id=${newTask.index} class="list list-${newTask.index}">
  
  <button class="check" data-btn="${newTask.index}">
  <span class="empty-check active"><i class="fa-regular fa-square"></i></span>
  <span class="checked"><i class="fa-solid fa-check"></i></span>
  </button>

  <input id=${newTask.index}  type="text" data-desc="${newTask.index} " class="task" value="${newTask.tasktitle}"/>
  <button id=${newTask.index} class="btn btn-delete"><i class="fa-solid fa-trash-can"></i></button></li>
  
  `;
  taskList.insertAdjacentHTML('beforeend', createList);
  // clean task input value
  taskTitle.value = '';
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};

// display from the list array

formEl.addEventListener('submit', addTask);

// removing task fx

const remove = (e) => {
  const clicked = e.target.closest('.btn');
  if (!clicked) return;
  // remove specific item to local storage
  taskArr.splice(clicked.id - 1, 1);

  // reajust ids
  for (let i = 0; i < taskArr.length; i += 1) {
    if (clicked.id < taskArr[i].index) {
      taskArr[i].index -= 1;
    }
  }
  // remove on the display
  const taskToRemove = document.getElementById(clicked.id);
  taskToRemove.parentNode.removeChild(taskToRemove);
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};

// edit task function

const update = (e) => {
  const clicked = e.target.closest('.task');
  if (!clicked) return;

  // lab@mejid

  clicked.addEventListener('keyup', () => {
    const listNum = +clicked.dataset.desc;
    const task = taskArr.find((newTask) => newTask.index === listNum);
    task.tasktitle = clicked.value.trim();
    localStorage.setItem('tasks', JSON.stringify(taskArr));
  });
};

taskList.addEventListener('click', remove);
taskList.addEventListener('click', update);