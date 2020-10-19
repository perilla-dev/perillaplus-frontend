import { BaseAPI } from './base'

export class FileAPI extends BaseAPI {
  listByProblem(problemId: string): Promise<any[]> {
    return this.hub.invoke('/file/listbyproblem', { problemId })
  }
  listBySolution(solutionId: string): Promise<any[]> {
    return this.hub.invoke('/file/listbysolution', { solutionId })
  }
  // download(id: string) {
  //   console.log(id)
  // }
  createInProblem(problemId: string, rawId: string, path: string, pub: boolean): Promise<string> {
    return this.hub.invoke('/file/createinproblem', { problemId, rawId, path, pub })
  }
  remove(fileId: string): Promise<void> {
    return this.hub.invoke('/file/remove', { fileId })
  }
  update(fileId: string, path?: string, pub?: boolean): Promise<void> {
    return this.hub.invoke('/file/update', { fileId, path, pub })
  }
}
