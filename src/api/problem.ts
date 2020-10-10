import { BaseAPI } from './base'

export class ProblemAPI extends BaseAPI {
  get(id: string): Promise<any> {
    return this.hub.invoke('/problem/get', { id })
  }

  listByGroup(groupId: string): Promise<any[]> {
    return this.hub.invoke('/problem/listbygroup', { groupId })
  }

  createInGroup(groupId: string, name: string, disp: string, desc: string, type: string, tags: string, pub: boolean): Promise<string> {
    return this.hub.invoke('/problem/createingroup', { groupId, name, disp, desc, type, tags, pub })
  }
}
