let tasks = {};

let days = document.querySelectorAll('.date div');

function addTask(day) {
  if (day.textContent.trim() !== '') {
    let task = prompt('Escribe una tarea para el día ' + day.textContent + ':');
    
    if (task && task.trim() !== '') {
      if (!tasks[day.textContent]) {
        tasks[day.textContent] = '';
      }
      tasks[day.textContent] += (tasks[day.textContent] ? '\n' : '') + task;
    }
  }
  showTasks(day);
}

function showTasks(day) {
  let taskText = tasks[day.textContent];

  if (taskText && taskText.trim() !== '') {
    alert('Tareas del día ' + day.textContent + ':\n' + taskText);
  } else {
    alert('No hay tareas para el día ' + day.textContent);
  }
}

for (let i = 0; i < days.length; i++) {
  days[i].onclick = function () {
    addTask(days[i]);
  };
}




