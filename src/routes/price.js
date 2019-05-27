
const service = require('../services/price.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/prices',
    config: {
      tags: ['api'],
      auth: false,      
      handler: service.createPrice,
      validate: {
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
    tags: ['api'],
    auth: false,    
    handler: service.updatePrice,
    cors: {
      origin: ['*']
  },
    validate: {
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
      tags: ['api'],
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
        tags: ['api'],
        auth: false,
        handler: service.deletePrice,
        cors: {
          origin: ['*']
      },
      validate: {
        params: {
            id: Joi.string().min(3).required()
        }
    }
      }}
]
