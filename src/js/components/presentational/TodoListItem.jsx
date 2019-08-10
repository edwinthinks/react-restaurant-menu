import React, { useState, useEffect } from "react";

function TodoListItem({value, isDone, onRemove}) {
  let [ task, setTodo ] = useState(value);
  let [ done, setDone ] = useState(done);

  return (
    <>
      <li>
        <span> Todo - {task} - {done ? 'Done' : 'Not Done'} </span>
        <button onClick={() => setDone(!done)}>
          {done ? 'Mark Incomplete' : 'Mark Done'}
        </button>
        <button onClick={onRemove}>
          Remove
        </button>
      </li>
    </>
  )
}

export default TodoListItem;
