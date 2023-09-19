import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if field length is less than specified', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError('field'))
  })

  test('Should falsy field length is bigger or equal than specified', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
