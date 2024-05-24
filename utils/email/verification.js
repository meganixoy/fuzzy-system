const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");
const { welcomeEmailLayout } = require("./welcomeEmailLayout");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const ses = new aws.SES({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.CXG_AWS_ACCESS_KEY,
    secretAccessKey: process.env.CXG_AWS_SECRET_KEY,
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const title = "Newport Summer Scan Fest";
const facebook = "https://www.facebook.com/NewportMall";
const company = "Newport City";
const address = "Newport Boulevard, Pasay 1309, Metro Manila, Philippines";
const currentYear = new Date().getFullYear();

const sendVerificationEmail = async (toEmail, verificationToken) => {
  const mailOptions = {
    from: `${title} <megan@megaworld-lifestyle.com>`,
    to: toEmail,
    subject: "Confirm your email address",
    html: welcomeEmailLayout(
      title,
      company,
      address,
      verificationToken,
      process.env.CLIENT_URL,
      facebook,
      currentYear
    ),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email verification sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error.message);
  }
};

module.exports = { sendVerificationEmail };
