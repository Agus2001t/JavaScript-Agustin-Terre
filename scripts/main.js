let tasks = [];

loadTasks()
    .then(() => {
        console.log('Tareas cargadas correctamente');
    })
    .catch((error) => {
        console.error(error);
    });


let days = document.querySelectorAll('.date div');

days.forEach((day) => {
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    const button3 = document.createElement('button');
    
    button1.textContent = "+"; 
    button2.textContent = "-"; 
    button3.textContent = "..."; 
    
    button1.classList.add('button1');
    button2.classList.add('button2');
    button3.classList.add('button3');
    
    if (day.textContent.trim() !== "") {
        day.appendChild(button1);
        day.appendChild(button2);
        day.appendChild(button3);
    }


    const month = document.querySelector('.month');
    const monthText = month.textContent;

    button1.setAttribute('data-day', day.textContent.trim());
    button2.setAttribute('data-day', day.textContent.trim());
    button2.setAttribute('data-month', monthText);
    button3.setAttribute('data-day', day.textContent.trim());
    button3.setAttribute('data-month', monthText);


    button1.addEventListener('click', function(event) {
        const day = event.target.getAttribute('data-day');
        addTask(day);
    });


    button2.addEventListener('click', function(event) {
        const day = event.target.getAttribute('data-day');
        const month = event.target.getAttribute('data-month');
        showDeleteTasks(day, month);
    });


    button3.addEventListener('click', function(event) {
        const day = event.target.getAttribute('data-day');
        const month = event.target.getAttribute('data-month');
        showTasks(day, month);
    });
});




















