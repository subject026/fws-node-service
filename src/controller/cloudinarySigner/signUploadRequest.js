const cloudinary = require("cloudinary").v2;
const { getConfig } = require("../../util/getConfig");

// const apiSecret = cloudinary.config().api_secret;
// const apikey = cloudinary.config().api_key;

const signUploadRequest = async (signingData, origin) => {
  console.log(origin);
  const config = await getConfig(origin);
  console.log("\n\n", config, "\n\n");
  const apiSecret = config.API_SECRET;
  const apikey = config.API_KEY;
  cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: apikey,
    api_secret: apiSecret,
    secure: true,
  });

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request({
    ...signingData,
    timestamp,
  });

  return { timestamp, signature, apikey, ...signingData };
};

module.exports = signUploadRequest;
