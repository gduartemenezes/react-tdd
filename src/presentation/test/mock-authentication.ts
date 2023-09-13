import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/usecases/models'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
