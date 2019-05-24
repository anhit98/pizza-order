
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
  },
  {
    method: 'POST',
    path: '/products',
    config: {
      tags: ['api'],
      cors: {
        origin: ['*']
    },
      handler: service.createProduct,
      validate: {
        payload: service.validateProduct
        },
    }
  },
  {
    method: 'PUT',
    path: `/products/{id}`,
    config: {
      tags: ['api'],
      handler: service.updateProduct,
      cors: {
        origin: ['*']
    },
      validate: {
        payload: service.validateUpdateProduct,
        params: {
            id: Joi.string().min(3)
        }
    }
    }},
    {
      method: 'DELETE',
      path: `/products/{id}`,
      config: {
        tags: ['api'],
        handler: service.deleteProduct,
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