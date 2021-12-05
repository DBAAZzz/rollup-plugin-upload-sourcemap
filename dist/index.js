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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var upload_1 = __importDefault(require("./utils/upload"));
var defaultOptions = {
    delSourceMap: false
};
function PluginUpload(userOptions) {
    if (userOptions === void 0) { userOptions = {}; }
    var options = __assign(__assign({}, defaultOptions), userOptions);
    // 在 rollup 中 id 这个变量为文件的绝对路径
    return {
        name: 'pluginDemo',
        /**
         * 使用方法
         * (options: InputOptions) => void
         * 用来获取打包的输入配置
         */
        buildStart: function (inputOptions) {
            console.log('options', options);
            console.log('获取options的输入', inputOptions);
        },
        resolveId: function (source) {
            console.log('source', source);
            return null;
        },
        /**
         * 使用方法
         * (id: string) => string | null | {...}
         * 加载不同的模块
         */
        load: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log('load hook id', id);
                    return [2 /*return*/, null];
                });
            });
        },
        /**
         * 使用方法
         * (code: string, id: string) => string | null | {...}
         * 可以获得所有模块的源代码和id
         */
        transform: function (code, id) {
            // console.log('transform hook code', code)
            // console.log('transform hook id', id)
            return null;
        },
        /**
         * 使用方法
         * (error?: Error) => void
         * 构建阶段最后的一个hook，构建期间发生了错误可以获取到
         */
        buildEnd: function (error) {
            console.log('error', error);
        },
        /**
         * 使用方法
         * (outputOptions: OutputOptions) => OutputOptions | null
         * 接受输出的参数
         */
        outputOptions: function (outputOptions) {
            console.log('outputOptions hook', outputOptions);
            return outputOptions;
        },
        /**
         * 使用方法
         * (chunkInfo: ChunkInfo) => string
         * 可用于增加chunk的哈希值
         */
        augmentChunkHash: function (chunkInfo) {
            console.log('augmentChunkHash hook', chunkInfo);
        },
        /**
         * 使用方法
         * (options: OutputOptions, bundle: { [fileName: string]: AssetInfo | ChunkInfo }, isWrite: boolean) => void
         * 我们可以通过从这个钩子的包对象中删除文件来防止文件被发出。
         */
        generateBundle: function (outputOptions, bundle) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, key, sourceMap;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = [];
                            for (_b in bundle)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            key = _a[_i];
                            sourceMap = bundle[key].map;
                            return [4 /*yield*/, (0, upload_1["default"])(String(sourceMap), "".concat(sourceMap.file, "-demo.map"))];
                        case 2:
                            _c.sent();
                            if (options.delSourceMap) {
                                bundle[key].map = null;
                            }
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    };
}
exports["default"] = PluginUpload;
// 提供给 require('rollup-plugin-upload-sourcemap')() 使用
module.exports = PluginUpload;
