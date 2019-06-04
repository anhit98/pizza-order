const Joi = require('joi');
const Boom = require('boom');
const nodemailer = require('nodemailer');
const validateContact = {
    name: Joi.string().max(400).required(),
    email: Joi.string().required(),
    message:  Joi.string().required(),
    phone:  Joi.string().required()
   }

   const sendMail = async function (req, reply) {

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
          user: 'anh.dothingoc@pycogroup.com',
          pass: 'Hoang@12057'
      }
    });
    
    const mailOptions = {
      from: "anhngocdo13061998@gmail.com",
      to: 'pizzaorder.pnv@gmail.com',
      subject: 'Pizza order app - Contact',
      html:  `<tbody>
      <tr>
          <td>
              <h1 style="font-size:25px;line-height:110%;margin-bottom:10px;margin-top:0;padding:0">Customer FeedBack</h1>
          </td>
      </tr>
      <tr>
          <td align="center" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-radius:6px;background-color:#ffffff">
                  <tbody>
                      <tr>
                          <td align="left" valign="top" style="line-height:150%;font-family:Helvetica;font-size:14px;color:#333333;padding:20px">
                              <ul style="display:block;margin:15px 20px;padding:0;list-style:none;border-top:1px solid #eee">
                                  <li style="display:block;margin:0;padding:5px 0;border-bottom:1px solid #eee">
                                      <strong>Email Address:</strong>
                                      <a href="mailto:${req.payload.email}" target="_blank">${req.payload.email}</a>
                                  </li>
                                  <li style="display:block;margin:0;padding:5px 0;border-bottom:1px solid #eee">
                                      <strong>Name:</strong> ${req.payload.name}
                                  </li>
                                  <li style="display:block;margin:0;padding:5px 0;border-bottom:1px solid #eee">
                                      <strong>Phone:</strong> ${req.payload.phone}</li>
                                  <li style="display:block;margin:0;padding:5px 0;border-bottom:1px solid #eee">
                                      <strong>Question:</strong> ${req.payload.message}
                                  </li>
                              </ul>
                              <p style="padding:0 0 10px 0">
                                  You may also contact us at:<br></br>
                                  <a href="mailto:${req.payload.email}" style="color:#e5293e" target="_blank">${req.payload.email}</a>
                              </p> 
                          </td> 
                      </tr> 
                  </tbody>
              </table> 
          </td> 
      </tr>
      <tr>
          <td align="center" valign="top">
              <table border="0" cellpadding="20" cellspacing="0" width="100%" style="max-width:600px">
                  <tbody>
                      <tr>
                          <td align="center" valign="top">
                              <div>
                                  <span class="m_147690310709940969poweredBy" style="display:block">
                                      <a href="https://imgur.com/ttK3J37" tyle="color:#e5293e" target="_blank"><img src="https://i.imgur.com/ttK3J37.png" title="source: imgur.com" /></a>
                                  </span>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </td>
      </tr> 
  </tbody>`
    };
    

    try {
      const response = await transporter.sendMail(mailOptions);
      return 'Email sent: ' + response;
    } catch (error) {
      return Boom.badRequest(error);
    }
  }

  module.exports = {
    validateContact,
    sendMail
  }