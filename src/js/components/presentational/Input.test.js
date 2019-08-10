import React from 'react'
import { render, fireEvent} from 'test-utils'
import Input from './Input.jsx'

test('changing the value trigger the handleChange prop', () => {
  const handleKeyPressSpy = jest.fn();
  const handleChangeSpy = jest.fn();

  // id of the input field must match the 'for' of the label
  const props = {
    label: 'fakeInput',
    type: 'text',
    text: 'fake',
    id: 'fakeInput',
    value: '',
    handleChange: handleChangeSpy,
    handleKeyPress: handleKeyPressSpy
  }

  const { getByLabelText } = render(
    <Input {...props}/>
  )

  const input = getByLabelText(props.text);
  expect(input.value).toBe('')

  fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
  expect(handleKeyPressSpy).toHaveBeenCalledTimes(1);

  fireEvent.change(input, { target: { value: '23' } })
  expect(handleChangeSpy).toHaveBeenCalledTimes(1);
})
