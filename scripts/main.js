let tasks = [];


loadTasks();


let days = document.querySelectorAll('.date div');

for (const day of days) {
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


    button1.setAttribute('data-day', day.textContent.trim());
    button2.setAttribute('data-day', day.textContent.trim());
    button3.setAttribute('data-day', day.textContent.trim());


    button1.addEventListener('click', function(event) {
        const day = event.target.getAttribute('data-day');
        addTask(day);
    });


    button2.addEventListener('click', function(event) {
        const day = event.target.getAttribute('data-day');
        showDeleteTasks(day);
    });


    button3.addEventListener('click', function(event) {
        const day = event.target.getAttribute('data-day');
        showTasks(day);
    });
}




















