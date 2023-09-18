export class InvalidFieldError extends Error {
  constructor (readonly fieldName: string) {
    super(`o valor dampo ${fieldName} é inválido`)
  }
}
