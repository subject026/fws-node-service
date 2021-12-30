const nodemailer = require("nodemailer");
const validateFormData = require("./validateFormData");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ username, password, body }) {
  if (!password) throw new Error("SMTP password missing");
  const { message } = body;
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
    subject: "cbtrees.co.uk Contact Form", // Subject line
    text: `Contact Form Message
            Contact Form Message</h2>
            name: ${body.name}</b>
            email: ${body.email}
            message:
            ${body.message}
           `, // plain text body
    html: `
    <h2>Contact Form Message</h2>
    <ul>
      <li>
        <b>name: ${body.name}</b>
      </li>
      <li>
      <b>email: ${body.email}</b> 
      </li>
      <li>
        <b>message:</b>
      </li>
    </ul>
    <p>
    ${body.message}
    </p>`, // html body
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
  const { username, password, body } = await validateFormData(req.body, origin);

  sendMail({ username, password, body })
    .then(() => {
      res.status(200).json({ mailing: "yes" });
    })
    .catch((err) => next(err));

  // res.status(200).json({ mailing: "yes" });
};

module.exports = contactFormController;
