const signUploadRequest = require("./signUploadRequest");
const { firebaseAuth } = require("../../util/firebase");

const allowedEmails = ["subject026@protonmail.com", "tomoskinsey@gmail.com"];

const cloudinarySigner = async (req, res, next) => {
  const { signingData, token } = req.body;

  let decoded;
  try {
    decoded = await firebaseAuth.verifyIdToken(token);
    if (!allowedEmails.includes(decoded.email))
      throw new Error("Email not authorized");
  } catch (error) {
    res.status(400).json({
      error,
    });
    return;
  }

  // !!! folder should depend on origin
  const origin = req.get("origin");
  console.log("origin: ", origin);
  const signData = signUploadRequest(signingData);
  console.log(signData);
  // let formdata;
  // try {
  //   formData = parseFormData(req.body, origin);
  // } catch (err) {
  //   // bad request
  //   next(err);
  //   return;
  // }

  res.status(200).json({
    signature: signData.signature,
    timestamp: signData.timestamp,
    cloudname: signData.cloudName,
    apikey: signData.apikey,
    ...signingData,
  });
};

module.exports = cloudinarySigner;
