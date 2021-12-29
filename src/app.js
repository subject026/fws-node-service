const express = require("express");

const setupMiddleware = require("./util/setupMiddleware");
const contactFormController = require("./controller/contactForm");
const cloudinarySigner = require("./controller/cloudinarySigner");

// const Router = require("./resources/Router");
// const DB = require("./DB");
// const expressCallback = require("./util/expressCallback");

const app = express();

setupMiddleware(app);

// app.use("/api", Router);

// Return 404 if no routes match
// app.all(
//   "*",
//   expressCallback(async () => {
//     return {
//       statusCode: 404,
//       body: {
//         errors: ["No resource found at that location"],
//       },
//     };
//   })
// );

app.get("/", (req, res) => {
  res.status(200).json({ woop: "woop" });
});

app.post("/contactform", contactFormController);
app.post("/cloudinarysigner", cloudinarySigner);

// Return 404 if no routes match
app.all("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// app.use((req, res, err) => {
//   console.log("\n\nUnhandled error???\n\n", err, "\n\n");
//   res.status(500).json({
//     errors: [err],
//   });
// });

// DB();

module.exports = app;
