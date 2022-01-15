type Config = {
  APP_SECRET: string | undefined;
  DB_URL: string | undefined;
};

const getInitialConfig = (): { APP_SECRET: string } => {
  return { APP_SECRET: process.env.DEV_DB_URL };
};

const getConfig = (): Config => {
  const initialConfig = getInitialConfig();
  switch (process.env.MODE) {
    case "development":
      return { ...initialConfig, DB_URL: process.env.DEV_DB_URL };
    case "test":
      return { ...initialConfig, DB_URL: process.env.TEST_DB_URL };
    default:
      return { ...initialConfig, DB_URL: process.env.PROD_DB_URL };
  }
};

export default getConfig;
