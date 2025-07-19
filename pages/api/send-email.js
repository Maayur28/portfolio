import nodemailer from "nodemailer";
import axios from "axios";

// Captcha verification helper
async function verifyCaptcha(token) {
  const secretKey = process.env.CAPTCHA_SECRET_KEY;
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  try {
    const response = await axios.post(verifyURL);
    return response.data.success;
  } catch (err) {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  const { captcha, email, name, message } = req.body;

  if (!captcha) return res.status(200).json({ success: false });

  const isCaptchaValid = await verifyCaptcha(captcha);
  if (!isCaptchaValid) {
    return res.status(400).json({
      message:
        "Captcha verification failed!!! Reload page and re-verify captcha",
    });
  }

  console.log("Captcha verified successfully");

  if (!email || !name || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  console.log("Input validation passed");

  // Process email sending asynchronously
  console.log("Starting email sending process");
  try {
    const mailTransport = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      secure: true,
      secureConnection: false, // TLS requires secureConnection to be false
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const mailData = {
      from: process.env.email,
      to: email,
      subject: "Thank you for contacting us !!!🙂",
      html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              * { box-sizing: border-box; }
              body { margin: 0; padding: 0; }
              a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
              #MessageViewBody a { color: inherit; text-decoration: none; }
              p { line-height: inherit }
              .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }
              .image_block img+div { display: none; }
              @media (max-width:720px) {
                  .desktop_hide table.icons-inner, .social_block.desktop_hide .social-table { display: inline-block !important; }
                  .icons-inner { text-align: center; }
                  .icons-inner td { margin: 0 auto; }
                  .image_block img.big, .row-content { width: 100% !important; }
                  .mobile_hide { display: none; }
                  .stack .column { width: 100%; display: block; }
                  .mobile_hide { min-height: 0; max-height: 0; max-width: 0; overflow: hidden; font-size: 0px; }
                  .desktop_hide, .desktop_hide table { display: table !important; max-height: none !important; }
              }
          </style>
      </head>
      <body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f9f9f9;">
              <tbody>
                  <tr>
                      <td>
                          <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color: #000000; width: 700px;" width="700">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                                                          <div class="spacer_block block-1" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color: #000000; width: 700px;" width="700">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                                                          <div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;">&#8202;</div>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffd3e0; color: #000000; width: 700px;" width="700">
                              <tbody>
                                  <tr>
                                      <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; vertical-align: top;">
                                          <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tr>
                                                  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                      <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1561/Welcome_Email.png" style="display: block; height: auto; border: 0; width: 420px; max-width: 100%;" width="420" alt="I'm an image" title="I'm an image"></div>
                                                  </td>
                                              </tr>
                                          </table>
                                          <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break: break-word;">
                                              <tr>
                                                  <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                      <div style="font-family: sans-serif">
                                                          <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #191919; line-height: 1.5;">
                                                              <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 24px;"><strong><span style="font-size:38px;">Hi ${name}, </span></strong></p>
                                                              <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 24px;"><strong><span style="font-size:38px;">Thank you for contacting!!</span></strong></p>
                                                          </div>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; color: #000000; width: 700px;" width="700">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top;">
                                                          <div class="spacer_block block-1" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div>
                                                          <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad" style="padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                      <div style="font-family: sans-serif">
                                                                          <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #191919; line-height: 1.5;">
                                                                              <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 24px;"><span style="font-size:28px;"><strong><span>Have a look at few of my works</span></strong></span></p>
                                                                          </div>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="divider_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div class="alignment" align="center">
                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="5%" style="border-top: 2px solid #FFD3E0;">
                                                                              <tr>
                                                                                  <td class="divider_inner" style="font-size: 1px; line-height: 1px;">&#8202;</td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; color: #000000; width: 700px;" width="700">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="66.66666666666667%" style="font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top;">
                                                          <div class="spacer_block block-1 mobile_hide" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                                                          <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break: break-word;">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:10px;">
                                                                          <div style="font-family: sans-serif">
                                                                              <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Tahoma, sans-serif; mso-line-height-alt: 24px; color: #34495e; line-height: 2;">
                                                                                  <p style="margin: 0; font-size: 14px; text-align: left;">TrackMYPrice</p>
                                                                              </div>
                                                                          </div>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break: break-word;">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:30px;">
                                                                          <div style="font-family: sans-serif">
                                                                              <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Tahoma, sans-serif; mso-line-height-alt: 24px; color: #555555; line-height: 2;">
                                                                                  <p style="margin: 0; font-size: 14px; text-align: left;">It is a free tool to check price history charts for millions of products from Amazon and Flipkart. It also provides mail support so as soon as the price drops we will notify you.</p>
                                                                              </div>
                                                                          </div>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break: break-word;">
                                                              <tbody>
                                                                  <tr>
                                                                      <td style="padding-left:40px;">
                                                                          <div style="font-family: sans-serif">
                                                                              <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Tahoma, sans-serif; mso-line-height-alt: 24px; color: #a96b7d; line-height: 2;">
                                                                                  <p style="margin: 0; font-size: 14px; text-align: left;"><a href="https://trackmyprice.in/" target="_blank" style="text-decoration: none; color: #a96b7d;">View Website →</a></p>
                                                                              </div>
                                                                          </div>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                      <td class="column column-2" width="33.333333333333336%" style="font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 50px; vertical-align: top;">
                                                          <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                      <div class="alignment" align="left" style="line-height:10px"><a href="https://trackmyprice.in/" target="_blank" style="outline:none" tabindex="-1"><img src="https://res.cloudinary.com/mayur28/image/upload/v1715405123/Screenshot_2024-05-11_105450_ci78t6.png" style="display: block; height: auto; border: 0; width: 233px; max-width: 100%;" width="233" alt="TrackMYPriceImage" title="TrackMYPrice"></a></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; color: #000000; width: 700px;" width="700">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top;">
                                                          <div class="spacer_block block-1" style="height:35px;line-height:35px;font-size:1px;">&#8202;</div>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; color: #000000; border-radius: 0; width: 700px;" width="700">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="33.333333333333336%" style="font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 50px; vertical-align: top;">
                                                          <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                      <div class="alignment" align="center" style="line-height:10px"><a href="https://www.trackdsa.com/" target="_blank" style="outline:none" tabindex="-1"><img src="https://res.cloudinary.com/mayur28/image/upload/v1682390737/TrackDSAHome_dgtqsz.png" style="display: block; height: auto; border: 0; width: 233px; max-width: 100%;" width="233" alt="TrackDSA" title="TrackDSA"></a></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                      <td class="column column-2" width="66.66666666666667%" style="font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                                                          <table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="word-break: break-word;">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:30px;">
                                                                          <div style="font-family: sans-serif">
                                                                              <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Tahoma, sans-serif; mso-line-height-alt: 24px; color: #555555; line-height: 2;">
                                                                                  <p style="margin: 0; font-size: 14px; text-align: left;">It is the best place to practice data structures, algorithms, and most asked interview questions along with the most famous DSA sheets. You can add your own DSA problems and also track the progress.</p>
                                                                              </div>
                                                                          </div>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; color: #000000; width: 700px;" width="700">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top;">
                                                          <div class="spacer_block block-1" style="height:40px;line-height: 40px; font-size: 1px;">&#8202;</div>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color: #000000; width: 700px;" width="700">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top;">
                                                          <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                      <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1561/white_down.png" style="display: block; height: auto; border: 0; width: 700px; max-width: 100%;" width="700" alt="Alternate text" title="Alternate text"></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </body>
      </html>`,
    };

    const usMailData = {
      from: process.env.email,
      to: process.env.MY_EMAIL,
      subject: "Recieved Contact Mail🙂",
      html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <style type="text/css">
          @media only screen and (min-width: 620px) {
            .u-row { width: 600px !important; }
            .u-row .u-col { vertical-align: top; }
            .u-row .u-col-100 { width: 600px !important; }
          }
          @media (max-width: 620px) {
            .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; }
            .u-row .u-col { min-width: 320px !important; max-width: 100% !important; display: block !important; }
            .u-row { width: 100% !important; }
            .u-col { width: 100% !important; }
            .u-col > div { margin: 0 auto; }
          }
          body { margin: 0; padding: 0; }
          table, tr, td { vertical-align: top; border-collapse: collapse; }
          .ie-container table, .mso-container table { table-layout: fixed; }
          * { line-height: inherit; }
          a[x-apple-data-detectors='true'] { color: inherit !important; text-decoration: none !important; }
          table, td { color: #000000; }
          #u_body a { color: #0000ee; text-decoration: underline; }
          @media (max-width: 480px) {
            #u_content_image_1 .v-container-padding-padding { padding: 40px 10px 10px !important; }
            #u_content_image_1 .v-src-width { width: auto !important; }
            #u_content_image_1 .v-src-max-width { max-width: 22% !important; }
            #u_content_heading_2 .v-container-padding-padding { padding: 40px 10px 10px !important; }
          }
        </style>
      </head>
      <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9ff;color: #000000">
        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9ff;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;">
                <span>&#160;</span>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>`,
    };

    await Promise.all([
      mailTransport.sendMail(mailData),
      mailTransport.sendMail(usMailData),
    ]);

    console.log("Both emails sent successfully");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending emails:", error);
    return res.status(400).json({
      message: "Sorry, we couldn't send your message. Please try again later.",
    });
  }
}
