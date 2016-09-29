import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";
import Input from "../components/Input";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.getFilteredTodos = this.getFilteredTodos.bind(this);
    this.returnInput = this.returnInput.bind(this);
    this.setUser = this.setUser.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      user: TodoActions.getUser(),
    };

    this.state.userInput = "";
    this.reloadTodos();
  }

  componentWillMount() {
    TodoStore.on("user", this.setUser);
    TodoStore.on("change", this.getTodos);
    TodoStore.on("filter", this.getFilteredTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("user", this.setUser);
    TodoStore.removeListener("change", this.getTodos);
    TodoStore.removeListener("filter", this.getFilteredTodos);
  }

  setUser() {
    console.log(TodoStore.getUser());
    this.setState({
      //todos: TodoStore.getAll(),
      user: TodoStore.getUser(),
    });
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  getFilteredTodos() {
    this.setState({
      todos: TodoStore.getFiltered(),
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  filterTodos() {
    TodoActions.filterTodos(this.state.userInput);
  }

  createTodo(userInput) {
    TodoActions.createTodo(userInput);
  }

  deleteTodo(id) {
    TodoActions.deleteTodo(id);
  }

  completeTodo(id) {
    TodoActions.completeTodo(id);
  }

  returnInput(input) {
    this.state.userInput = input;
    this.filterTodos();
  }

  render() {

    const { todos } = this.state;
    const TodoComponents = todos.map((todo) => {
        return (<Todo deleteTodo={this.deleteTodo} completeTodo={this.completeTodo} key={todo.id} {...todo}/>);
    });

    return (
      <div>
        <div>Logged in as {this.state.user}.</div>
        <Input returnInput={this.returnInput} createTodo={this.createTodo} />
        <button onClick={this.reloadTodos.bind(this)}>Reload</button>
        <h1>Shopping List</h1>
        <ul>{TodoComponents}</ul>
      </div>
    );
  }
}
