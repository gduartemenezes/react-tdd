import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidationSpies)

  return {
    sut,
    fieldValidationSpies
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.lorem.word()
    const { sut, fieldValidationSpies } = makeSut(fieldName)
    const firstError = faker.lorem.sentence()
    const secondError = faker.lorem.sentence()
    fieldValidationSpies[0].error = new Error(firstError)
    fieldValidationSpies[1].error = new Error(secondError)

    const error = sut.validate(fieldName, 'any_value')
    expect(error).toBe(firstError)
  })

  test('Should return falsy if all validations succeed ', () => {
    const fieldName = faker.lorem.word()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, 'any_value')
    expect(error).toBeFalsy()
  })
})
