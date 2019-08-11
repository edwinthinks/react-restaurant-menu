import React, { useState, useEffect } from "react";

function TodoListItem({value, isDone, onToggleDone, onRemove}) {
  let [ task, setTodo ] = useState(value);

  return (
    <>
      <div className='flex my-4 border-b border-blue-500'>
        <input type='checkbox' id='toggle' className='h-16 w-10 px-4 mx-4' checked={isDone} onChange={onToggleDone}/>
        <span className='text-4xl w-3/4 py-1'> {task} </span>

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
