import { cleanup } from '@testing-library/react'
import { RequiredFieldValidation } from './required-field.validation'
import { RequiredFieldError } from './errors'
import { faker } from '@faker-js/faker'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.lorem.sentence())

describe('', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.sentence())
    expect(error).toBeFalsy()
  })
})
