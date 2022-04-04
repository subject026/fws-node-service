import { v2 as cloudinary } from "cloudinary";
import getConfig from "../../util/getConfig";

// const apiSecret = cloudinary.config().api_secret;
// const apikey = cloudinary.config().api_key;

const signUploadRequest = async (signingData, origin) => {
  console.log("weeeeeee");

  const { CLOUD_NAME, API_SECRET, API_KEY } = await getConfig(origin);
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  });

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      ...signingData,
      timestamp,
    },
    API_SECRET
  );

  return { timestamp, signature, apikey: API_KEY, ...signingData };
};

export default signUploadRequest;
