import { BaseAPI } from './base'

export class NoticeAPI extends BaseAPI {
  get(noticeId: string): Promise<any> {
    return this.hub.invoke('/notice/get', { noticeId })
  }

  listByGroup(groupId: string): Promise<any[]> {
    return this.hub.invoke('/notice/listbygroup', { groupId })
  }

  listGlobal(): Promise<any[]> {
    return this.hub.invoke('/notice/listglobal', {})
  }

  createInGroup(groupId: string, name: string, disp: string, desc: string, tags: string): Promise<string> {
    return this.hub.invoke('/notice/createingroup', { groupId, name, disp, desc, tags })
  }

  update(noticeId: string, name?: string, disp?: string, desc?: string, tags?: string): Promise<void> {
    return this.hub.invoke('/notice/update', { noticeId, name, disp, desc, tags })
  }
}
