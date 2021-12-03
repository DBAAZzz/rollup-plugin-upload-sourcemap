const FormData = require('form-data')
const string2fileStream = require('string-to-file-stream');
const axios = require('axios')

/**
 * 将字符串转化成文件流并上传
 * @param {*} content : 要上传的字符串;
 */
function uploadFile(content = '', fileName = 'default.txt') {
    const formData = new FormData()
    formData.append('file', string2fileStream(
        content, { path: fileName }
    ));
    return axios.default({
        url: 'http://127.0.0.1:3000/file/upload',
        method: 'post',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5MjljNjQwLTg3OWQtMTFlYi1iNGExLTMzM2ZhNTQ5ZjVlYSIsImlhdCI6MTYzODUwMjcxNywiZXhwIjoxNjM4NTg5MTE3fQ.oeq1nXIeEpvpMQkutFuaJSUkx0FeU0K0ES4Iz9toN8w',
            ...formData.getHeaders(),
        },
        timeout: 10000,
        data: formData
    })
}

let defaultOptions = {
    delSourceMap: false
}

export default (userOptions = {}) => {
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
        buildStart(inputOptions) {
            console.log('options', options)
            console.log('获取options的输入', inputOptions)
        },
        resoveId(id, importer) {
            console.log('id', id)
            console.log('importer', importer)
        },
        /**
         * 使用方法
         * (id: string) => string | null | {...}
         * 加载不同的模块
         */
        async load(id) {
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
        outputOptions(outputOptions) {
            console.log('outputOptions hook', outputOptions)
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
                let sourceMap = bundle[key].map
                await uploadFile(String(sourceMap), `${sourceMap.file}-demo.map`)
                if (options.delSourceMap) {
                    bundle[key].map = null
                }
            }
        }

    }
}