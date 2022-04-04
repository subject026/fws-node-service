"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setupMiddleware_1 = __importDefault(require("./util/setupMiddleware"));
const contactForm_1 = __importDefault(require("./controller/contactForm"));
// const Router = require("./resources/Router");
// const DB = require("./DB");
// const expressCallback = require("./util/expressCallback");
const app = (0, express_1.default)();
(0, setupMiddleware_1.default)(app);
console.log(process.env.MODE);
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
app.post("/api/contactform", contactForm_1.default);
// app.post("/cloudinarysigner", cloudinarySigner);
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
exports.default = app;
