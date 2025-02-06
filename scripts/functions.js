function loadTasks() {
    return new Promise((resolve, reject) => {
        console.log('Cargando tareas...');
        setTimeout(() => {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                tasks = JSON.parse(savedTasks); 
                console.log('Tareas cargadas desde localStorage:', tasks); 
                resolve(tasks);
            } else {
                reject('No hay tareas en localStorage');
            }
        }, 2000);
    });
}

function saveTasks() {
    return new Promise((resolve, reject) => {
        console.log('Guardando tareas...');
        setTimeout(() => { 
            try {
                localStorage.setItem('tasks', JSON.stringify(tasks));
                resolve('Tareas guardadas correctamente');
                Swal.fire({
                    title: "Tareas guardadas correctamente!",
                    icon: "success",
                });
            } catch (error) {
                reject('Error al guardar las tareas');
            }
        }, 2000);
    });
}

function addTask(day) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('inputContainer');
    inputContainer.setAttribute('data-day', day); 
    document.body.appendChild(inputContainer); 

    const input = document.createElement('input');
    input.classList.add('input');
    inputContainer.appendChild(input);

    const aceptar = document.createElement('button');
    aceptar.textContent = 'Aceptar';
    aceptar.classList.add('buttonAceptar');
    inputContainer.appendChild(aceptar);

    const cancelar = document.createElement('button');
    cancelar.textContent = 'Cancelar';
    cancelar.classList.add('buttonCancelar');
    inputContainer.appendChild(cancelar);

    blockBackground();

    aceptar.addEventListener('click', function() {
        const valueTask = input.value.trim();
        if (valueTask) {
            const taskId = Date.now();
            const month = document.querySelector('.month');
            const monthText = month.textContent;

            tasks = [...tasks, { id: taskId, day: day, month: monthText, task: valueTask }];

            saveTasks()
                .then((message) => {
                    console.log(message);
                    inputContainer.remove();
                    unblurCalendar();
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            alert("La tarea no puede estar vacía.");
        }
    });

    cancelar.addEventListener('click', function() {
        inputContainer.remove(); 
        unblurCalendar(); 
    });
}

function showTasks(day, monthText) {
    const tasksForDay = tasks.filter(task => task.day === day && task.month === monthText);

    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasksContainer');
    tasksContainer.setAttribute('data-day', day); 
    document.body.appendChild(tasksContainer);

    blockBackground();

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.classList.add('closeButton');
    tasksContainer.appendChild(closeButton);

    if (tasksForDay.length > 0) {
        tasksForDay.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('taskItem');
            taskItem.textContent = task.task;

            tasksContainer.appendChild(taskItem);
        });
    } else {
        const noTasksMessage = document.createElement('div');
        noTasksMessage.textContent = 'No hay tareas para este día.';
        tasksContainer.appendChild(noTasksMessage);
    }

    closeButton.addEventListener('click', function() {
        tasksContainer.remove(); 
        unblurCalendar(); 
    });
}

function showDeleteTasks(day, monthText) {
    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasksContainer');
    tasksContainer.setAttribute('data-day', day); 
    document.body.appendChild(tasksContainer);

    blockBackground();

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.classList.add('closeButton');
    tasksContainer.appendChild(closeButton);

    const tasksForDay = tasks.filter(task => task.day === day && task.month === monthText);

    if (tasksForDay.length > 0) {
        tasksForDay.forEach((task) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('taskItem');
            taskItem.textContent = task.task;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('deleteButton');
            taskItem.appendChild(deleteButton);

            tasksContainer.appendChild(taskItem);

            deleteButton.addEventListener('click', function() {
                deleteTask(task.id); 
                tasksContainer.remove(); 
                unblurCalendar(); 
            });
        });
    } else {
        const noTasksMessage = document.createElement('div');
        noTasksMessage.textContent = 'No hay tareas para este día.';
        tasksContainer.appendChild(noTasksMessage);
    }

    closeButton.addEventListener('click', function() {
        tasksContainer.remove(); 
        unblurCalendar(); 
    });
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks()
        .then((message) => {
            console.log(message);
            console.log('Tareas después de eliminar:', tasks);
        })
        .catch((error) => {
            console.log(error);
        });
}

function blockBackground() {
    const calendar = document.querySelector('.calendar');
    calendar.style.filter = 'blur(5px)';
    calendar.style.pointerEvents = 'none';
}

function unblurCalendar() {
    const calendar = document.querySelector('.calendar');
    calendar.style.filter = 'none';
    calendar.style.pointerEvents = 'auto';
}