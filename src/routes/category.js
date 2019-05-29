
const service = require('../services/category.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/categories',
    config: {
      tags: ['api'],
      handler: service.createCategory,
      validate: {        
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
        payload: service.validateCategory
        },
        cors: {
          origin: ['*']
      }
    }
  },
  {
  method: 'PUT',
  path: `/categories/{id}`,
  config: {
    tags: ['api'],
    auth: false,    
    handler: service.updateCategory,
    cors: {
      origin: ['*']
  },
    validate: {
      payload: service.validateUpdateCategory,
      params: {
          id: Joi.string().min(3)
      }
  }
  }},
  {
    method: 'GET',
    path: `/categories`,
    config: {
      tags: ['api'],
      auth: false,      
      handler: service.getAllCategories,
      cors: {
        origin: ['*']
    }
    },
},
    {
      method: 'DELETE',
      path: `/categories/{id}`,
      config: {
        tags: ['api'],
      auth: false,        
        handler: service.deleteCategory,
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
