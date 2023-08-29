import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthenctication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthenctication(url, httpPostClientSpy)

    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
