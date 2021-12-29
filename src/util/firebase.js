const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const firebaseApp = initializeApp({
  credential: applicationDefault(),
});

module.exports.firebaseApp = firebaseApp;
module.exports.firebaseAuth = getAuth(firebaseApp);
