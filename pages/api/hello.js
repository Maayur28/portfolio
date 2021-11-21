// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let nodemailer = require("nodemailer");
require("dotenv").config();

const someAsyncOperation = (email, password, sender, message, name,emailfrom) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailfrom,
        pass: password,
      },
    });
    const mailData = {
      from: emailfrom,
      to: sender,
      subject: `Message From ${name}`,
      text: message,
      html: `<div>${message}</div><p>Sent from:
    ${email}</p>`,
    };
    transporter.sendMail(mailData, function (err, info) {
      console.log("iside", info);
      if (info) return true;
      else return false;
    });
  } catch (error) {
    console.log("error occured");
  }
  return true;
};

export default function handler(req, res) {
  const { emailfrom, password,sender } = process.env;
  const { email,message, name } = req.body;
  const result = someAsyncOperation(
    email,
    password,
    sender,
    message,
    name,
    emailfrom
  );
  res.status(200).send(result);
}
