console.log('ok');

const btAdd = document.getElementById('btAdd');
btAdd.addEventListener('click', function(e)  {
    e.preventDefault();

    const inputNewTask = document.getElementById('frmTasks').newTask;
    let newTask = inputNewTask.value;

    if(newTask == "") return; // éviter vide

    // Vérifier si la tâche existe déjà
    for (let i = 0; i < document.querySelectorAll('.task').length; i++) {
        if (document.querySelectorAll('.task')[i].textContent.trim().toLowerCase() === newTask.trim().toLowerCase()) {
            alert("cette tâche existe déjà !");
            return;
        }
    }

    saveTasks();

    inputNewTask.value ='';

    const newLI = document.createElement('li');  //console.log(newLI);
    const span = document.createElement('span'); // console.log(span);
    span.classList.add('task');
    span.innerHTML = newTask;

    span.addEventListener('click', function()  {
        span.classList.toggle('done');
    });


     newLI.appendChild(span);

    const btn = document.createElement('button'); console.log(btn);
    btn.classList.add('btDelete');

    //Ajouter un écouteur d'évènement à chaque icone
    btn.addEventListener('click', removeTask);

    const iDelete = document.createElement('i'); console.log(iDelete);
    iDelete.classList.add('bi');
    iDelete.classList.add('bi-trash3-fill');

    btn.appendChild(iDelete);

    newLI.appendChild(btn);

    const ULTaskList = document.getElementById('taskList');
    ULTaskList.appendChild(newLI);

    saveTasks();

    //Donner le focus au champ newTask
    inputNewTask.focus();
}); 

const frmTasks = document.getElementById('frmTasks');
frmTasks.addEventListener('submit', function(e) {
    e.preventDefault();
});

const btDeletes = document.getElementsByClassName('btDelete');     console.log(btDeletes);

//Parcourir la collection HTML d'icones
for(let i=0;i<btDeletes.length;i++) {
    //Ajouter un écouteur d'évènement à chaque icone
    btDeletes[i].addEventListener('click', removeTask);
}

function removeTask() {
    //Récupérer le LI pour lequel on a cliqué sur la corbeille
    let selectedLI = this.parentElement;
   // selectedLI.remove();
    saveTasks();

    //Sélectionner la liste des tâches
    const ULTaskList = document.getElementById('taskList');

    //Retirer le LI (enfant) du UL (parent)
    ULTaskList.removeChild(selectedLI);
}

const tasks = document.querySelectorAll('.task');

tasks.forEach(function(task) { 
    task.addEventListener('click', function() {
        this.classList.toggle('done');
    });
});

const input = document.getElementById("newTask");

input.addEventListener("keypress", function(e) {
    if (e.key==="Enter") {
        //e.preventDefault(); // empêche le rechargement
        document.getElementById("btAdd").click();
    }
});

//SaveTasks()

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task").textContent,
            done: li.querySelector(".task").classList.contains("done")    
            

        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//LoadTasks()

function loadTasks() {
    const ULTaskList = document.getElementById('taskList');
    ULTaskList.innerHTML = "";

    const data = localStorage.getItem("tasks");
    if (!data) return;

    const tasks = JSON.parse(data);

    tasks.forEach(task => {

        const newLI = document.createElement('li');

        const span = document.createElement('span');
        span.classList.add('task');
        span.textContent = task.text;

        if (task.done) {
            span.classList.add('done');
        }

        span.addEventListener('click', function() {
            span.classList.toggle('done');
            saveTasks(); // ✅ IMPORTANT
        });

        const btn = document.createElement('button');
        btn.classList.add('btDelete');
        btn.addEventListener('click', function() {
            newLI.remove();
            saveTasks(); // ✅ IMPORTANT
        });

        const iDelete = document.createElement('i');
        iDelete.classList.add('bi', 'bi-trash3-fill');

        btn.appendChild(iDelete);

        newLI.appendChild(span);
        newLI.appendChild(btn);

        ULTaskList.appendChild(newLI);
    });
}
//Charger au démarrage

loadTasks();
