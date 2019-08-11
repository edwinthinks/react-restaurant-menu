import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import TodoListItem from "../presentational/TodoListItem.jsx";
import shortid from 'shortid'

function TodoList() {
  const [newTodoTask, setNewTodoTask] = useState('');
  const [todoTasks, setTodoTasks] = useState([]);

  function handleSubmit() {
    let newTodoTasks = todoTasks.concat({text: newTodoTask});
    setTodoTasks(newTodoTasks);
    setNewTodoTask('');
  }

  function toggleDone(index) {
    let newArr = [...todoTasks]
    newArr[index] = {...newArr[index], isDone: !newArr[index].isDone }
    setTodoTasks(newArr)
  }

  function removeTodoListItem(index) {
    let newTodoTasks = todoTasks.filter((val,idx) => { return idx !== index; })
    setTodoTasks(newTodoTasks);
  }

  return(
    <div className='w-3/4 border-4 rounded border-indigo-500 mx-auto'>
      <h1 className='text-4xl p-4 bg-indigo-500 text-white'> Todo List </h1>

      <div className='px-8'>
      {todoTasks.map((todo, index) => {
        return <TodoListItem
          key={shortid.generate()}
          isDone={todo.isDone}
          value={todo.text}
          onToggleDone={() => { toggleDone(index) }}
          onRemove={() => { removeTodoListItem(index) }}
        />
      })}
      </div>

      <div className='px-8 py-4'>
        <Input
          label="new-todo-task"
          type="text"
          value={newTodoTask}
          text="Add New Task"
          id="new-todo-task"
          handleChange={(v) => setNewTodoTask(v.target.value)}
          handleKeyPress ={(v) => { (v.key === 'Enter' && newTodoTask) && handleSubmit() } }
        />

        <div className='flex justify-end'>
          <button className="btn btn-blue" onClick={handleSubmit} disabled={!newTodoTask}>
            Submit
          </button>
        </div>
      </div>

    </div>
  )
}

export default TodoList

const wrapper = document.getElementById('todo-list');
wrapper ? ReactDOM.render(<TodoList />, wrapper) : false;
