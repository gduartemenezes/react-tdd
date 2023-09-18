import { faker } from '@faker-js/faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'

describe('EmailValidation', () => {
  test('Should return an error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate(faker.lorem.word())
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
