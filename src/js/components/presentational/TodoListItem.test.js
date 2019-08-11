import React from 'react'
import { render, fireEvent } from 'test-utils'
import TodoListItem from './TodoListItem.jsx'

test('shows the provided task and can be marked done or incomplete', () => {
  const props = {
    value: 'Get a jar of milk',
    done: false,
    onToggleDone: jest.fn(),
    onRemove: jest.fn(),
    onEdit: jest.fn()
  }

  const { queryByText, queryByRole } = render(
    <TodoListItem {...props} />
  )

  expect(queryByText(/Get a jar of milk/)).not.toBeNull()

  fireEvent.click(queryByRole('checkbox'))
  expect(props.onToggleDone.mock.calls.length).toBe(1)

  const removeButton = queryByText(/Remove/)
  expect(removeButton).not.toBeNull()

  fireEvent.click(removeButton)
  expect(props.onRemove.mock.calls.length).toBe(1)
})

test('can edit the value of a task', () => {
  const props = {
    value: 'Get a jar of milk',
    done: false,
    onToggleDone: jest.fn(),
    onEdit: jest.fn(),
    onRemove: jest.fn()
  }

  const { queryByText, getByDisplayValue } = render(
    <TodoListItem {...props} />
  )

  fireEvent.click(queryByText(props.value))

  const inputField = getByDisplayValue(props.value)
  expect(inputField).not.toBeNull()

  const newValue = 'Goto the gym'
  fireEvent.change(inputField, { target: { value: newValue } })
  fireEvent.keyPress(inputField, { key: 'Enter', code: 13, charCode: 13 })

  expect(props.onEdit.mock.calls.length).toBe(1)

  expect(inputField).not.toBeNull()

  expect(queryByText(newValue)).not.toBeNull()
})
