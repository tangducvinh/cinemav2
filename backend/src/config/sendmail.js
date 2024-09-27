const nodemailer = require("nodemailer");

const sendMail = async (email, html, subject) => {
  // Create a transporter object
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ducvinh100503@gmail.com",
      pass: "ddfp gmlb sguh nxhw",
    },
    tls: { rejectUnauthorized: false },
  });

  let info = await transporter.sendMail({
    from: "'cinemav2' <no-reply@ecommercebytdv.com>",
    to: email,
    subject: subject,
    html: html,
  });

  console.log("send mail ok");
};

module.exports = sendMail;
