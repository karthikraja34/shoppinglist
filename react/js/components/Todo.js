import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super();
  }

  clickedDelete(todo) {
    //console.log('deleteprops: ', this.props);
    this.props.deleteTodo(this.props.id);
  }

  clickedComplete(todo) {
    //console.log('completeprops: ', this.props);
    this.props.completeTodo(this.props.id);
  }
  

  render() {
    const { complete, edit, text } = this.props;

    const icon = complete ? "\u2714" : "\u2716"

    if (edit) {
      return (
        <li>
          <input value={text} focus="focused"/>
        </li>
      );
    }

    const todoStyle = {
      padding: '4px',
      fontSize: '20'
    }
    const liStyle = {
      paddingTop: '4px',
      paddingBottom: '4px',
    }

    return (
      <li style={liStyle}>
        <button className="btn btn-xs btn-danger" onClick={this.clickedDelete.bind(this)}>-</button>
        <button className="btn btn-xs btn-info" onClick={this.clickedComplete.bind(this)}>{icon}</button>
        <span style={todoStyle}>{text}</span>
      </li>
    );
  }
}
