import { BaseAPI } from './base'

export class ProblemAPI extends BaseAPI {
  get(id: string): Promise<any> {
    return this.hub.invoke('/problem/get', { id })
  }

  listByGroup(groupId: string): Promise<any[]> {
    return this.hub.invoke('/problem/listbygroup', { groupId })
  }

  createInGroup(groupId: string, name: string, disp: string, desc: string, type: string, pub: boolean): Promise<string> {
    return this.hub.invoke('/problem/createingroup', { groupId, name, disp, desc, type, pub })
  }

  update(id: string, name?: string, disp?: string, desc?: string, data?: string, type?: string, pub?: boolean): Promise<void> {
    return this.hub.invoke('/problem/update', { id, name, disp, desc, data, type, pub })
  }

  addContributor(problemId: string, userId: string): Promise<string> {
    return this.hub.invoke('/problem/addcontributor', { problemId, userId })
  }

  removeContributor(id: string): Promise<void> {
    return this.hub.invoke('/problem/removecontributor', { id })
  }

  listContributors(problemId: string): Promise<any[]> {
    return this.hub.invoke('/problem/listcontributors', { problemId })
  }
}
