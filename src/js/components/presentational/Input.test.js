import React from 'react';
import {render, fireEvent} from '@testing-library/react'
import Input from './Input.jsx'

test('Input has all the values provided in the prop', () => {
  // id of the input field must match the 'for' of the label
  let props = {
    label: 'fakeInput',
    text: 'fake',
    type: 'fake type',
    id: 'fakeInput',
    value: 'fake-value',
    handleChange: () => {}
  };

  const {queryByText, getByLabelText, getByText} = render(
    <Input {...props}/>
  )

  let inputField = getByLabelText(props.text)
  expect(inputField).not.toBeNull();


})


