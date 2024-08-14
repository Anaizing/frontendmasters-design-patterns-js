globalThis.DOM = {}; //create global access to dom
const DOM = globalThis.DOM;

document.addEventListener("DOMContentLoaded", () => {
    DOM.todoList = document.getElementsById("todo-list");
    DOM.addButton = document.getElementsById("add-btn");;
    DOM.todoInput = document.getElementsById("todo-input");

    DOM.addButton.addEventListener("click", event => {
        // TODO
    });

    DOM.todoList.addEventListener("click", event => {
        if(event.target.classList.contains("delete-btn")) {
            // TODO
        }
    });
})