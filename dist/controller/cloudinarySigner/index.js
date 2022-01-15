"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signUploadRequest_1 = __importDefault(require("./signUploadRequest"));
const firebase_1 = require("../../util/firebase");
const allowedEmails = ["subject026@protonmail.com", "tomoskinsey@gmail.com"];
const cloudinarySigner = async (req, res, next) => {
    const { signingData, token } = req.body;
    const origin = req.get("origin");
    if (!origin) {
        res.status(400).json({ error: "no origin?!" });
        return;
    }
    if (!signingData) {
        res.status(400).json({ error: "no signing data?!" });
        return;
    }
    const firebaseAuth = await (0, firebase_1.getFirebaseAuth)(origin);
    let decoded;
    try {
        decoded = await firebaseAuth.verifyIdToken(token);
        if (!allowedEmails.includes(decoded.email))
            throw new Error("Email not authorized");
    }
    catch (error) {
        res.status(400).json({
            error,
        });
        return;
    }
    // !!! folder should depend on origin
    console.log("origin: ", origin);
    if (!signingData && !signingData.eager && !signingData.folder) {
        res.status(400).json({
            error: "signingdata invalid",
        });
    }
    console.log("\n\nsigningData\n\n", { signingData }, "\n\n");
    const signedData = await (0, signUploadRequest_1.default)(signingData, origin);
    console.log("signed data:: ", signedData);
    // let formdata;
    // try {
    //   formData = parseFormData(req.body, origin);
    // } catch (err) {
    //   // bad request
    //   next(err);
    //   return;
    // }
    console.log(Object.assign({ signature: signedData.signature, timestamp: signedData.timestamp, cloudName: signedData.cloudName, folder: signedData.folder, apikey: signedData.apikey }, signingData));
    res.status(200).json(Object.assign({ signature: signedData.signature, timestamp: signedData.timestamp, cloudName: signedData.cloudName, folder: signedData.folder, apikey: signedData.apikey }, signingData));
};
exports.default = cloudinarySigner;
