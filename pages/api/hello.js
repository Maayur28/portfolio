// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let nodemailer = require("nodemailer");
require("dotenv").config();
export default function handler (req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  const mailData = {
    from: req.body.email,
    to: "mayuragarwal2812@gmail.com",
    subject: `Message From ${req.body.name}`,
    text: req.body.message,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(200);
}
