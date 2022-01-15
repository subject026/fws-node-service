const path = require("path");
const { getOriginData } = require("../../util/readOrigins");

const validateFormData = async (body, origin) => {
  // what data is expected for this origin?
  const originPath = path.join(process.cwd(), "origins");
  const data = await getOriginData(originPath, origin);
  console.log("body::::", body, "\n\n", origin);
  console.log("\n\n", originPath, "\n\n");
  // return new Promise((resolve, reject) => {
  console.log("\n\n\ndatarr: ", data.transport.auth.pass);
  //   resolve()
  const username = data.transport.auth.user;
  const password = data.transport.auth.pass;
  console.log({ username, password });
  return { body, username, password };
  //   throw new Error("Ooooof");
  // })
};

export default validateFormData;
