var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "santhoshmsanthosh.1916@gmail.com",
    pass: "dquqcbyhrrtwrray",
  },
});

let sendRejectMail = (mailTo, type, header , feedback) => {
  try {
    var mailOptions = {
      from: "santhoshmsanthosh.1916@gmail.com",
      to: mailTo,
      subject: `Sending Email using Node.js ${type}`,
      text: `That was easy ${header}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false
      } else {
        console.log("Email sent: " + info.response);
        return true
      }
    });
  } catch (e) {
    console.log(e.message);
    return false
  }
};

module.exports = {
  sendRejectMail,
};
