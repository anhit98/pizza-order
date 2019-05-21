
const service = require('../services/order.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/order/create',
    config: {
      tags: ['api'],
      // auth: ,
      handler: service.createOrder,
        cors: {
          origin: ['*']
      }
    }
  }
]