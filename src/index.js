import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import './style.css';
import taskList from './crudop.js';
import { markCompleted, clearAll } from './clear';

taskList.addEventListener('click', markCompleted);

const clearAllBtn = document.querySelector('.btn-clear');

clearAllBtn.addEventListener('click', () => {
  clearAll();
});