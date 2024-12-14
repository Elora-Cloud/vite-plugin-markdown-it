/**
 * 缓存markdown解析的一些结果
 * 在取出缓存之后需要将缓存删除
 */
interface ICacheName {
  /**
   * 编号
   */
  id: number
  /**
   * demo组件名
   */
  name: string
  /**
   * demo文件名
   */
  demoName: string
}

interface ICacheObject {
  id: number // 编号
  source: string // 源码
  render: string // 渲染之后的代码
  examples: Record<number, string> // 案例集合
  names: ICacheName[] // 名称列表
}

export default class {
  cache: Record<string, ICacheObject> = {};

  // 当前解析md的fileId(文件路径 + 文件名称)
  fileId = '';

  // 当前解析md的文件名
  fileName = '';

  // 当前解析md的文件路径
  filePath = '';

  public getSourceCodeCache(fileId: string) {
    return this.cache[fileId] && this.cache[fileId].source;
  }

  public setSourceCodeCache(fileId: string, code: string) {
    this.cache[fileId].source = code;
  }

  public getRenderCodeCache(fileId: string) {
    return this.cache[fileId] && this.cache[fileId].render;
  }

  public setRenderCodeCache(fileId: string, code: string) {
    this.cache[fileId].render = code;
  }

  public getExampleCodeCache(fileId: string, exampleId: number) {
    return this.cache[fileId] && this.cache[fileId].examples[exampleId];
  }

  public setExampleCodeCache(data: string, demoName: string) {
    const id = this.cache[this.fileId].id++;
    const filename = this.fileName.split('.')[0];
    const name = `${filename.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')}Example${id}`;
    this.cache[this.fileId].examples[id] = data;
    this.cache[this.fileId].names.push({
      id,
      name,
      demoName,
    });
    return name;
  }

  public getExampleNamesCache() {
    return this.cache[this.fileId] && this.cache[this.fileId].names;
  }

  public resetExampleCache(fileId: string) {
    this.cache[fileId] = {
      id: 0, // 编号
      source: '', // 源码
      render: '', // 渲染之后的代码
      examples: {}, // 案例集合
      names: [], // 名称列表
    };
  }

  public getUUID(fileId: any) {
    return this.cache[fileId] && this.cache[fileId].id++;
  }

  public getCurrentFile() {
    return {
      fileId: this.fileId,
      fileName: this.fileName,
      filePath: this.filePath,
    };
  }

  public setCurrentFile(id: string, name: string, path: string) {
    this.fileId = id;
    this.fileName = name;
    this.filePath = path;
  }
}
