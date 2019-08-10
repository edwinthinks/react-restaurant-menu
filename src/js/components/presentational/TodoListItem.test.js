import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TodoListItem from './TodoListItem.jsx'

test('shows the provided task and can be marked done or incomplete', () => {
  const props = {
    value: 'Get a jar of milk',
    done: false,
    onRemove: jest.fn()
  }

  const { queryByText } = render(
    <TodoListItem {...props} />
  )

  expect(queryByText(/Get a jar of milk/)).not.toBeNull()
  expect(queryByText(/Not Done/)).not.toBeNull()

  fireEvent.click(queryByText('Mark Done'))

  expect(queryByText(/Done/)).not.toBeNull()

  fireEvent.click(queryByText('Mark Incomplete'))
  expect(queryByText(/Not Done/)).not.toBeNull()

  const removeButton = queryByText(/Remove/)
  expect(removeButton).not.toBeNull()

  fireEvent.click(removeButton)
  expect(props.onRemove.mock.calls.length).toBe(1)
})
