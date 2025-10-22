const lightbox = document.getElementById("lightbox");
const taskName = document.getElementById("taskInput");
const tasksContainer = document.getElementById("tasks");
const confirmButton = document.getElementById("confirm-button");
let tasks = JSON.parse(localStorage.getItem("tasks"));
if(tasks != null){
    CreateTaskElements();
    console.log(typeof(tasks));
} else {
    tasks = [];
    console.log("No tasks to be loaded.f");
}
confirmButton.addEventListener("mouseenter", ()=>{
    if(taskName.value == ""){
        confirmButton.setAttribute("disabled", true);
        taskName.setAttribute("placeholder", "Task name can not be empty");
    }
    else {
        confirmButton.removeAttribute('disabled');
    }
});
document.getElementById("newTask").addEventListener("click", () =>{
    ShowLightbox();
});
document.getElementById("cancel-button").addEventListener("click", () =>{
    HideLightbox();
});

confirmButton.addEventListener("click", () =>{
    let task = taskName.value;
    AddNewTask(task);
    ResetNewTaskInputField();
});
function ShowLightbox(){
    lightbox.classList.add("show");
    document.body.classList.add("ScrollDisabled");
}
function HideLightbox(){
    lightbox.classList.remove("show");
    taskName.value = "";
    document.body.classList.remove("ScrollDisabled");
}
function ResetNewTaskInputField(){
    taskName.value = "";
}

function AddNewTask(taskName){
    tasks.push({id: tasks.length + 1, task: taskName, complete: false});
    SaveTasks();
    ClearTasks();
    CreateTaskElements();
    HideLightbox();
}

function ClearTasks(){
    tasksContainer.innerHTML = "";
}

function SaveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("tasks saved.");
}

function DeleteTask(id){
    let newTasks = [];
    for(let i = 0; i < tasks.length; i++){
        console.log(id);
        console.log(i);
        if(tasks[i].id !== id){
            console.log("pushing");
            newTasks.push(tasks[i]);
            console.log(tasks[i]);
        }
        console.log("done");
    }
    newTasks = ResetTasksIds(newTasks);
    tasks = newTasks;
    SaveTasks();
    ClearTasks();
    CreateTaskElements();
    console.log(newTasks);
}

function ResetTasksIds(newTasks){
    for(let i = 0; i < newTasks.length; i ++){
        newTasks[i].id = i + 1;
        console.log("updating task id");
    }
    return newTasks;
}

function UpdateTasks(){
    for(let i = 0; i < tasks.length; i++){
        tasks[i].complete = document.getElementById(tasks[i].id + "cb").checked;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ClearTasks();
    CreateTaskElements();
    console.log("tasks updated.");
}

function CreateTaskElements(){
    for(let i = 0; i < tasks.length; i++){

        let taskContainer = document.createElement("div");
        taskContainer.classList.add("flex");
        taskContainer.classList.add("task-container");
        taskContainer.classList.add("flex-align-center");
        if(tasks[i].complete == true){
            taskContainer.classList.add("complete");
        }
        taskContainer.id = tasks[i].id;
        let taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.checked = tasks[i].complete;
        taskCheckbox.id = tasks[i].id + "cb";
        taskCheckbox.addEventListener("change", () =>{
            UpdateTasks();
        })
        let taskElement = document.createElement("p");
        taskElement.textContent = tasks[i].task;
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove")
        removeButton.addEventListener("click", () =>{
            DeleteTask(tasks[i].id);
        })
        taskContainer.appendChild(taskCheckbox);
        taskContainer.appendChild(taskElement);
        taskContainer.appendChild(removeButton);
        tasksContainer.appendChild(taskContainer);
        

    }
}