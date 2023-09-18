import { faker } from '@faker-js/faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'

const makeSut = (): EmailValidation => new EmailValidation('email')

describe('EmailValidation', () => {
  test('Should return an error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word())
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
