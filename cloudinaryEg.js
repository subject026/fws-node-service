const express = require("express");
const cloudinary = require("cloudinary").v2;

const signUploadForm = require("./signUploadForm");

const app = express();

app.use(express.json());

const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

// using this API should require authentication
router.get("/", function (req, res, next) {
  const sig = signature.signuploadform();
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudName,
    apikey: apiKey,
  });
});

// upload signing API
app.use("/api/signuploadwidget", signuploadwidgetRouter);
app.use("/api/signuploadform", signuploadformRouter);

// static files
app.use(express.static("public"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = app
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.info(`Server is up on http://localhost:${port}`)
);
