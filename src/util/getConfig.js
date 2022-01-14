const path = require("path");

const { getOriginData } = require("./readOrigins");

const getConfig = async (origin) => {
  let configs = {};
  return (async () => {
    if (!configs[origin]) {
      const originPath = path.join(process.cwd(), "origins");
      const data = await getOriginData(originPath, origin);
      configs[origin] = { ...data };
    }
    console.log(configs[origin]);
    console.log(configs[origin]);
    return configs[origin];
  })();
};

module.exports = { getConfig };
