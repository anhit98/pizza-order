
const service = require('../services/product.js');
const Joi = require('joi');
module.exports =[ 
  {
    method: 'GET',
    path: '/products',
    config: {
      tags: ['api'],
      auth: false,      
      cors: {
        origin: ['*']
    },
      handler: service.getProducts,
      validate: {
        query: {
          categoryId: Joi.string().optional(),
          pageNo: Joi.number().required(),
          size: Joi.number().required()
      }
    }
    }
  },
  {
    method: 'GET',
    path: '/products/{id}',
    config: {
      tags: ['api'],
      auth: false,      
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
      auth: false,      
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
      auth: false,      
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
        auth: false,        
        handler: service.deleteProduct,
        cors: {
          origin: ['*']
      },
      validate: {
        params: {
            id: Joi.string().min(3)
        }
    }
      }},
      {
        method: 'GET',
        path: '/bestsellers',
        config: {
          tags: ['api'],
          auth: false,          
          cors: {
            origin: ['*']
        },
          handler: service.getBestSellersProducts,
          validate: {
            query: {
              categoryId: Joi.string().optional()
          }
        }
        }
      }
]