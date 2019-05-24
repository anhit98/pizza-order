
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
  },
  {
    method: 'PUT',
    path: '/orders/{id}',
    config: {
      tags: ['api'],
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