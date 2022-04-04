"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOriginData = exports.readOriginFile = exports.getDirList = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const getDirList = (path) => {
    return fs.readdir(path);
};
exports.getDirList = getDirList;
const readOriginFile = async (path) => {
    const data = await fs.readFile(path).then((res) => res.toString());
    return JSON.parse(data);
};
exports.readOriginFile = readOriginFile;
const getOriginData = async (dirpath, origin) => {
    const filenames = await (0, exports.getDirList)(dirpath);
    const data = await Promise.all(filenames.map((filename) => (0, exports.readOriginFile)(path.join(dirpath, filename))));
    const res = data.filter((obj) => {
        const isitnow = obj.origins.includes(origin);
        return isitnow;
    });
    if (res.length > 1)
        throw new Error(`duplicate origins? : ${origin}`);
    return res[0];
};
exports.getOriginData = getOriginData;
