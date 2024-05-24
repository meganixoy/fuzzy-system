const welcomeEmailLayout = (
  title,
  company,
  address,
  token,
  clientUrl,
  facebook,
  year
) => {
  return `<!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <title> ${title} </title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
  
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
  
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
  
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
  
      p {
        display: block;
        margin: 0;
      }
    </style>
    <!--[if mso]>
      <noscript>
      <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      </noscript>
      <![endif]-->
    <!--[if lte mso 11]>
      <style type="text/css">
        .mj-outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    </style>
    <style type="text/css">
      [owa] .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width:480px) {
        table.mj-full-width-mobile {
          width: 100% !important;
        }
  
        td.mj-full-width-mobile {
          width: auto !important;
        }
      }
    </style>
    <style type="text/css">
      .g-pr-5 {
        padding-right: 5px !important;
      }
  
      .g-pl-5 {
        padding-left: 5px !important;
      }
  
      @media screen and (max-width: 480px) {
        .m-col-50 {
          width: 50% !important;
        }
  
        .m-col-100 {
          width: 100% !important;
        }
  
        .m-al {
          text-align: left !important;
        }
  
        .m-ac {
          text-align: center !important;
        }
  
        .m-tac>div {
          text-align: center !important;
        }
  
        .m-img-c>table {
          margin: 0 auto !important;
        }
  
        .m-pb-20 {
          padding-bottom: 20px !important;
        }
  
        .m-pb-24 {
          padding-bottom: 24px !important;
        }
  
        .m-pt-30 {
          padding-top: 30px !important;
        }
  
        .m-pb-30 {
          padding-bottom: 30px !important;
        }
  
        .m-px-0 {
          padding-right: 0 !important;
          padding-left: 0 !important;
        }
  
        .m-px-20 {
          padding-right: 20px !important;
          padding-left: 20px !important;
        }
  
        .mc-px-20>table>tbody>tr>td {
          padding-right: 20px !important;
          padding-left: 20px !important;
        }
  
        .gfw {
          width: 100% !important;
        }
      }
  
      /* Common */
      p {
        margin: 0;
      }
  
      /* Alignments */
      /* Text alignment */
      .text-left {
        text-align: left !important;
      }
  
      .text-right {
        text-align: right !important;
      }
  
      /* Utility */
      @media only screen and (min-width: 481px) {
        .ar {
          text-align: right !important;
        }
  
        .al {
          text-align: left !important;
        }
  
        .ac {
          text-align: center !important;
        }
  
        .col-50 {
          width: 50% !important;
        }
  
        .pr-10 {
          padding-right: 10px !important;
        }
  
        .pl-10 {
          padding-left: 10px !important;
        }
  
        .pt-32 {
          padding-top: 32px !important;
        }
  
        .pt-36 {
          padding-top: 36px !important;
        }
  
        .px-20 {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
  
        .px-40 {
          padding-left: 40px !important;
          padding-right: 40px !important;
        }
  
        .px-60 {
          padding-right: 60px !important;
          padding-left: 60px !important;
        }
  
        .py-0,
        .c-py-0>table>tbody>tr>td {
          padding-top: 0px !important;
          padding-bottom: 0px !important;
        }
  
        .c-pr-10>table>tbody>tr>td {
          padding-right: 10px !important;
        }
  
        .c-pl-10>table>tbody>tr>td {
          padding-left: 10px !important;
        }
  
        .c-pr-30>table>tbody>tr>td {
          padding-right: 30px !important;
        }
  
        .c-pl-30>table>tbody>tr>td {
          padding-left: 30px !important;
        }
  
        .c-pr-40>table>tbody>tr>td {
          padding-right: 40px !important;
        }
  
        .c-pl-40>table>tbody>tr>td {
          padding-left: 40px !important;
        }
  
        .c-px-40>table>tbody>tr>td {
          padding-left: 40px !important;
          padding-right: 40px !important;
        }
  
        .hero-text {
          padding: 0 36px 40px !important;
        }
      }
  
      /* Blue links fix */
      /* Apple */
      a[x-apple-data-detectors] {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
  
      /* Gmail */
      u+#body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
  
      /* Samsung */
      #MessageViewBody p a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
    </style>
    <!--[if mso]>
  <style type="text/css">
    /* Ghost line fix */
    table {
      border-collapse: collapse;
      border-spacing: 0;
      mso-line-height-rule: exactly;
      mso-margin-bottom-alt: 0;
      mso-margin-top-alt: 0;
      mso-table-lspace: 0pt; mso-table-rspace: 0pt;
    }
  </style>
  <![endif]-->
  </head>
  
  <body id="body" bgcolor="#F5F5F5" style="mso-line-height-rule: exactly; padding: 0 10px 40px 10px; word-spacing: normal; background-color: #F5F5F5;">
    <div style="background-color:#F5F5F5;">
     
      <table align="center" class="component-margin-bottom" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F5F5;background-color:#F5F5F5;width:100%;">
        <tbody>
          <tr>
            <td>
              <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="component-margin-bottom-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#F5F5F5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0 0 0px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="mj-section-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div class="mj-section" style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0px;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; background: #ffffff; background-color: #ffffff; width: 100%; border-radius: 0px;" width="100%" bgcolor="#ffffff">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0 0 60px 0;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 20px 40px;text-align:center;">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]-->
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" class="u-img-fluid" style="font-size:0px;padding:0;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width: 100%;" width="100%">
                                            <img alt height="auto" src="https://s3.eu-central-1.amazonaws.com/mailo.images.prod/2c4c357ff9292018c6caeae14e81f4755b4d8dbd.png" style="max-width: 100%; border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px;" width="560">
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="mc-px-20-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="mc-px-20-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div class="mc-px-20" style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:0 60px;text-align:center;">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:480px;" ><![endif]-->
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" class="body-sans body-lg headline-sans headline-xl mjrt" style="font-size:0px;word-break:break-word;">
                                    <div style="color:#1f1f1f;text-align:center;">
                                      <p style="margin-block-start: 0; font-family: Helvetica, Arial, sans-serif; font-size: 20px; line-height: 32px; Margin-bottom: 32px; Margin-top: 0; padding-top: 0; margin-top: 0;"><strong>Welcome to Summer Scan Fest</strong></p>
                                      <p style="margin-block-start: 0; font-family: Helvetica, Arial, sans-serif; font-size: 20px; line-height: 32px; Margin-bottom: 32px; Margin-top: 0; margin-bottom: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a target="_blank" rel="noopener noreferrer nofollow" href="${clientUrl}" style="text-decoration: none; color: #A30674; font-weight: bold;">${title}</a>, you can safely delete this email.</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" vertical-align="middle" class="m-pt-30" style="font-size:0px;padding:40px 0 0 0;word-break:break-word;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                    <tbody>
                                      <tr>
                                        <td align="center" bgcolor="#a30674" role="presentation" style="border:solid 1px #a30674;border-radius:12px;cursor:auto;mso-padding-alt:17px 39px;background:#a30674;" valign="middle">
                                           <a href="${clientUrl}/verify?token=${token}" target="_blank" style="
                                           display: inline-block; 
                                           padding: 17px 39px; 
                                           font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji; 
                                           font-size: 20px;
                                           font-weight: bold;
                                           color: #ffffff; 
                                           text-decoration: none; 
                                           border-radius: 12px;
                                           line-height: 24px;"> Confirm email address </a>                         
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      <table align="center" class="component-margin-bottom" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F5F5;background-color:#F5F5F5;width:100%;">
        <tbody>
          <tr>
            <td>
              <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="component-margin-bottom-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#F5F5F5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0 0 0px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="mj-section-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div class="mj-section" style="margin:0px auto;border-radius:0px;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; width: 100%; border-radius: 0px;" width="100%">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:30px 20px;text-align:center;">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]-->
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:0 0 20px 0;word-break:break-word;">
                                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                      <tbody>
                                        <tr>
                                          <td style="padding:0 10px 0;vertical-align:middle;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:24px;">
                                              <tbody>
                                                <tr>
                                                  <td style="font-size:0; height:24px; vertical-align:middle; width:24px;">
                                                    <a href="https://www.facebook.com/NewportMall" target="_blank">
                                                      <img alt="Facebook" height="24" src="https://s3.eu-central-1.amazonaws.com/mailo.icons.prod/9B9B9B-Facebook.png" style="max-width: 100%; border: none; border-radius: 3px; display: block;" width="24">
                                                    </a>
                                                  </td>
                                                </tr>                                            
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if mso | IE]></td></tr></table><![endif]-->
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" class="body-sans body-xs mjrt" style="font-size:0px;word-break:break-word;">
                                    <div style="color:#1f1f1f;text-align:center;">
                                      <p style="margin-block-start: 0; font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 20px; Margin-bottom: 16px; Margin-top: 0; padding-top: 0; margin-top: 0; margin-bottom: 0;">${company}<br>© ${year} ${address}</p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
    </div>
  </body>
  
  </html>`;
};

module.exports = { welcomeEmailLayout };
