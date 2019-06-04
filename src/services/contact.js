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
      service: 'gmail',
      auth: {
          user: 'anhngocdo13061998@gmail.com',
          pass: 'dothingocanh'
      }
    });
    
    var context = {
      name: req.payload.name,
      message: req.payload.message
  };

    const mailOptions = {
      from: "anhngocdo13061998@gmail.com",
      to: 'pizzaorder.pnv@gmail.com',
      subject: 'Pizza order app - Contact',
      html:  '<p><b>Name: </b>{{name}}</p><p><b>Message: </b>{{message}}</p>'
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