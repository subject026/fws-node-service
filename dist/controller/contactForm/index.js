"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const validateFormData_1 = __importDefault(require("./validateFormData"));
// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ username, password, body }) {
    if (!password)
        throw new Error("SMTP password missing");
    const { message } = body;
    let transporter = nodemailer_1.default.createTransport({
        host: "mail.cbtrees.co.uk",
        port: 465,
        secure: true,
        auth: {
            user: username,
            pass: password, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "contactform@cbtrees.co.uk",
        to: "contactform@cbtrees.co.uk",
        subject: "Contact Form - cbtrees.co.uk",
        text: `Contact Form Message
            Contact Form Message
            name: ${body.name}
            email: ${body.email}
            tel: ${body.tel}
            message:
            ${body.message}
           `,
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
    const { username, password, body } = await (0, validateFormData_1.default)(req.body, origin);
    sendMail({ username, password, body })
        .then(() => {
        res.status(200).json({ mailing: "yes" });
    })
        .catch((err) => next(err));
    // res.status(200).json({ mailing: "yes" });
};
exports.default = contactFormController;
