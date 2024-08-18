import { CommandExecutor, Commands, Command } from "./webapp/command.js";
import { TodoList } from "./webapp/classes.js";

globalThis.DOM = {}; //create global access to dom
const DOM = globalThis.DOM;

function renderList() {
    const list = TodoList.getInstance();
    for(let todo of list.items) {
        const listItem = document.createElement("li");
        listItem.className = "todo-item";
        listItem.innerHTML = `${todo.text} <button class="delete-btn">Delete</button>`;
        listItem.dataset.text = todo.text; // <li data-text=""></li>
        DOM.todoList.appendChild(listItem);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    DOM.todoList = document.getElementById("todo-list");
    DOM.addButton = document.getElementById("add-btn");;
    DOM.todoInput = document.getElementById("todo-input");

    DOM.addButton.addEventListener("click", event => {
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
    });

    DOM.todoList.addEventListener("click", event => {
        if(event.target.classList.contains("delete-btn")) {
            const cmd = new Command(Commands.DELETE);
            CommandExecutor.execute(cmd);
        }
    });

    renderList();
    TodoList.getInstance().addObserver(renderList);
})