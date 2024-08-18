import { TodoItem, TodoList } from "./classes.js";

export class Command {
    name;
    args; //Array
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

export const Commands = {
    ADD: "add",
    DELETE: "delete",
}

export const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();
        switch (command.name) {
            case Commands.ADD:
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                const itemInList = todoList.find(todoText);

                if(todoText != "" && itemInList == undefined) {
                    todoInput.value = "";
                    todoList.add(new TodoItem(todoText));
                }
                break;
            case Commands.DELETE:
                const [textToDelete] = command.args;
                todoList.delete(textToDelete);
                break;
        }
    }
}