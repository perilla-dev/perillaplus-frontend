import { BaseAPI } from './base'

export class FileAPI extends BaseAPI {
  listByProblem(problemId: string): Promise<any[]> {
    return this.hub.invoke('/file/listbyproblem', { problemId })
  }
  listBySubmission(submissionId: string): Promise<any[]> {
    return this.hub.invoke('/file/listbysubmission', { submissionId })
  }
  download(id: string) {
    console.log(id)
  }
  createInProblem(problemId: string, rawId: string, path: string, pub: boolean): Promise<string> {
    return this.hub.invoke('/file/createinproblem', { problemId, rawId, path, pub })
  }
  remove(id: string): Promise<void> {
    return this.hub.invoke('/file/listbyproblem', { id })
  }
  update(id: string, path?: string, pub?: boolean): Promise<void> {
    return this.hub.invoke('/file/listbyproblem', { id, path, pub })
  }
}
