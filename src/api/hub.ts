import { UserAPI } from './user'
import { GroupAPI } from './group'
import store, { M_LOGIN, M_LOGOUT } from '@/store'
import { NoticeAPI } from './notice'
import { ProblemAPI } from './problem'
import { FileAPI } from './file'
import { SolutionAPI } from './solution'

const kToken = 'access-token'
const kTokenId = 'token-id'
const kUserId = 'user-id'
const E_INVALID_TOKEN = 'Invalid token'

class PersistedState {
  get token() {
    return this.getStorage(kToken)
  }
  set token(val) {
    this.setStorage(kToken, val)
  }

  get tokenId() {
    return this.getStorage(kTokenId)
  }
  set tokenId(val) {
    this.setStorage(kTokenId, val)
  }

  get userId() {
    return this.getStorage(kUserId)
  }
  set userId(val) {
    this.setStorage(kUserId, val)
  }

  get loggedIn() {
    return !!this.userId
  }

  private getStorage(key: string) {
    return localStorage.getItem(key)
  }

  private setStorage(key: string, val: string | null) {
    val ? localStorage.setItem(key, val) : localStorage.removeItem(key)
  }
}

export class APIHub {
  user
  file
  group
  notice
  problem
  solution

  vuex
  state

  constructor() {
    this.state = new PersistedState()
    this.vuex = store

    if (this.state.userId) {
      this.vuex.commit(M_LOGIN, this.state.userId)
    }

    this.user = new UserAPI(this)
    this.file = new FileAPI(this)
    this.group = new GroupAPI(this)
    this.notice = new NoticeAPI(this)
    this.problem = new ProblemAPI(this)
    this.solution = new SolutionAPI(this)
  }

  async invoke(url: string, body: any) {
    url = '/api/public' + url
    const headers: any = {
      'Content-Type': 'application/json'
    }
    if (this.state.token) {
      headers['x-access-token'] = this.state.token
    }
    const init = {
      method: 'post',
      body: JSON.stringify(body),
      headers
    }
    const res = await fetch(url, init)
    const data = await res.json()
    if (data.ok) {
      return data.result
    } else {
      if (data.result === E_INVALID_TOKEN) this.forceLogout()
      throw new Error(data.result)
    }
  }

  async upload(file: File): Promise<string> {
    const body = new FormData()
    body.append('file', file)
    const url = '/upload'
    const init = {
      method: 'post',
      body,
      headers: {
        'x-access-token': this.state.token!
      }
    }
    const res = await fetch(url, init)
    const data = await res.json()
    if (data.ok) {
      return data.result
    } else {
      if (data.result === E_INVALID_TOKEN) this.forceLogout()
      throw new Error(data.result)
    }
  }

  async login(name: string, pass: string) {
    const [userId, tokenId, token] = await this.invoke('/user/login', { name, pass, desc: 'Frontend' })
    this.state.token = token
    this.state.userId = userId
    this.state.tokenId = tokenId
    this.vuex.commit(M_LOGIN, userId)
  }

  async logout() {
    await this.user.removeToken(this.state.tokenId!).catch(e => console.log(e))
    this.state.token = null
    this.state.userId = null
    this.state.tokenId = null
    this.vuex.commit(M_LOGOUT)
    location.reload()
  }

  private forceLogout() {
    this.state.token = null
    this.state.userId = null
    this.state.tokenId = null
    this.vuex.commit(M_LOGOUT)
    location.reload()
  }
}
