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

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🔵')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const erroWrap = sut.getByTestId('error-wrap')
  expect(erroWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}
const testElementTextContent = (sut: RenderResult, fieldName: string, textContent: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toEqual(textContent)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
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
    },
    {
      path: '/',
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
    testErrorWrapChildCount(sut, 0)

    testButtonIsDisabled(sut, 'submit', true)

    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.lorem.sentence()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.lorem.sentence()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    testStatusForField(sut, 'email')
  })

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    testElementExists(sut, 'spinner')
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
    testElementTextContent(sut, 'main-error', error.message)
    testErrorWrapChildCount(sut, 1)
  })
  test('Should add access token to localstorage on Authentication success', async () => {
    const { sut, authenticationSpy, router } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('login-form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(router.state.location.pathname).toEqual('/')
  })
  test('Should redirect to SignUp page', () => {
    const { sut, router } = makeSut()
    const register = sut.getByTestId('register')
    fireEvent.click(register)
    expect(router.state.location.pathname).toEqual('/signup')
  })
})
