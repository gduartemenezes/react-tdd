import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy.error = new Error('first_error')
    fieldValidationSpy2.error = new Error('second_error')
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2
    ])
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error')
  })
})
