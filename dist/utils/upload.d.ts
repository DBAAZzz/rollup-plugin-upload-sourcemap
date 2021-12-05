/**
 * 将字符串转化成文件流并上传
 * @param {string} content 要上传的字符串;
 * @param {string} fileName 文件名
 * @returns {Promise}
 */
declare function uploadFile(content?: string, fileName?: string): any;
export default uploadFile;
