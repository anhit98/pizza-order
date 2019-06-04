
const service = require('../services/contact.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/contact',
    config: {
      tags: ['api', 'user'],
      auth: false, 
      handler: service.sendMail,
      validate: {        
        payload: service.validateContact
        },
        cors: {
          origin: ['*']
      }
    }
  }
]
