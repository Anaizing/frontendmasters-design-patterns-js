import { TodoItem } from "./classes";

export const TodoHistory = {
    history: [],
    push(state) {
        if (state) {
            // this.history.push(state); //TODO
            this.history.push(new Set([...state]))
        }
    },
    pop() {
        if (this.history.length > 1) {
            this.history.pop();
            return this.history.pop();
        }
    }
}

const todoItem = TodoItem.getInstance();
todoItem.addObserver(() => {
    TodoHistory.push(todoItem.items);
});

// what a Set is...
// Set [pointers, pointers, pointers]