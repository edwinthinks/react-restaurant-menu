import './js/components/container/FormContainer.jsx'
import TodoList from './js/components/container/TodoList.jsx'

import React from 'react'
import ReactDOM from 'react-dom'

const wrapper = document.getElementById('todo-list')
ReactDOM.render(<TodoList />, wrapper)
