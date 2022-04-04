"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTransport_1 = require("./getTransport");
const path = require("path");
const { getOriginData } = require("../../util/readOrigins");
const validateFormData = async (formData, origin) => {
    // what data is expected for this origin?
    // const originPath = path.join(process.cwd(), "origins");
    // const data = await getOriginData(originPath, origin);
    // // return new Promise((resolve, reject) => {
    // //   resolve()
    // console.log("ORIGIN:: ", origin);
    const { transport, mailMeta } = (0, getTransport_1.getTransport)(origin);
    return { formData, transport, mailMeta };
    //   throw new Error("Ooooof");
    // })
};
exports.default = validateFormData;
