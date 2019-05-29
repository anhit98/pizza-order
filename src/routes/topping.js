
const service = require('../services/topping.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/toppings',
    config: {
      tags: ['api'],
      handler: service.createTopping,
      validate: {
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
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
      headers:
      Joi.object().keys({
        'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
      }).options({ allowUnknown: true }),
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
      auth: false,      
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
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
        params: {
            id: Joi.string().min(3)
        }
    }
      }}
]