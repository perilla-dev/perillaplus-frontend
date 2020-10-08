import { BaseAPI } from './base'

export class UserAPI extends BaseAPI {
  getOneOrFail(id: string): Promise<any> {
    return this.hub.invoke('/user/get', { id })
  }

  update(id: string, username?: string, nickname?: string, email?: string, passwd?: string): Promise<void> {
    return this.hub.invoke('/user/update', { id, username, nickname, email, passwd })
  }

  listTokens(userId: string): Promise<any[]> {
    return this.hub.invoke('/user/listtokens', { userId })
  }

  removeToken(id: string): Promise<void> {
    return this.hub.invoke('/user/removetoken', { id })
  }
}
