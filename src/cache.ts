/**
 * 缓存markdown解析的一些结果
 * 在取出缓存之后需要将缓存删除
 */
interface ICacheObject {
  id: number // 编号
  source: string // 源码
  render: string // 渲染之后的代码
  examples: any // 案例集合
  names: string[] // 名称列表
}
export default class {
  cache: Record<string, ICacheObject> = {}

  // 当前解析md的fileId(文件路径 + 文件名称)
  fileId = ''

  // 当前解析md的文件名
  fileName = ''

  public getSourceCodeCache(fileId: any) {
    return this.cache[fileId] && this.cache[fileId].source
  }

  public setSourceCodeCache(fileId: any, code: any) {
    this.cache[fileId].source = code
  }

  public getRenderCodeCache(fileId: any) {
    return this.cache[fileId] && this.cache[fileId].render
  }

  public setRenderCodeCache(fileId: any, code: any) {
    this.cache[fileId].render = code
  }

  public getExampleCodeCache(fileId: any, exampleId: any) {
    return this.cache[fileId] && this.cache[fileId].examples[exampleId]
  }

  public setExampleCodeCache(data: any) {
    const id = this.cache[this.fileId].id++
    const filename = this.fileName.split('.')[0]
    const name = `${filename.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')}Example${id}`
    this.cache[this.fileId].examples[id] = data
    this.cache[this.fileId].names.push({
      id,
      name,
    })
    return name
  }

  public getExampleNamesCache() {
    return this.cache[this.fileId] && this.cache[this.fileId].names
  }

  public resetExampleCache(fileId: any) {
    this.cache[fileId] = {
      id: 0, // 编号
      source: '', // 源码
      render: '', // 渲染之后的代码
      examples: {}, // 案例集合
      names: [], // 名称列表
    }
  }

  public getUUID(fileId: any) {
    return this.cache[fileId] && this.cache[fileId].id++
  }

  public getCurrentFile() {
    return {
      fileId: this.fileId,
      fileName: this.fileName,
    }
  }

  public setCurrentFile(id: any, name: any) {
    this.fileId = id
    this.fileName = name
  }
}
