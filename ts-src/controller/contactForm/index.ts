import nodemailer from "nodemailer";
import validateFormData from "./validateFormData";

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
    to: "contactform@cbtrees.co.uk", // list of receivers
    subject: "Contact Form - cbtrees.co.uk", // Subject line
    text: `Contact Form Message
            Contact Form Message
            name: ${body.name}
            email: ${body.email}
            tel: ${body.tel}
            message:
            ${body.message}
           `, // plain text body
    html: `
    <style>
      ul {
        padding: 1rem 0;
        list-style-type: none;
      }
      h5 {
        margin: 0;
        font-weight: bold;
      }
      p {
        margin-top: 1rem;
      }
    </style>
    <h3>Contact Form Message - cbtrees.co.uk</h3>
    <h5>From</h5>
    <ul>
      <li>
        <b>name: </b>${body.name}
      </li>
      <li>
      <b>email: </b>${body.email} 
      </li>
      <li>
      <b>phone number: </b>${body.tel} 
      </li>
    </ul>
    <h5>
      message:
    </h5>
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

export default contactFormController;
