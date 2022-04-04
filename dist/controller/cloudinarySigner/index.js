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
        res.status(400).json({ error: "no signing data provided" });
        return;
    }
    if (process.env.MODE === "production") {
        const firebaseAuth = await (0, firebase_1.getFirebaseAuth)(origin);
        let decoded;
        // try {
        console.log("\nawaiting verifyIdToken()...\n");
        decoded = await firebaseAuth.verifyIdToken(token);
        console.log("verifyIdToken() done.\n");
        if (!allowedEmails.includes(decoded.email))
            throw new Error("Email not authorized");
    }
    // } catch (error) {
    //   console.log("firebase auth error::: ", error);
    //   res.status(400).json({
    //     error,
    //   });
    //   return;
    // }
    console.log("\ncheck signing data\n");
    // !!! folder should depend on origin
    // console.log("origin: ", origin);
    if (!signingData || !signingData.eager || !signingData.folder) {
        res.status(400).json({
            error: "signingdata invalid",
        });
    }
    // console.log("\n\nsigningData\n\n", { signingData }, "\n\n");
    const signedData = await (0, signUploadRequest_1.default)(signingData, origin);
    console.log("\nsigned data!\n");
    console.log(Object.assign({ signature: signedData.signature, timestamp: signedData.timestamp, cloudName: signedData.cloudName, folder: signedData.folder, apikey: signedData.apikey }, signingData));
    res.status(200).json(Object.assign({ signature: signedData.signature, timestamp: signedData.timestamp, cloudName: signedData.cloudName, folder: signedData.folder, apikey: signedData.apikey }, signingData));
};
exports.default = cloudinarySigner;
