import { BaseAPI } from './base'

export enum SubmissionState {
  Pending,
  Running,
  Done
}

export interface SubmissionFileDTO {
  rawId: string
  path: string
  pub: boolean
}

export class SubmissionAPI extends BaseAPI {
  get(id: string): Promise<any> {
    return this.hub.invoke('/submission/get', { id })
  }

  listByProblem(problemId: string): Promise<any[]> {
    return this.hub.invoke('/submission/listbyproblem', { problemId })
  }

  createInProblem(problemId: string, data: string, pub: boolean, files: SubmissionFileDTO[]): Promise<string> {
    return this.hub.invoke('/submission/createinproblem', { problemId, data, pub, files })
  }
}
