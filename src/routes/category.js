
const service = require('../services/category.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/categories',
    config: {
      tags: ['api'],
      auth: false,
      handler: service.createCategory,
      validate: {
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
