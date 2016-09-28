import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.user = {};
    this.todos = [];
    this.filteredTodos = [];
  }

  createTodo(newTodo) {
    this.todos.push(newTodo.todo);
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  getFiltered() {
    return this.filteredTodos;
  }

  getUser() {
    return this.user;
  }


  // FROM DISPATCHER
  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }
      case "FILTER_TODOS": {
        this.filteredTodos = this.todos.filter((todo) => {
          return action.filter.test(todo.text); //true or false on regex
        });
        this.emit("filter");
        break;
      }
      case "DELETE_TODO": {
        // this.todos = this.todos.filter((todo) => { // Doing this from the DB instead
        //   return todo.id !== action.id;
        // });
        this.emit("change");
        break;
      }
      case "GET_USER": {
        this.user = action.user;
        //console.log('storeUser: ', this.user);
        this.emit("user");
        break;
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
//window.todoStore = todoStore;
export default todoStore;
