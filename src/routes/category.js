
const service = require('../services/category.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/category/create',
    config: {
      tags: ['api'],
      // auth: ,
      handler: service.createCategory,
      validate: {
        payload: service.validateCategory
        }
    }
  },
  {
  method: 'PUT',
  path: `/category/update/{id}`,
  config: {
    tags: ['api'],
    handler: service.updateCategory,
    validate: {
      params: {
          id: Joi.string().min(3).max(10)
      }
  }
  }},
  {
    method: 'GET',
    path: `/category`,
    config: {
      tags: ['api'],
      handler: service.getAllCategories,
      cors: {
        origin: ['*']
    }
    },
},
    {
      method: 'DELETE',
      path: `/category/delete/{id}`,
      config: {
        tags: ['api'],
        handler: service.deleteCategory
      }}
]