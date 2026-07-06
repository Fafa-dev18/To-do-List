const express = require("express");
const app = express();
const fs = require('fs');
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());

const FILE_PATH = 'tasks.json';

function loadTasksFromFile() {
  try {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    return [];
  }

  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
} catch (error) {
  console.error('Error reading tasks from file:', error);
  return [];}
}

function saveTasksToFile(tarefas) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tarefas, null, 2));
}

app.get("/api/tarefas", function (req, res) {
  const tarefas = loadTasksFromFile();
  return res.json(tarefas);
});

app.post("/api/tarefas", function (req, res) {
  let tarefas = loadTasksFromFile();
  const newTask = req.body.texto;

  if (newTask) {
    tarefas.push(newTask);
    saveTasksToFile(tarefas);
  }

  return res.status(201).json(tarefas);
});

app.delete('/api/tarefas', function (req, res) { 
  const taskToDelete = req.body.texto;
  let tarefas = loadTasksFromFile();

  tarefas = tarefas.filter(function (tarefa) {
    return tarefa !== taskToDelete;
  });

  saveTasksToFile(tarefas);

  return res.status(200).json(tarefas);
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
