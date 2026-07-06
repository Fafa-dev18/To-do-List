# 🚀 To-Do List Full-Stack

Um aplicativo de lista de tarefas completo, desenvolvido do absoluto zero com o objetivo de relembrar e consolidar os conceitos fundamentais do desenvolvimento **Full-Stack** (Front-end e Back-end). 

Este projeto foi criado como um ambiente de estudos para praticar a integração entre o navegador e um servidor próprio, aplicando conceitos de persistência de dados.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias puras (Vanilla), sem frameworks complexos, para entender como as coisas funcionam por baixo do capô:

* **Front-end:** HTML5, CSS3 (Layout moderno com Flexbox) e JavaScript Assíncrono.
* **Back-end:** Node.js com o micro-framework Express.
* **Armazenamento:** Módulo nativo `fs` (File System) do Node.js para persistência em arquivos JSON.

---

## 🧠 O que eu aprendi e pratiquei neste projeto?

### 📺 No Front-end (Interface)
* **Manipulação do DOM:** Captura de inputs, criação dinâmica de elementos HTML (`<li>` e `<button>`) via JavaScript.
* **UX/UI Otimista (Optimistic UI):** Técnica onde a tarefa é removida do ecrã instantaneamente ao clicar no "X", enquanto o pedido de exclusão é processado pelo servidor em segundo plano.
* **Consumo de APIs:** Utilização do método nativo `fetch()` para conectar o navegador ao servidor de forma assíncrona usando promessas (`.then()`).

### ⚙️ No Back-end (Servidor)
* **Criação de Servidor HTTP:** Configuração de uma aplicação Node.js com Express rodando na porta `3000`.
* **Criação de uma API REST:** Desenvolvimento de rotas estruturadas seguindo as boas práticas dos métodos HTTP:
  * `GET /api/tarefas`: Para listar as tarefas salvas.
  * `POST /api/tarefas`: Para receber e cadastrar novas tarefas.
  * `DELETE /api/tarefas`: Para remover tarefas específicas.
* **Persistência em Disco:** Manipulação de arquivos com o módulo `fs` do Node, garantindo que as tarefas fiquem salvas num ficheiro `tarefas.json` e não desapareçam mesmo que o servidor seja reiniciado.
* **Resolução de Problemas:** Gerenciamento de middlewares como o `express.json()`, tratamento de erros e permissões de execução de scripts no Windows (PowerShell).

---

## 🚀 Como rodar o projeto localmente

Se quiseres testar o projeto no teu computador, segue estes passos:

1. **Clona o repositório:**
   ```bash
   git clone [https://github.com/TEU_UTILIZADOR/nome-do-repositorio.git](https://github.com/Fafa-dev18/To-do-List)