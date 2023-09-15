// Function to mark a task as completed
export const markCompleted = (e) => {
  const clicked = e.target.closest('.check');
  if (!clicked) return;

  // Extract the listNum from the dataset
  const listNum = +clicked.dataset.btn;

  // Find the corresponding task list element
  const taskList = document.querySelector(`.list-${listNum}`);

  // Toggle elements to represent completion
  taskList.querySelector('.empty-check').classList.toggle('active');
  taskList.querySelector('.checked').classList.toggle('active');
  taskList.querySelector('.task').classList.toggle('cross');

  // Retrieve tasks from local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Find the task with the matching index and toggle completion status
  const updatedTasks = tasks.map((task) => {
    if (task.index === listNum) {
      task.completed = !task.completed;
    }
    return task;
  });

  // Update tasks in local storage
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

// Function to clear all completed tasks
export const clearAll = () => {
  // Retrieve tasks from local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Filter out completed tasks and reassign index values
  const remainingTasks = tasks.filter((task, index) => {
    if (task.completed === false) {
      task.index = index + 1;
      return true;
    }
    return false;
  });

  // Update tasks in local storage with only the remaining tasks
  localStorage.setItem('tasks', JSON.stringify(remainingTasks));

  // Find and remove completed tasks from the DOM
  const completedTasks = tasks.filter((task) => task.completed === true);
  completedTasks.forEach((task) => {
    const taskToRemove = document.getElementById(task.index);
    if (taskToRemove) {
      taskToRemove.remove();
    }
  });
};
