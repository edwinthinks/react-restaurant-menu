import TodoList from './js/components/container/TodoList.jsx'
import './styles.css'

import React from 'react'
import ReactDOM from 'react-dom'

const wrapper = document.getElementById('todo-list')
ReactDOM.render(<TodoList />, wrapper)
