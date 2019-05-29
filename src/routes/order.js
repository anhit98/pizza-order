
const service = require('../services/order.js');
const Joi = require('joi');


module.exports =[ {
    method: 'POST',
    path: '/orders/create',
    config: {
      tags: ['api'],
      handler: service.createOrder,
        cors: {
          origin: ['*']
      },
      validate: {
        payload: service.validateOrder,
        headers:
          Joi.object().keys({
            'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
          }).options({ allowUnknown: true })
          }
        },
  },
  {
    method: 'GET',
    path: '/orders',
    config: {
      tags: ['api'],
      auth: false,
      handler: service.getOrders,
        cors: {
          origin: ['*']
      },
      validate: {
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true })
    }
    }
  },
  {
    method: 'PUT',
    path: '/orders/{id}',
    config: {
      tags: ['api'],
      auth: false,              
      // auth: ,
      handler: service.updateOrderStatus,
        cors: {
          origin: ['*']
      },
      validate: {
        payload: {
          status: Joi.string().valid(["submitted", "processing", "completed", "cancelled"]).required()
      },
        params: {
          id: Joi.string().required()
      }
    }
    }
  }
]