export const markCompleted = (e) => {
  const clicked = e.target.closest('.check');
  if (!clicked) return;
  const listNum = +clicked.dataset.btn;

  const taskList = document.querySelector(`.list-${listNum}`);

  taskList.querySelector('.empty-check').classList.toggle('active');
  taskList.querySelector('.checked').classList.toggle('active');
  taskList.querySelector('.task').classList.toggle('cross');

  // local storage

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const compTask = tasks.find((task) => task.index === listNum);
  compTask.completed = !compTask.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const clearAll = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const remTasks = tasks.filter((task) => task.completed === false);

  let tasksModIndex = [];
  remTasks.forEach((task, ind) => {
    task.index = ind + 1;
    tasksModIndex = [...tasksModIndex, task];
  });
  localStorage.setItem('tasks', JSON.stringify(tasksModIndex));

  const removedTasks = tasks.filter((task) => task.completed === true);
  console.log(removedTasks);
  for (let i = 0; i < removedTasks.length; i += 1) {
    console.log(removedTasks[i].index);
    const taskToRemove = document.getElementById(removedTasks[i].index);
    taskToRemove.parentNode.removeChild(taskToRemove);
  }
};