"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var FormData = require('form-data');
var string2fileStream = require('string-to-file-stream');
var axios = require('axios');
/**
 * 将字符串转化成文件流并上传
 * @param {string} content 要上传的字符串;
 * @param {string} fileName 文件名
 * @returns {Promise}
 */
function uploadFile(content, fileName) {
    if (content === void 0) { content = ''; }
    if (fileName === void 0) { fileName = 'default.txt'; }
    var formData = new FormData();
    formData.append('file', string2fileStream(content, { path: fileName }));
    return axios["default"]({
        url: 'http://127.0.0.1:3000/file/upload',
        method: 'post',
        headers: __assign({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5MjljNjQwLTg3OWQtMTFlYi1iNGExLTMzM2ZhNTQ5ZjVlYSIsImlhdCI6MTYzODUwMjcxNywiZXhwIjoxNjM4NTg5MTE3fQ.oeq1nXIeEpvpMQkutFuaJSUkx0FeU0K0ES4Iz9toN8w' }, formData.getHeaders()),
        timeout: 10000,
        data: formData
    });
}
exports["default"] = uploadFile;
