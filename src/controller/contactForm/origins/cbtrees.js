module.exports = {
  formFields: {
    name: {},
    email: {},
    phoneNumber: {},
    message: {},
  },
  transport: {
    host: "mail.cbtrees.co.uk",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "contactform@cbtrees.co.uk",
      pass: process.env.CBTREES_SMTP_PASSWORD,
    },
  },
};
