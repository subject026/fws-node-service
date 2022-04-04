import * as path from "path";

import { getOriginData } from "./readOrigins";

const getConfig = async (origin) => {
  let configs = {};
  return (async () => {
    if (!configs[origin]) {
      const originPath = path.join(process.cwd(), "origins");
      const data = await getOriginData(originPath, origin);
      configs[origin] = { ...data };
    }

    return configs[origin];
  })();
};

export default getConfig;
