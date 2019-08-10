import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import TodoListItem from "../presentational/TodoListItem.jsx";

function TodoList() {
  const [newTodoTask, setNewTodoTask] = useState('')
  const [todoTasks, setTodoTasks] = useState([])

  function handleSubmit() {
    setTodoTasks(todoTasks.concat(newTodoTask));
    setNewTodoTask('');
  }

  function removeTodoListItem(index) {
    let newTodoTasks = todoTasks.filter((val,idx) => { return idx !== index; })
    setTodoTasks(newTodoTasks);
  }

  return(
    <>
      <Input
        label="new-todo-task"
        type="text"
        value={newTodoTask}
        text="New Todo Task"
        id="new-todo-task"
        handleChange={(v) => setNewTodoTask(v.target.value)}
        handleKeyPress ={(v) => { (v.key === 'Enter' && newTodoTask) && handleSubmit() } }
      />

      { newTodoTask ? <button onClick={handleSubmit}> Add </button> : '' }

      {todoTasks.map((value, index) => {
        return <TodoListItem key={index} value={value} onRemove={() => { removeTodoListItem(index); }}/>
      })}
    </>
  )
}

export default TodoList

const wrapper = document.getElementById('todo-list');
wrapper ? ReactDOM.render(<TodoList />, wrapper) : false;
