
const service = require('../services/order.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/orders/create',
    config: {
      tags: ['api'],
      // auth: ,
      handler: service.createOrder,
        cors: {
          origin: ['*']
      },
      validate: {
        payload: service.validateOrder,
        query: {
          customerId: Joi.string().optional()
      }
        
        },
    }
  },
  {
    method: 'GET',
    path: '/orders',
    config: {
      tags: ['api'],
      // auth: ,
      handler: service.getOrders,
        cors: {
          origin: ['*']
      },
      validate: {
        query: {
          customerId: Joi.string().optional()
      }
    }
    }
  }
]