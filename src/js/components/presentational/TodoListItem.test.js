import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TodoListItem from './TodoListItem.jsx'

test('shows the provided task and can be marked done or incomplete', () => {
  const props = {
    value: 'Get a jar of milk',
    done: false,
    onToggleDone: jest.fn(),
    onRemove: jest.fn()
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
