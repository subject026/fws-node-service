const cloudinary = require("cloudinary").v2;

const myconfig = cloudinary.config({
  cloud_name: "<your_cloud_name>",
  api_key: "<your_api_key>",
  api_secret: "<your_api_secret>",
  secure: true,
});

const apiSecret = cloudinary.config().api_secret;

// Server-side function used to sign an upload with a couple of
// example eager transformations included in the request.
const signuploadform = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
      folder: "signed_upload_demo_form",
    },
    apiSecret
  );

  return { timestamp, signature };
};

module.exports = signuploadform;
