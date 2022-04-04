"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const validateFormData_1 = __importDefault(require("./validateFormData"));
// async..await is not allowed in global scope, must use a wrapper
async function sendMail({ transport, mailMeta, formData }) {
    let transporter = nodemailer_1.default.createTransport(transport);
    const to = formData.email === "subject026@protonmail.com"
        ? "subject026@protonmail.com"
        : mailMeta.to;
    console.log(transport);
    console.log(mailMeta);
    const html = `
  <style>  
    * {
      font-family: sans-serif;
      color: #202020;
    }    
    h5 {
      font-size: 1.4rem;
      margin: 0;
      font-weight: bold;
    }
    p {
      margin-top: 1rem;
    }
    .container {
      padding: 1rem;
    }
    .field {
      margin-top: 2rem;
    }
  </style>
  <div class="container">
  <h5>Contact Form Message Received</h5>
    ${Object.keys(formData)
        .map((key) => {
        return `<div class="field">
        <p><strong>${key}</strong></p>
        <p>${formData[key]}</p>
        </div>
        `;
    })
        .join("")}
      </div>
    `;
    const { from, subject } = mailMeta;
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from,
        to,
        subject,
        text: `Contact Form Message
            Contact Form Message
            name: ${formData.name}
            email: ${formData.email}
            tel: ${formData.tel}
            message:
            ${formData.message}
           `,
        html,
    });
    console.log(info);
}
const contactFormController = async (req, res, next) => {
    const origin = req.get("origin");
    const { transport, formData, mailMeta } = await (0, validateFormData_1.default)(req.body, origin);
    sendMail({ transport, formData, mailMeta })
        .then(() => {
        res.status(200).json({ mailing: "yes" });
    })
        .catch((err) => next(err));
};
exports.default = contactFormController;
