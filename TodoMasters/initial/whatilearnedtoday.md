
>CREATIONAL DESIGN PATTERNS aim to solve the problems associated with creating objects in a way that enhances flexibility and reuse of existing code. The primary purpose of creational patterns is to separate the logic of the object creation from the rest of the code.

# Singleton

### problem to solve
ensure that a class has only one instance and provide a global access to it. 
### solution
restrict instantiation of the class to one object and provide a method to access this instance.
### use cases 
* managing a global configuration object
* database connection pooling
* logging service
* state management

```js
// you can create a global object this is the simplest singleton

const Database = {
    open: async () => {}
    sendQuery: async (query) => {}
};

```

# Factory

### problem to solve
object creation can become complex and may involve multiple steps, conditional logic, or dependencies
### solution
the factory pattern encapsulates the object creation process with a separate method or class, isolating it from the rest of the application logic. decoupling
### use cases 
* ui element creation
* different types of notifications
* data parsers

```js
class PDFReader extends Reader {};
class CSVReader extends Reader {};
class SQLReader extends Reader {};

class Reader {
    static getReader(url) {
        // based on the return type of the url
        // we return one of the possible readers
    }
}
```


------------------------------------------------

>STRUCTURAL DESIGN PATTERNS solutions for composing classes and objects to form larger structures while keeping them flexible and efficient. They focus on simplifying relationships between entitie to ensure system maintainability and scalability

# Decorator

used in react eg higher-order component

### problem to solve
add additional functionality to objects dynamically without modifying their structure 
### solution
wrap an object with another object that adds the behaviour
### use cases 
* adding logging, validation, or caching to method calls
* extending user face components with additional features
* wrapping api responses to format or process data before passing it on

```js

class Button {
    render() {}
 }

class DecoratedButton extends Button {
    render() {
        super.render();
        // Decorating code
    }
}
```

# Adapter

### problem to solve
allow incompatible interfaces to work together
### solution
create an adapter that translates one interface into another that a client expects
### use cases 
* intergrating third-party libraries with different interfaces into your application
* adapting legacy code to work with new systems or api's
* converting data formats


# Mixins

### problem to solve
sharing functionality between classes without using inheritance
### solution
create a class containing methods that can be used by other classes and apply it to multiple classes

```js
//mixin
let sayHiMixin = {
    sayHi() { alert(`Hello ${this.name}`);}
};

class User {
    name
}
// you are injecting every behaviour of the mixin into every object of the User class
Object.assign(User.prototype, sayHiMixin) ;

```

# Value Object

### problem to solve
represent a value that is immutable and distinct from other objects based on its properties rather than its identity
### solution
create a class where instances are considered equal if all their properties are equal and ensure the object is immutable
### use cases 
* representing complex data types like money, coordinates or dates

```js

class Money {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
        // freze the object to make it immutable
        object.freeze(this);
    }
    equals(other) {
        return other instanceof Money && 
            this.amount === other.amount &&
            this.currency === other.currency;
    }
}

```


------------------------------------------------

>BEHAVIORAL DESIGN PATTERNS deal with object interaction and responsibility distribution. They focus on how objects comunicate and cooperate, ensuring that the system is flexible and easy to understand. 

# Observer

eg. onclick or addEventListener
### problem to solve
allow an object (subject) to notify other objects (observers) about changes in its state without requiring them to be tightly coupled
### solution
define a subject that maintains a list of observers and notifies them of any state changes, typically by calling one of their methods
### use cases 
* event handlers
* real-time notifications
* ui updates

```js

class Subject {
    observers = new Set();
    addObserver(observer) { this.observers.add(observer); }
    removeObserver(observer) { this.observers.delete(observer); }

    notifyObservers(message) {
        this.observers.forEach(observer => observer(message));
    }
}

// Usage
subject1.addObserver(message => console.log("Event fired"));
```


# Template Method

### problem to solve
define the skeleton of an algorithm that will change on different implementations
### solution
create a class with a template method that outlines the algorithm and make subclasses to override specific steps of the algorithm
### use cases 
* data processing
* form validation

```js

class DataProcessor {
    process() {
        this.loadData();
        this.processData();
        this.saveData();
    }
}
// subclasses will hold the implementation
class JSONDataProcessor extends DataProcessor {
    loadData() { /* code */ }
    processData() { /* code */ }
    saveData() { /* code */ }
}
```

# Memento

### problem to solve
capture and externalize an object's internal state so it can be restored later, without violating encapsulation
### solution
create an object that stores the state of the object and provide methods to save and restore the state
### use cases 
* undo/redo functionality
* saving a gameor app session

```js

class HistoryManager {
    history = [];
    push(state) {
        this.history.push(createMemento());
    }

    pop() {
        if (this.history.length === 0) return null;
        return this.history.pop();
    }
}

```

# Command

### problem to solve
how to avoid hard-wiring an event from its invoker
### solution
create an object that is used to encapsulate all information needed to perform an action or trigger an event at a later time
### use cases 
* manage the actions of your app (such as Add, Delete, save, load)


--------------------------------------------------------


# globalThis

```js
//globalThis targets depending on context the global example the window

globalThis.DOM = {} //here we are creating global access to the dom

```

# modules

set up modules by declaring modules on the html file `type="modules"`

```html

<script src="app.js" defer type="modules"></script>

```

# #data
`#data` is a private property

