import { BaseAPI } from './base'

export class GroupAPI extends BaseAPI {
  get(id: string): Promise<any> {
    return this.hub.invoke('/group/get', { id })
  }

  async listNotices(groupId: string): Promise<any[]> {
    return this.hub.invoke('/group/listnotices', { groupId })
  }

  async listProblems(groupId: string): Promise<any[]> {
    return this.hub.invoke('/group/listproblems', { groupId })
  }
}
