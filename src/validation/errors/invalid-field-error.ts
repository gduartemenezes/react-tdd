export class InvalidFieldError extends Error {
  constructor (readonly fieldName: string) {
    super(`o valor campo ${fieldName} é inválido`)
  }
}
