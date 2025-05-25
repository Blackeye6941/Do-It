if("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(() => {
            console.log("Success");
        }).catch((err) => {
            console.log(`Failure ${err}`);
        });
    });
}

function saveTasks(){
    tasks = Array.from(document.querySelectorAll('.task-item'), item => item.textContent)
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks(){
    const taskContainer = document.querySelector('.task');
    // noTask = document.querySelector('.no-task');
    tasks = localStorage.getItem('tasks');
    if(tasks){
        JSON.parse(tasks).forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-item');
            taskDiv.textContent = task;
            taskContainer.appendChild(taskDiv);
        });
        swipeListeners();
    }
}
function deleteTask(taskElement){
    taskElement.remove();
    saveTasks();
}
function swipeListeners(){
    let startX;
    let endX;
    document.querySelectorAll('.task-item').forEach(task => {
        task.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });
        task.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            let diff = endX- startX;
            console.log(diff);
            if(diff > -400){
                task.classList.add("swipe-left");
                setTimeout(() => {
                    deleteTask(task);
                    saveTasks();
                }, 500);
            }
        })
        task.addEventListener("click", () => {
            if(confirm("Delete this task?")){
                deleteTask(task);
                saveTasks();
            }
        })
    });
}
document.addEventListener("DOMContentLoaded",
    function(){
        const taskContainer = document.querySelector('.task');
        const addButton =document.querySelector('.add-button');
        loadTasks();
        addButton.addEventListener("click", () => {
            const taskText = prompt("Enter a task: ");
            const taskDiv = document.createElement('div');
            if(taskText){
                taskDiv.textContent = taskText;
                taskDiv.classList.add('task-item');
                taskContainer.appendChild(taskDiv);
                saveTasks();
                swipeListeners();
            }
        });

    }
)