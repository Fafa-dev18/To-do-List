const newTaskInput = document.getElementById("new-task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");
const emptyState = document.getElementById("empty-state");

const CHECK_ICON = `<svg viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
const TRASH_ICON = `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 7h12l-1 13H7L6 7zm3-3h6l1 2H8l1-2zM4 7h16" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function addTask() {
  const texto = newTaskInput.value.trim();
  if (!texto) return;

  fetch("/api/tarefas", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ texto }),
  })
    .then((res) => res.json())
    .then(() => {
      newTaskInput.value = "";
      loadTasks();
    });
}

function toggleTask(id) {
  fetch(`/api/tarefas/${id}`, { method: "PATCH" }).then(loadTasks);
}

function deleteTask(id, itemEl) {
  itemEl.remove();
  fetch(`/api/tarefas/${id}`, { method: "DELETE" }).then(loadTasks);
}

function renderTask(tarefa) {
  const li = document.createElement("li");
  li.className = "task-item";

  const check = document.createElement("button");
  check.className = "check" + (tarefa.feita ? " done" : "");
  check.innerHTML = CHECK_ICON;
  check.addEventListener("click", () => toggleTask(tarefa.id));

  const text = document.createElement("span");
  text.className = "task-text" + (tarefa.feita ? " done" : "");
  text.textContent = tarefa.texto;

  const del = document.createElement("button");
  del.className = "delete-btn";
  del.innerHTML = TRASH_ICON;
  del.addEventListener("click", () => deleteTask(tarefa.id, li));

  li.append(check, text, del);
  return li;
}

function loadTasks() {
  fetch("/api/tarefas")
    .then((res) => res.json())
    .then((tarefas) => {
      taskList.innerHTML = "";
      tarefas.forEach((tarefa) => taskList.appendChild(renderTask(tarefa)));

      const pendentes = tarefas.filter((t) => !t.feita).length;
      counter.textContent = `${pendentes} pendente${pendentes !== 1 ? "s" : ""}`;
      emptyState.classList.toggle("visible", tarefas.length === 0);
    });
}

loadTasks();
addBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
