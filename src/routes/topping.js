
const service = require('../services/topping.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/toppings',
    config: {
      tags: ['api'],
      // auth: ,
      handler: service.createTopping,
      validate: {
        payload: service.validateTopping
        },
        cors: {
          origin: ['*']
      }
    }
  },
  {
  method: 'PUT',
  path: `/toppings/{id}`,
  config: {
    tags: ['api'],
    handler: service.updateTopping,
    cors: {
      origin: ['*']
  },
    validate: {
      payload: service.validateUpdateTopping,
      params: {
          id: Joi.string().min(3)
      }
  }
  }},
  {
    method: 'GET',
    path: `/toppings`,
    config: {
      tags: ['api'],
      handler: service.getAllToppings,
      cors: {
        origin: ['*']
    }
    },
},
    {
      method: 'DELETE',
      path: `/toppings/{id}`,
      config: {
        tags: ['api'],
        handler: service.deleteTopping,
        cors: {
          origin: ['*']
      },
      validate: {
        params: {
            id: Joi.string().min(3)
        }
    }
      }}
]