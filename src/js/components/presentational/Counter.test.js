import React from 'react';
import {render, fireEvent} from '@testing-library/react'
import Counter from './Counter.jsx'

test('Counter goes up when clicked', () => {
  const {queryByText, getByLabelText, getByText} = render(
    <Counter/>
  )

  let count = 0;
  expect(queryByText(`You clicked ${count} times`)).not.toBeNull()

  let button = getByText('Click me');
  fireEvent.click(button);

  count += 1;
  expect(queryByText(`You clicked ${count} times`)).not.toBeNull()

  fireEvent.click(button);

  count += 1;
  expect(queryByText(`You clicked ${count} times`)).not.toBeNull()
})

