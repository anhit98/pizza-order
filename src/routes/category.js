
const service = require('../services/category.js');

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
    handler: service.updateCategory
  }},
  {
    method: 'GET',
    path: `/category`,
    config: {
      tags: ['api'],
      handler: service.getAllCategories
    }},
    {
      method: 'DELETE',
      path: `/category/delete/{id}`,
      config: {
        tags: ['api'],
        handler: service.deleteCategory
      }}
]