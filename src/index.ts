import { Plugin, InputOptions, OutputOptions } from 'rollup'
import uploadFile from './utils/upload'

export interface Options {
  delSourcemap?: boolean
}

let defaultOptions: Options = {
  delSourcemap: false
}

export default function PluginUpload(userOptions: Options = {}): Plugin {
  const options = {
    ...defaultOptions,
    ...userOptions
  }
  // 在 rollup 中 id 这个变量为文件的绝对路径
  return {
    name: 'pluginDemo',
    /**
     * 使用方法
     * (options: InputOptions) => void
     * 用来获取打包的输入配置
     */
    buildStart(inputOptions: InputOptions) {
      console.log('options', options)
      console.log('获取options的输入', inputOptions)
    },
    resolveId(source: string) {
      console.log('source', source)
      return null
    },
    /**
     * 使用方法
     * (id: string) => string | null | {...}
     * 加载不同的模块
     */
    async load(id: string) {
      console.log('load hook id', id)
      return null
    },
    /**
     * 使用方法
     * (code: string, id: string) => string | null | {...}
     * 可以获得所有模块的源代码和id
     */
    transform(code, id) {
      // console.log('transform hook code', code)
      // console.log('transform hook id', id)
      return null
    },
    /**
     * 使用方法
     * (error?: Error) => void
     * 构建阶段最后的一个hook，构建期间发生了错误可以获取到
     */
    buildEnd(error) {
      console.log('error', error)
    },
    /**
     * 使用方法
     * (outputOptions: OutputOptions) => OutputOptions | null
     * 接受输出的参数
     */
    outputOptions(outputOptions: OutputOptions) {
      console.log('outputOptions hook', outputOptions)
      return outputOptions
    },
    /**
     * 使用方法
     * (chunkInfo: ChunkInfo) => string
     * 可用于增加chunk的哈希值
     */
    augmentChunkHash(chunkInfo) {
      console.log('augmentChunkHash hook', chunkInfo)
    },

    /**
     * 使用方法 
     * (options: OutputOptions, bundle: { [fileName: string]: AssetInfo | ChunkInfo }, isWrite: boolean) => void
     * 我们可以通过从这个钩子的包对象中删除文件来防止文件被发出。
     */
    async generateBundle(outputOptions, bundle) {
      // key 是文件名
      for (let key in bundle) {
        let sourceMap = (bundle[key] as any).map
        await uploadFile(String(sourceMap), `${sourceMap.file}-demo.map`)
        if (options.delSourcemap) {
          (bundle[key] as any).map = null
        }
      }
    }

  }
}

// 提供给 require('rollup-plugin-upload-sourcemap')() 使用
module.exports = PluginUpload