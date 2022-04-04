"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseAuth = exports.getFirebaseApp = void 0;
const getConfig_1 = __importDefault(require("./getConfig"));
const { initializeApp, getApp } = require("firebase-admin/app");
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const getFirebaseApp = async (origin) => {
    const config = await (0, getConfig_1.default)(origin);
    const { firebaseAuth: { project_id }, } = config;
    const appName = process.env.MODE === "development" ? "demo-" + project_id : project_id;
    let app;
    try {
        app = getApp(appName);
        return app;
    }
    catch (err) {
        if (err.code === "app/no-app") {
            console.log("No app initialized yet!");
            console.log("initializing app...");
            app = initializeApp(admin.credential.cert(config.firebaseAuth), appName);
            if (process.env.MODE === "development") {
                console.log("\n\ndev mode\n\n");
                console.log("process.env.FIREBASE_AUTH_EMULATOR_HOST is set to: ", process.env.FIREBASE_AUTH_EMULATOR_HOST);
            }
            return app;
        }
        else {
            // !!! need to handle error!!
            console.log("errrrrrrrrrrrrrrrr");
            console.log(err);
            return null;
        }
    }
};
exports.getFirebaseApp = getFirebaseApp;
// async function getdFirebaseApp(origin) {
//   console.log("\n\n\n");
//   console.log(Object.keys(apps).includes(origin));
//   console.log(Object.keys(apps));
//   console.log("\n\n\n");
//   if (!Object.keys(apps).includes(origin)) {
//     console.log("initialising an app");
//     const config = await getOriginData(
//       path.join(process.cwd(), "origins"),
//       origin
//     );
//     const app = initializeApp(config.firebaseAuth, origin);
//     if (process.env.MODE === 'development') {
//       const auth = await getFirebaseAuth(origin);
//       // connectAuthEmulator(auth, "http://localhost:9099");
//     }
//     apps[`${origin}`] = app
//     return app;
//   } else {
//     return apps[origin];
//   }
// }
const getFirebaseAuth = async (origin) => {
    const app = await (0, exports.getFirebaseApp)(origin);
    // console.log(
    //   "/n/n/n"
    // );
    // console.log(app);
    // console.log(app);
    // console.log(app);
    // console.log(
    //   "/n/n/n"
    // );
    const auth = getAuth(app);
    return auth;
    // } else {
    //   return auths[origin];
    // }
};
exports.getFirebaseAuth = getFirebaseAuth;
//   return {
//     getFirebaseAuth,
//     getFirebaseApp,
//   };
// })();
// const path = require("path");
// const { initializeApp } = require("firebase-admin/app");
// const { getAuth } = require("firebase-admin/auth");
// const { getOriginData } = require("./readOrigins");
// const { getFirebaseApp, getFirebaseAuth } = (() => {
//   // let apps = {};
//   // let auths = {};
//   let auth = null;
//   let app = null;
//   async function getFirebaseApp(origin) {
//     if (app === null) {
//       const config = {
//         type: "service_account",
//         project_id: "urbangreenlandscapes-2f6f5",
//         private_key_id: "d44cc2780aaa411445ab9594e9d58078458d3cc4",
//         private_key:
//           "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC4+VEL+8Y4dOwZ\n3kVeM42v3xa+PyoTEFnbmCpvPYHDTBKATXvgVol/wRak+5zHoKGX9h9ErHMQIyrs\nMX1t9zxBzEFm07AQ2jB0UKaIFKI3Q9YPUrOahI9hsmISO2CGmM8S6VEkEY9B/i8H\nxNJJ255Abe0fvRugt7+WFvODM1Dchefq5zjJmz4vWD6RBrpwmH/W7EeVHVfSdHQw\ndqNRkcnB/W8EHzk6M3qHMfm/oQdOk2ponJ0AKeJa4xlpq4O0UA1cUdNKFmSaQexS\nGKlXMoYHrlCeP3uv+VhfeZSNahET6KgC/QGhbgLy36gTPTZXR4kt1xDysJsxghLt\nWV4Pvd7fAgMBAAECggEACAucCVPlnr4DKOrghITkhEJFSHgR2etrpR/8tILt2nM8\nGMWF/k91Qo/A7uMcwhgL/0KOwJtpk8mby9MpO/e1cL00GQdbEJiU4/JAFAoltham\nwFreAfoDDIJIPrfDbodF9nIce9+hpgKqxAE9DkZVn0LIvgkpIvfrBtmvtMSuHzFG\n44g3oOn/VEuyQf8epXkVFYyP3oaDQgJ+9ebXq59JMe1PfawgpsOV2SQZheHNa5+D\nAqJPWmwOSkfwYo9r3+aLl7Bl8ntcAKrjWZbckzj69ykoSgVheiX8efQKGCpYOCxj\nVcbhPPJLS8myavEUA1dqRlHHH7Xz1gT30zIj0nTM0QKBgQDZ+pTGohcXv80jMwW/\nP8U7VhGerVIux62t3tTKR9N+oojfrq91rm4GvBEx625uAwW4bkxuYN8GXgB3SppZ\nRkxfdWbY3pvNvCCysD40qtwrynCoU+xfKSarSsdLqTzM664yCKHS9rNJYVQD0PmF\nzp4oSkf0IybcXPMqA9UH2Rmy8QKBgQDZPPbfFKUiDb1CpCfPiQq4Kk9rJ28JM+5W\nj540PfiYhNlVLx9bG6ssVIpKjBjL6LmZiWUQVfjBSMxNBw+Cl9PbUwDsmZzxTYCl\nOaf369PA7ERlxVjy/MpEjH/8zgtfrpKbgNNYWpJ4ADDIFIHXYiPeBDMnRkIp4oqF\n7Zs8hP0OzwKBgQCGe1uohL48j7/O9J6aFIzpg7tRK1tlsxnLCIw91Dx+h2Zsokhs\nEVaeXw84viieRM0VsS8Edk2CjyI4dtVtOLrLthHiwMxdDLEbrTJjqfo2JiqFH2nY\nd/n8eiEk49+4Cbup8Ltt/Xg1UI/V3urjC8t1zgZAcCN8lvgKttyKf/2j8QKBgQCR\nW6Wkp1/HZYIaMVUiHQS7LjRt8rjtY347FWY6dqz9AQebZCiLAfyLcRYHw65j4pku\nDy08vQnx6xApCmxqacUsoGGh7zeAjudhpy6pSXcrQ+yQXHikPlnpfEm3kvcxUtJu\nksjX+eK/wQDjIDWxNM3jJNRFl1F2TUt7Sf3xhNr/KQKBgQCWXa7XXNtDxSBbgD6J\nYv97/TPjh/tCqVgAM+MyBqC6otp0Eq8ad86rN/8yh0Csou3HRzDmNMxCVfX+QONf\n8rmMN1pWlu2YqjEJzOmDpRQCnbYYdG4WEKEJj97vheel2Anf9pTnXOhQ/kMrbYtb\nffm6z6yL3ehvncU2E/QCJSz1qw==\n-----END PRIVATE KEY-----\n",
//         client_email:
//           "firebase-adminsdk-g0tfb@urbangreenlandscapes-2f6f5.iam.gserviceaccount.com",
//         client_id: "104492356539727513341",
//         auth_uri: "https://accounts.google.com/o/oauth2/auth",
//         token_uri: "https://oauth2.googleapis.com/token",
//         auth_provider_x509_cert_url:
//           "https://www.googleapis.com/oauth2/v1/certs",
//         client_x509_cert_url:
//           "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g0tfb%40urbangreenlandscapes-2f6f5.iam.gserviceaccount.com",
//       };
//       app = initializeApp(config);
//     }
//     // if (!Object.keys(apps).includes(origin)) {
//     //   const config = await getOriginData(
//     //     path.join(process.cwd(), "origins"),
//     //     origin
//     //   );
//     //   apps[`${origin}`] = initializeApp(config.firebaseAuth, origin);
//     //   return apps[origin];
//     // } else {
//     //   return apps[origin];
//     // }
//   }
//   async function getFirebaseAuth() {
//     if (auth === null) getAuth(getFirebaseApp());
//     // if (!Object.keys(auths).includes(origin)) {
//     //   auths[`${origin}`] = getAuth(await getFirebaseApp(origin));
//     //   console.log("auth: ", auths[origin]);
//     //   return auths[origin];
//     // } else {
//     //   return auths[origin];
//     // }
//     return auth;
//   }
//   return {
//     getFirebaseAuth,
//     getFirebaseApp,
//   };
// })();
// module.exports = { getFirebaseApp, getFirebaseAuth };
