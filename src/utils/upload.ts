const FormData = require('form-data')
const string2fileStream = require('string-to-file-stream');
const axios = require('axios')
/**
 * 将字符串转化成文件流并上传
 * @param {string} content 要上传的字符串;
 * @param {string} fileName 文件名
 * @returns {Promise}
 */
function uploadFile(content: string = '', fileName: string = 'default.txt') {
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


export default uploadFile