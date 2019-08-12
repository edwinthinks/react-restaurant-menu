import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import TodoListItem from "../presentational/TodoListItem.jsx";
import shortid from 'shortid'

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_TODOS = gql`
  {
    todo(order_by: {id: asc}) {
      id
      isDone
      text
    }
  }
`;

const UPDATE_TODO = gql`
  mutation update_article($id: Int, $isDone: Boolean, $text: String) {
    update_todo(where: {id: {_eq: $id}}, _set: {isDone: $isDone, text: $text}) {
      affected_rows
      returning {
        id
        isDone
        text
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation insert_todo($text: String) {
    insert_todo(objects: {text: $text, isDone: false}) {
      returning {
        id
        text
        isDone
      }
    }
  }
`

const DELETE_TODO = gql`
  mutation delete_todo($id: Int) {
    delete_todo(where: {id: {_eq: $id}}) {
      returning {
        id
        isDone
        text
      }
    }
  }
`

function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS)

  const [updateTodo] = useMutation(UPDATE_TODO);

  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, {data: { insert_todo } } ) {
      // This updates the local state of graphql results
      const { todo } = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: { todo: todo.concat(insert_todo.returning) },
      });
    }
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(cache, {data: { delete_todo } } ) {
      const { todo } = cache.readQuery({ query: GET_TODOS });
      let newTodos = todo.filter((t) => {
        return t.id !== delete_todo.returning[0].id
      });

      cache.writeQuery({
        query: GET_TODOS,
        data: { todo: newTodos  },
      });
    }
  });

  const [newTodoTask, setNewTodoTask] = useState('');

  function handleSubmit() {
    addTodo({ variables: { text: newTodoTask } })
    setNewTodoTask('');
  }

  function toggleDone(index) {
    let task = data.todo[index];

    updateTodo({ variables: {
      id: task.id,
      isDone: !task.isDone,
      text: task.text
    }});
  }

  function removeTodoListItem(index) {
    let task = data.todo[index];
    deleteTodo({ variables: { id: task.id } })
  }

  function updateTodoValue(value, index) {
    let task = data.todo[index];

    updateTodo({ variables: {
      id: task.id,
      isDone: task.isDone,
      text: value
    }});
  }

  if (loading) {
    return <p>Loading ... </p>
  }

  return(
    <div className='w-3/4 border-4 rounded border-indigo-500 mx-auto'>
      <h1 className='text-4xl p-4 bg-indigo-500 text-white'> Todo List </h1>

      <div className='px-8'>
      {data.todo.map((todo, index) => {
        return <TodoListItem
          key={shortid.generate()}
          isDone={todo.isDone}
          value={todo.text}
          onEdit={(updatedTodo) => { updateTodoValue(updatedTodo, index) }}
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
