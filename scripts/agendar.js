let tasks = {};

let days = document.querySelectorAll('.date div');

/*FUNCION PARA AÑADIR TAREAS*/

function addTask(day) {
  if (day.textContent.trim() !== "") {
    let task = prompt("Ingrese una tarea: ");

    if (task !== null) {
      task = task.trim();

      if (task !== "") {
        if (!tasks[day.dataset.day]) {
          tasks[day.dataset.day] = [];
        }

        if (tasks[day.dataset.day].includes(task)) {
          alert("Ya has agregado esta tarea.");
          return;
        }

        tasks[day.dataset.day].push(task);

        /*LE AGREGUE UN BOTON PARA MOSTRAR LAS TAREAS UNA VEZ CREADA LA PRIMER TAREA*/

        if (!day.querySelector('.task-button')) {
          let taskButton = document.createElement('button');
          taskButton.classList.add('task-button');
          taskButton.textContent = "Ver Tareas";

          /*AL DARLE CLICK AL BOTON SE EJECUTA LA FUNCION "SHOWTASKS"*/

          taskButton.onclick = function (event) {
            event.stopPropagation();
            showTasks(day);
          };

          day.appendChild(taskButton);
        }

      } else {
        alert("No ingresaste ninguna tarea");
      }
    } else {
      alert("Operación cancelada");
    }
  }
}

/*FUNCION PARA MOSTRAR LAS TAREAS GUARDADAS*/

function showTasks(day) {
  if (tasks[day.dataset.day] && tasks[day.dataset.day].length > 0) {
    alert("Tareas del día " + day.dataset.day + " :\n" + tasks[day.dataset.day].join("\n"));
  } else {
    alert("No hay tareas para este día.");
  }
}

/*AL DARLE CLICK A UN DIA SE EJECUTA LA FUNCION ADDTASK*/

for (const elemento of days) {
  elemento.dataset.day = elemento.textContent.trim();

  elemento.addEventListener('click', function(event) {
    addTask(elemento);
  });
}












