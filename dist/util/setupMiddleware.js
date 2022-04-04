"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// import getConfig from "../config";
const getCorsOptions = () => {
    const whitelist = [
        "https://cbtrees.co.uk",
        "https://website.uglandscapes.workers.dev",
        "https://urbangreenlandscapes.co.uk",
        "http://192.168.24.224:4000",
        "http://localhost:4000",
        "http://localhost:8787",
    ];
    return {
        origin(origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    };
};
const setupMiddleware = (app) => {
    app.use(express_1.default.json());
    // app.use(cookieParser());
    app.use((0, morgan_1.default)("dev"));
    // const origin =
    //   process.env.MODE === "development"
    //     ? process.env.DEV_FRONTEND_URL
    //     : process.env.PROD_FRONTEND_URL;
    // console.log(origin);
    app.use(process.env.MODE === "production" ? (0, cors_1.default)(getCorsOptions()) : (0, cors_1.default)());
    // app.use(parseToken);
};
exports.default = setupMiddleware;
