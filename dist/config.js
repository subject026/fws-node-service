"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getInitialConfig = () => {
    return { APP_SECRET: process.env.DEV_DB_URL };
};
const getConfig = () => {
    const initialConfig = getInitialConfig();
    switch (process.env.MODE) {
        case "development":
            return Object.assign(Object.assign({}, initialConfig), { DB_URL: process.env.DEV_DB_URL });
        case "test":
            return Object.assign(Object.assign({}, initialConfig), { DB_URL: process.env.TEST_DB_URL });
        default:
            return Object.assign(Object.assign({}, initialConfig), { DB_URL: process.env.PROD_DB_URL });
    }
};
exports.default = getConfig;
