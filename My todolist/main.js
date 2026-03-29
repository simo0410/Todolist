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
