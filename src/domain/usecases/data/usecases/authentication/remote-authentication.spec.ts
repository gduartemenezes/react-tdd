import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthenctication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthenctication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthenctication(url, httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'other_url'
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
