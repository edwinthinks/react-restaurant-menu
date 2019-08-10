import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import TodoListItem from "../presentational/TodoListItem.jsx";
import shortid from 'shortid'

function TodoList() {
  const [newTodoTask, setNewTodoTask] = useState('')
  const [todoTasks, setTodoTasks] = useState([])

  function handleSubmit() {
    let newTodoTasks = todoTasks.concat({text: newTodoTask});
    setTodoTasks(newTodoTasks);
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

      {todoTasks.map((todo, index) => {
        return <TodoListItem
          key={shortid.generate()}
          value={todo.text}
          onRemove={() => { removeTodoListItem(index) }}
        />
      })}
    </>
  )
}

export default TodoList

const wrapper = document.getElementById('todo-list');
wrapper ? ReactDOM.render(<TodoList />, wrapper) : false;
