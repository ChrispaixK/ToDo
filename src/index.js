import './style.css';

const listsEl = document.querySelector('.taskList');

const tasksArr = [
  {
    description: 'Linked List',
    completed: true,
    index: 0,
  },
  {
    description: 'Stack and Queu Challenge',
    completed: true,
    index: 1,
  },
  {
    description: 'ES6',
    completed: true,
    index: 2,
  },
  {
    description: 'Standup meeting',
    completed: true,
    index: 3,
  },
];

tasksArr.forEach((task) => {
  const createList = `
    <li class="list">${task.description}</>
  `;

  listsEl.insertAdjacentHTML('beforeend', createList);
});
