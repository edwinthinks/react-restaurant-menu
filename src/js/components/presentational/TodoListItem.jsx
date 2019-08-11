import React, { useState, useEffect } from "react";
import Input from "./Input.jsx";


function TodoListItem({value, isDone, onToggleDone, onEdit, onRemove}) {
  const [ todo, setTodo ] = useState(value)
  const [ isEditing, setIsEditing ] = useState(false);

  function handleKeyPress(evt) {
    if (evt.key === 'Enter' && todo) {
      onEdit(todo);
      setIsEditing(false);
    }
  }

  function taskField() {
    if (isEditing) {
      return <Input
        type="text"
        id="todo-task-edit"
        value={todo}
        handleChange={(e) => { setTodo(e.target.value) }}
        handleKeyPress={handleKeyPress}
      />
    } else {
      return <span
        className='text-4xl w-3/4 min-w-3/4 py-1'
        onClick={() => { setIsEditing(true) } }
      >
        {todo}
      </span>
    }
  }

  return (
    <>
      <div className='flex my-4 border-b border-blue-500'>
        <input type='checkbox' id='toggle' className='h-16 w-10 px-4 mx-4' checked={isDone} onChange={onToggleDone}/>

        <div className='w-3/4 min-w-3/4 max-w-6xl overflow-hidden'>
          {taskField()}
        </div>

        <div className='w-1/4 my-2 flex justify-end'>
          <button className='btn btn-red mx-1' onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </>
  )
}

export default TodoListItem;
