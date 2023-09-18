import { cleanup } from '@testing-library/react'
import { RequiredFieldValidation } from './required-field.validation'
import { RequiredFieldError } from './errors'

describe('', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
})
