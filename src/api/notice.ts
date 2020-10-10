import { BaseAPI } from './base'

export class NoticeAPI extends BaseAPI {
  get(id: string): Promise<any> {
    return this.hub.invoke('/notice/get', { id })
  }

  listByGroup(groupId: string): Promise<any[]> {
    return this.hub.invoke('/notice/listbygroup', { groupId })
  }

  createInGroup(groupId: string, name: string, disp: string, desc: string): Promise<string> {
    return this.hub.invoke('/notice/createingroup', { groupId, name, disp, desc })
  }

  update(id: string, name?: string, disp?: string, desc?: string): Promise<void> {
    return this.hub.invoke('/notice/update', { id, name, disp, desc })
  }
}
