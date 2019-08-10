import React from 'react'
import { render, fireEvent } from 'test-utils'
import TodoList from './TodoList.jsx'


test('adding and removing a todo item', () => {
  const { queryByText, getByText, getByLabelText, queryAllByText } = render(
    <TodoList/>
  )

  // Add a task
  let firstTask = 'first-task'
  fireEvent.change(getByLabelText(/new todo task/i), {target: {value: firstTask}})
  fireEvent.click(getByText(/add/i))

  // Add a second task
  let secondTask = 'second-task'
  fireEvent.change(getByLabelText(/new todo task/i), {target: {value: secondTask}})
  fireEvent.click(getByText(/add/i))

  // Check that there are two tasks
  expect(queryAllByText(/Todo -/i)).toHaveLength(2);

  // Remove one of them.
  // TODO - how can I be sure I removed that specific one?
  fireEvent.click(queryAllByText('Remove')[1])

  // Check that there is correct amount left
  expect(queryAllByText(/Todo -/i)).toHaveLength(1);
})

test('add button does appears only when there is something in the input', () => {
  const { queryByText, getByText, getByLabelText, queryAllByText } = render(
    <TodoList/>
  )

  expect(queryByText(/add/i)).toBeNull();

  fireEvent.change(getByLabelText(/new todo task/i), {target: {value: 'something'}})

  expect(queryByText(/add/i)).not.toBeNull();
})
