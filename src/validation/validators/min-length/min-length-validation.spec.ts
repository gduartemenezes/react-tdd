import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { faker } from '@faker-js/faker'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('Should return error if field length is less than specified', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word({ length: { max: 4, min: 1 } }))
    expect(error).toEqual(new InvalidFieldError('field'))
  })

  test('Should falsy field length is bigger or equal than specified', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word({ length: { max: 10, min: 5 } }))
    expect(error).toBeFalsy()
  })
})
