import React from 'react'
import { render, fireEvent } from 'test-utils'
import TodoList from './TodoList.jsx'


test('adding and removing a todo item', () => {
  const { queryByText, getByText, getByLabelText, queryAllByText } = render(
    <TodoList/>
  )

  // Add a task
  let firstTask = 'first-task'
  fireEvent.change(getByLabelText(/add new task/i), {target: {value: firstTask}})
  fireEvent.click(getByText(/submit/i))

  // Add a second task
  let secondTask = 'second-task'
  fireEvent.change(getByLabelText(/add new task/i), {target: {value: secondTask}})
  fireEvent.click(getByText(/submit/i))

  // Check that there are two tasks
  expect(queryAllByText(/-task/i)).toHaveLength(2);

  // Remove one of them.
  // TODO - how can I be sure I removed that specific one?
  fireEvent.click(queryAllByText('Remove')[1])

  // Check that there is correct amount left
  expect(queryAllByText(/-task/i)).toHaveLength(1);
})

test('pressing enter when the input has values adds the task', () => {
  const { queryByText, getByText, getByLabelText, queryAllByText } = render(
    <TodoList/>
  )

  let inputField = getByLabelText(/add new task/i);

  expect(inputField.value).toBe('');

  // Press enter with nothing in the field
  fireEvent.keyDown(inputField, { key: 'Enter', code: 13 })

  expect(queryAllByText(/something/i)).toHaveLength(0);

  fireEvent.change(inputField, {target: {value: 'something'}})
  fireEvent.keyPress(inputField, { key: "Enter", code: 13, charCode: 13 });

  expect(queryAllByText(/something/i)).toHaveLength(1);
})

test('add button does appears only when there is something in the input', () => {
  const { queryByText, getByText, getByLabelText, queryAllByText } = render(
    <TodoList/>
  )

  expect(queryByText(/submit/i).hasAttribute('disabled')).toBe(true);

  fireEvent.change(getByLabelText(/add new task/i), {target: {value: 'something'}})

  expect(queryByText(/submit/i).hasAttribute('disabled')).toBe(false);
})
