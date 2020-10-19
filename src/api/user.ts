import { BaseAPI } from './base'

export class UserAPI extends BaseAPI {
  get(userId: string): Promise<any> {
    return this.hub.invoke('/user/get', { userId })
  }

  update(userId: string, name?: string, disp?: string, email?: string, desc?: string, passwd?: string): Promise<void> {
    return this.hub.invoke('/user/update', { userId, name, disp, desc, email, passwd })
  }

  listTokens(userId: string): Promise<any[]> {
    return this.hub.invoke('/user/listtokens', { userId })
  }

  removeToken(tokenId: string): Promise<void> {
    return this.hub.invoke('/user/removetoken', { tokenId })
  }
}
