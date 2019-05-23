
const service = require('../services/product.js');
const Joi = require('joi');
module.exports =[ 
  {
    method: 'GET',
    path: '/products',
    config: {
      tags: ['api'],
      cors: {
        origin: ['*']
    },
      handler: service.getProducts,
      validate: {
        query: {
          categoryId: Joi.string().optional(),
          pageNo: Joi.string().required(),
          size: Joi.string().required()
      }
    }
    }
  },
  {
    method: 'GET',
    path: '/products/{id}',
    config: {
      tags: ['api'],
      cors: {
        origin: ['*']
    },
      handler: service.getProductById,
      validate: {
        params: {
            id: Joi.string().min(3).max(50),
        }
    }
    }
  }
]