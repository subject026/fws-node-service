const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

const config = require("../config");

const getCorsOptions = () => {
  const whitelist = [
    "https://cbtrees.co.uk",
    "https://website.uglandscapes.workers.dev",
    "https://urbangreenlandscapes.co.uk",
    "http://192.168.24.224:4000",
    "http://localhost:4000",
    "http://localhost:8787",
  ];
  return {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
};

const setupMiddleware = (app) => {
  app.use(express.json());
  // app.use(cookieParser());
  app.use(morgan("dev"));
  // const origin =
  //   process.env.MODE === "development"
  //     ? process.env.DEV_FRONTEND_URL
  //     : process.env.PROD_FRONTEND_URL;
  // console.log(origin);
  app.use(process.env.MODE === "production" ? cors(getCorsOptions()) : cors());
  // app.use(parseToken);
};

module.exports = setupMiddleware;
