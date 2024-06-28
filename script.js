document.addEventListener('DOMContentLoaded', () => {
  const addTaskBtn = document.getElementById('add-task-button');
  const taskBox = document.getElementById('task-box');
  const close = document.getElementsByClassName('close')[0];
  const taskForm = document.getElementById('task-form');



  addTaskBtn.onclick = () => {
    taskBox.style.display = 'block';
  }



  close.onclick = () => {
    taskBox.style.display = 'none';
  }



  window.onclick = (event) => {
    if (event.target == taskBox) {
      taskBox.style.display = 'none';
    }
  }



  taskForm.onsubmit = (event) => {
    event.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const personAssigned = document.getElementById('person-assigned').value;
    addTask(taskName, taskDate, taskTime, personAssigned);
    taskForm.reset();
    taskBox.style.display = 'none';
  }



  function addTask(name, date, time, personAssigned) {
    const now = new Date();
    const taskDate = new Date(`${date}T${time}`);
    const status = taskDate < now ? 'past-due' : 'pending';

    const taskItem = document.createElement('li');
    taskItem.className = `task ${status}`;
    taskItem.innerHTML = `
        <span>${name} - ${personAssigned}</span>
        <span>${date} ${time}</span>
        <button onclick="markAsCompleted(this)">Mark as Completed</button>
        <button onclick="removeTask(this)">Remove</button>
      `;

    const taskList = determineTaskList(date);
    taskList.appendChild(taskItem);
  }



  function determineTaskList(date) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (date === today) {
      return document.getElementById('today-task-list');
    } else if (date === tomorrow) {
      return document.getElementById('tomorrow-task-list');
    } else if (date < today) {
      return document.getElementById('passed-task-list');
    }
    else {
      return document.getElementById('upcoming-task-list');
    }
  }

  window.markAsCompleted = (button) => {
    const taskItem = button.parentNode;
    taskItem.className = 'task completed';
  }

  window.removeTask = (button) => {
    const taskItem = button.parentNode;
    taskItem.parentNode.removeChild(taskItem);
  }
});
