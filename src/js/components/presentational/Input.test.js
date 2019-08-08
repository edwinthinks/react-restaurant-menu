import React from 'react'
import { render } from '@testing-library/react'
import Input from './Input.jsx'

test('Input has all the values provided in the prop', () => {
  // id of the input field must match the 'for' of the label
  const props = {
    label: 'fakeInput',
    text: 'fake',
    type: 'fake type',
    id: 'fakeInput',
    value: 'fake-value',
    handleChange: () => {}
  }

  const { getByLabelText } = render(
    <Input {...props}/>
  )

  const inputField = getByLabelText(props.text)
  expect(inputField).not.toBeNull()
})
