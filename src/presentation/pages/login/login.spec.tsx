import React from 'react'
import { faker } from '@faker-js/faker'
import { RenderResult, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import 'jest-localstorage-mock'
import Login from './login'
import { ValidationStub } from '@/presentation/test/mock-validation'
import { AuthenticationSpy } from '@/presentation/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { Router } from '@remix-run/router'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  router: Router
}
type SutParams = {
  validationError: string
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, email)
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🔵')
}
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError

  const routes = [
    {
      path: '/login',
      element: <Login validation={validationStub} authentication={authenticationSpy} />
    },
    {
      path: '/signup',
      element: <></>
    }
  ]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/login'],
    initialIndex: 0
  })
  const sut = render(<RouterProvider router={router} />)
  return { sut, authenticationSpy, router }
}
describe('', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should start with initial state', () => {
    const validationError = faker.lorem.sentence()
    const { sut } = makeSut({ validationError })
    const erroWrap = sut.getByTestId('error-wrap')
    expect(erroWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.lorem.sentence()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.lorem.sentence()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    simulateStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
  test('Should call authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call authentication if form is invalid', () => {
    const validationError = faker.lorem.lines()
    const { sut, authenticationSpy } = makeSut({ validationError })
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('login-form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
  test('Should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('error-wrap')

    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toEqual(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })
  test('Should add access token to localstorage on Authentication success', async () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('login-form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })
  test('Should redirect to SignUp page', () => {
    const { sut, router } = makeSut()
    const register = sut.getByTestId('register')
    fireEvent.click(register)
    expect(router.state.location.pathname).toEqual('/signup')
  })
})
