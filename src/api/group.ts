import { BaseAPI } from './base'

export enum MemberRole {
  owner,
  admin,
  member
}

export class GroupAPI extends BaseAPI {
  get(groupId: string): Promise<any> {
    return this.hub.invoke('/group/get', { groupId })
  }

  find(name: string): Promise<any> {
    return this.hub.invoke('/group/find', { name })
  }

  listByUser(userId: string): Promise<any[]> {
    return this.hub.invoke('/group/listbyuser', { userId })
  }

  listMembers(groupId: string): Promise<any[]> {
    return this.hub.invoke('/group/listmembers', { groupId })
  }

  addMember(groupId: string, userId: string, role: MemberRole): Promise<string> {
    return this.hub.invoke('/group/addmember', { groupId, userId, role })
  }

  findMember(groupId: string, userId: string): Promise<any> {
    return this.hub.invoke('/group/findmember', { groupId, userId })
  }
}
