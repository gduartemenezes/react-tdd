import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('', () => {
  test('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login/>)
    const erroWrap = getByTestId('error-wrap')
    expect(erroWrap.childElementCount).toBe(0)
  })
})
