import { RemoteAuthenctication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import React from 'react'

export const MakeLogin: React.FC = () => {
  const url = 'http://localhost:5050/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthenctication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()

  ])
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite} />
  )
}
