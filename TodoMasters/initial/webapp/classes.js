import { observerMixin } from './mixins.js';

export class TodoItem {
    constructor(text) {
        this.text = text;
    }

    equals(other) { //Value Object pattern
        return this.text == other.text;
    }
}

export class TodoList { // candidate for a Singleton
    // Data   
    #data = new Set(); // #data is a private property
    get items() { return this.#data }

    // Singleton 
    constructor(){
        if(TodoList.instance) {
            throw new Error("Use TodoList.getInstance() to access the list");
        }
    }
    static instance = null;
    static {
        this.instance = new TodoList();
    }
    static getInstance() {
        return this.instance;
    }

    // List behaviour
    add(item) {
        const array = Array.from(this.#data);
        const todoExists = array.filter(t => t.equals(item)).length > 0 ;
        if (!todoExists) {
            this.#data.add(item); 
            this.notify();
        }
    }
    delete(todo_text) {
        const array = Array.from(this.#data);
        const todoToDelete = array.filter(t=>t.text==todo_text);
        this.#data.delete(todoToDelete[0]); 
        this.notify();
    } 
    find(todo_text) {
        const array = Array.from(this.#data);
        return array.find(t => t.text == todo_text)
    }
    replaceList(list) {
        this.#data = list;
        this.notify();
    }
}
// applying the observer mixin to the class
Object.assign(TodoList.prototype, observerMixin);

// const todoList = TodoList.getInstance() //uses Singleton
// const todoList1 = TodoList.getInstance() //uses Singleton
// const todoList3 = TodoList.TodoList() // this would create a new instance and break the singleton so we add an error