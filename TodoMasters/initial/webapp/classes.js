import {observerMixin} from './mixins.js';

class TodoItem {
    constructor(text) {
        this.text = text;
    }

    equals(other) { //Value Object pattern
        return this.text == other.text;
    }
}

class TodoList { // candidate for a Singleton
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
}
// applying the observer mixin to the class
Object.assign(TodoList.prototype, observerMixin);

// const todoList = TodoList.getInstance() //uses Singleton
// const todoList1 = TodoList.getInstance() //uses Singleton
// const todoList3 = TodoList.TodoList() // this would create a new instance and break the singleton so we add an error