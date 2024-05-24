const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");

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

const sendPasswordResetEmail = async (toEmail, newPassword) => {
  const mailOptions = {
    from: '"Newport Summer Fest" <megan@megaworld-lifestyle.com>',
    to: toEmail,
    subject: "Important: Your Account Password Has Been Reset",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Important: Your Account Password Has Been Reset</title>
      <style>
        /* Your CSS styles */
      </style>
    </head>
    <body style="background-color: #e9ecef; margin: 0; padding: 0;">
    
     
    
      <!-- Start body -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">

    
        <!-- Start hero -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Here's Your New Password</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- End hero -->
    
        <!-- Start copy block -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <!-- Start copy -->
              <tr>
                <td align="center" bgcolor="#e9ecef">
                <!-- Begin content -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px;">
                        <!-- Start header -->
                        <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <p style="margin: 0;">You requested a password reset for your account. Below is your new password. Please use this password to login and immediately update it for your security. If you did not request a password reset, please contact our support team.</p>
                        </td>
                        </tr>
                        <!-- End header -->

                        <!-- Start password display -->
                        <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 24px;">
                        <p style="margin: 0; color: #333333; font-weight: bold;">Your New Password: <span style="color: #1a82e2;">${newPassword}</span></p>
                        </td>
                        </tr>
                        <!-- End password display -->
                </table>
                <!-- End content -->
                </td>
                </tr>
              <!-- End button -->
    
            
    
              <!-- Start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  
                </td>
              </tr>
              <!-- End copy -->
    
            </table>
          </td>
        </tr>
        <!-- End copy block -->
    
        <!-- Start footer -->
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            
    
              <!-- Start address -->
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">© Newport Boulevard, Newport City, Pasay 1309, Metro Manila, Philippines.</p>
                </td>
              </tr>
              <!-- End address -->
    
            </table>
          </td>
        </tr>
        <!-- End footer -->
      </table>
      <!-- End body -->
    
    </body>
    </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email reset password sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending reset password email:", error.message);
  }
};

module.exports = { sendPasswordResetEmail };
