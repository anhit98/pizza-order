
const service = require('../services/price.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/prices',
    config: {
      tags: ['api', 'admin'],
      handler: service.createPrice,
      validate: {
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
        payload: service.validatePrice
        },
        cors: {
          origin: ['*']
      }
    }
  },
  {
  method: 'PUT',
  path: `/prices/{id}`,
  config: {
    tags: ['api','admin'],
    handler: service.updatePrice,
    cors: {
      origin: ['*']
  },
    validate: {
      headers:
      Joi.object().keys({
        'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
      }).options({ allowUnknown: true }),
      payload: service.validateUpdatePrice,
      params: {
          id: Joi.string().min(3)
      }
  }
  }},
  {
    method: 'GET',
    path: `/prices`,
    config: {
      tags: ['api','user'],
      auth: false,      
      handler: service.getPrice,
      cors: {
        origin: ['*']
    },
    validate: {
        query: {
          productId: Joi.string().required()
      }
    }
    },
},
    {
      method: 'DELETE',
      path: `/prices/{id}`,
      config: {
        tags: ['api','admin'],
        handler: service.deletePrice,
        cors: {
          origin: ['*']
      },
      validate: {
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
        params: {
            id: Joi.string().min(3).required()
        }
    }
      }}
]
