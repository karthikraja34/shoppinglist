import React from "react";

export default class Input extends React.Component {
  constructor() {
    super();
  }

  newTodo(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      this.props.createTodo(e.target.value);
      e.target.value = "";
    }
  }

  getValue(e) {
    this.props.returnInput(e.target.value);
  }

  componentWillMount() {
    //console.log('mount')
  }

  componentWillUnmount() {
    //console.log('unmount')
  }

  render() {
    return (
      <input onChange={this.getValue.bind(this)} onKeyUp={this.newTodo.bind(this)} />
    );
  }
}
