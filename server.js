const express = require("express");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const port = 3000;
const FILE_PATH = "tasks.json";

app.use(express.static(__dirname));
app.use(express.json());

function loadTasks() {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
      return [];
    }
    const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    
    const migrated = data.map((t) =>
      typeof t === "string" ? { id: crypto.randomUUID(), texto: t, feita: false } : t
    );
    return migrated;
  } catch (error) {
    console.error("Erro ao ler tarefas:", error);
    return [];
  }
}

function saveTasks(tarefas) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tarefas, null, 2));
}

app.get("/api/tarefas", (req, res) => {
  res.json(loadTasks());
});

app.post("/api/tarefas", (req, res) => {
  const texto = req.body.texto?.trim();
  if (!texto) return res.status(400).json({ erro: "Texto obrigatório" });

  const tarefas = loadTasks();
  const nova = { id: crypto.randomUUID(), texto, feita: false };
  tarefas.push(nova);
  saveTasks(tarefas);

  res.status(201).json(nova);
});

app.patch("/api/tarefas/:id", (req, res) => {
  const tarefas = loadTasks();
  const tarefa = tarefas.find((t) => t.id === req.params.id);

  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });

  tarefa.feita = !tarefa.feita;
  saveTasks(tarefas);
  res.json(tarefa);
});

app.delete("/api/tarefas/:id", (req, res) => {
  let tarefas = loadTasks();
  tarefas = tarefas.filter((t) => t.id !== req.params.id);
  saveTasks(tarefas);
  res.status(200).json(tarefas);
});

app.listen(port, () => console.log(`Server rodando na porta ${port}`));
