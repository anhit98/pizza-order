
const service = require('../services/order.js');
const Joi = require('joi');


module.exports =[ {
    method: 'POST',
    path: '/orders',
    config: {
      tags: ['api', 'user'],
      auth: false,
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
      tags: ['api','user'],
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
    method: 'GET',
    path: '/orders/{id}',
    config: {
      tags: ['api','user'],
      auth: false,
      handler: service.getOrdersById,
        cors: {
          origin: ['*']
      },
      validate: {
        params: {
          id: Joi.string().required()
      }
    }
    }
  }
]