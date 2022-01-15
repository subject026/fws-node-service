"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const getConfig_1 = __importDefault(require("../../util/getConfig"));
// const apiSecret = cloudinary.config().api_secret;
// const apikey = cloudinary.config().api_key;
const signUploadRequest = async (signingData, origin) => {
    console.log(origin);
    const { CLOUD_NAME, API_SECRET, API_KEY } = await (0, getConfig_1.default)(origin);
    cloudinary_1.v2.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET,
        secure: true,
    });
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary_1.v2.utils.api_sign_request(Object.assign(Object.assign({}, signingData), { timestamp }), API_SECRET);
    return Object.assign({ timestamp, signature, apikey: API_KEY }, signingData);
};
exports.default = signUploadRequest;
