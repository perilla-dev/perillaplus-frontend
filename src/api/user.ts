import { BaseAPI } from './base'

export class UserAPI extends BaseAPI {
  get(id: string): Promise<any> {
    return this.hub.invoke('/user/get', { id })
  }

  update(id: string, name?: string, disp?: string, email?: string, desc?: string, passwd?: string): Promise<void> {
    return this.hub.invoke('/user/update', { id, name, disp, desc, email, passwd })
  }

  listTokens(userId: string): Promise<any[]> {
    return this.hub.invoke('/user/listtokens', { userId })
  }

  removeToken(id: string): Promise<void> {
    return this.hub.invoke('/user/removetoken', { id })
  }

  listGroups(userId: string): Promise<any[]> {
    return this.hub.invoke('/user/listgroups', { userId })
  }
}
