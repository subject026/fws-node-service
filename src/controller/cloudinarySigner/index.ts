import signUploadRequest from "./signUploadRequest";
import { getFirebaseAuth } from "../../util/firebase";

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
    const firebaseAuth = await getFirebaseAuth(origin);
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
  const signedData = await signUploadRequest(signingData, origin);
  console.log("\nsigned data!\n");

  console.log({
    signature: signedData.signature,
    timestamp: signedData.timestamp,
    cloudName: signedData.cloudName,
    folder: signedData.folder,
    apikey: signedData.apikey,
    ...signingData,
  });

  res.status(200).json({
    signature: signedData.signature,
    timestamp: signedData.timestamp,
    cloudName: signedData.cloudName,
    folder: signedData.folder,
    apikey: signedData.apikey,
    ...signingData,
  });
};

export default cloudinarySigner;
