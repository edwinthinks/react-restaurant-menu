import React, { Component } from "react";
import ReactDOM from "react-dom";
import TodoListItem from "../presentational/TodoListItem.jsx";

export default class TodoList extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <>
        <TodoListItem value='hello'/>
      </>
    )
  }
}

const wrapper = document.getElementById('todo-list');
wrapper ? ReactDOM.render(<TodoList />, wrapper) : false;
