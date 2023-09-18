import { cleanup } from '@testing-library/react'
import { RequiredFieldValidation } from './required-field.validation'
import { RequiredFieldError } from './errors'
import { faker } from '@faker-js/faker'

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

  test('Should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(faker.lorem.sentence())
    expect(error).toBeFalsy()
  })
})
