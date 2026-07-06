const newTaskInput = document.getElementById("new-task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

function addTask() {
  const taskText = newTaskInput.value.trim();

  if (taskText === "") {
    alert('Por favor, adicione uma tarefa antes de clicar em "Adicionar"');
    return;
  }

  fetch("/api/tarefas", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ texto: taskText }),
  }).then((res) => {
    if (res.status === 201) {
      loadTasks();
      newTaskInput.value = "";
    }
  });
}

function loadTasks() {
  fetch("/api/tarefas")
    .then((res) => res.json())
    .then((tarefas) => {
      taskList.innerHTML = "";

      tarefas.forEach((tarefa) => {
        if (!tarefa) return;

        const newItem = document.createElement("li");
        newItem.innerText = tarefa;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {

          newItem.remove();
          
          fetch('api/tarefas', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texto: tarefa })
          })
            .then(res => {
              if (res.staus === 200) {
                loadTasks();
              }
            })
        });

        newItem.appendChild(deleteBtn);
        taskList.appendChild(newItem);
      });
    });
}

loadTasks();

addBtn.addEventListener("click", addTask);
