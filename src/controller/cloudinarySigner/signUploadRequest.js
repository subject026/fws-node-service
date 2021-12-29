const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const apiSecret = cloudinary.config().api_secret;
const apikey = cloudinary.config().api_key;

const signUploadRequest = (signingData) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      ...signingData,
    },
    apiSecret
  );

  return { timestamp, signature, apikey, ...signingData };
};

module.exports = signUploadRequest;
