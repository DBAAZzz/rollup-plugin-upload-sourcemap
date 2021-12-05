### rollup-plugin-upload-sourcemap
用来上传打包生成的sourcemap文件

### Use

```js
npm i rollup-plugin-upload-sourcemap

// rollup.config.js
import uploadPlugin from  'rollup-plugin-upload-sourcemap'
export default {
  plugins: [
    uploadPlugin()
  ]
}
```


#### Optios
```ts
export interface Options {
  delSourceMap?: boolean, // 是否删除上传后的sourcemap文件
}
```