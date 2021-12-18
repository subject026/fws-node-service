const nodemailer = require("nodemailer");

const parseFormData = require("./parseFormData");

const username = "contactform@cbtrees.co.uk";
const password = process.env.CBTREES_SMTP_PASSWORD;

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  if (!password) throw new Error("SMTP password missing");

  let transporter = nodemailer.createTransport({
    host: "mail.cbtrees.co.uk",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: username, // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "contactform@cbtrees.co.uk", // sender address
    to: "subject026@protonmail.com", // list of receivers
    subject: "Testing the emails", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log(info);
}

const contactFormController = async (req, res, next) => {
  const origin = req.get("origin");
  console.log("\n\nrequest origin: ", origin, "\n\n");

  // let formdata;
  // try {
  //   formData = parseFormData(req.body, origin);
  // } catch (err) {
  //   // bad request
  //   next(err);
  //   return;
  // }

  sendMail()
    .then(() => {
      res.status(200).json({ mailing: "yes" });
    })
    .catch((err) => next(err));

  // res.status(200).json({ mailing: "yes" });
};

module.exports = contactFormController;
