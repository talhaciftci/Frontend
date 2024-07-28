// selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

// event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos)

// functions
function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  const compButton = document.createElement("button");
  compButton.innerHTML = "<i class='fas fa-check'></i>";
  compButton.classList.add("complete-btn");
  todoDiv.appendChild(compButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);

  saveLocalTodos(todoInput.value);

  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // delete
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("trans");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // completed
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    const compButton = document.createElement("button");
    compButton.innerHTML = "<i class='fas fa-check'></i>";
    compButton.classList.add("complete-btn");
    todoDiv.appendChild(compButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
  });
}
