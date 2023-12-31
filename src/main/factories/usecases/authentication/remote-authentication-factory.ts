import { RemoteAuthenctication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAuthentication = (): RemoteAuthenctication => {
  return new RemoteAuthenctication(makeApiUrl(), makeAxiosHttpClient())
}
