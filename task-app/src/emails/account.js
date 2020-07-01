const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: "iulian.carnaru@outlook.com",
    subject: "Welcome to task app!",
    text: `Welcome to the app ${name}. Let me know how you get allong with the app`,
  });
};

const sendCancelationEmail = (name, email) => {
  console.log(name, email);

  sgMail.send({
    to: email,
    from: "iulian.carnaru@outlook.com",
    subject: "Sorry to seeing you going!",
    text: `${name} we are sorry to see you going. Please let us know what was going wrong.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
