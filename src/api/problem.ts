import { BaseAPI } from './base'

export class ProblemAPI extends BaseAPI {
  get(problemId: string): Promise<any> {
    return this.hub.invoke('/problem/get', { problemId })
  }

  listByGroup(groupId: string): Promise<any[]> {
    return this.hub.invoke('/problem/listbygroup', { groupId })
  }

  createInGroup(userId: string, groupId: string, name: string, disp: string, desc: string, tags: string, type: string, pub: boolean): Promise<string> {
    return this.hub.invoke('/problem/createingroup', { userId, groupId, name, disp, desc, tags, type, pub })
  }

  update(problemId: string, name?: string, disp?: string, desc?: string, data?: string, tags?: string, type?: string, pub?: boolean): Promise<void> {
    return this.hub.invoke('/problem/update', { problemId, name, disp, desc, data, tags, type, pub })
  }

  addContributor(problemId: string, userId: string): Promise<string> {
    return this.hub.invoke('/problem/addcontributor', { problemId, userId })
  }

  removeContributor(contributorId: string): Promise<void> {
    return this.hub.invoke('/problem/removecontributor', { contributorId })
  }

  listContributors(problemId: string): Promise<any[]> {
    return this.hub.invoke('/problem/listcontributors', { problemId })
  }
}
