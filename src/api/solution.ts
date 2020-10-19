import { BaseAPI } from './base'

export enum SolutionState {
  Pending,
  Running,
  Done
}

export interface SolutionFileDTO {
  rawId: string
  path: string
  pub: boolean
}

export class SolutionAPI extends BaseAPI {
  get(solutionId: string): Promise<any> {
    return this.hub.invoke('/solution/get', { solutionId })
  }

  listByProblem(problemId: string): Promise<any[]> {
    return this.hub.invoke('/solution/listbyproblem', { problemId })
  }

  createInProblem(problemId: string, data: string, pub: boolean, files: SolutionFileDTO[]): Promise<string> {
    return this.hub.invoke('/solution/createinproblem', { problemId, data, pub, files })
  }
}
