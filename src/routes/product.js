
const service = require('../services/product.js');
const Joi = require('joi');
module.exports =[ 
  {
    method: 'GET',
    path: '/products',
    config: {
      tags: ['api', 'user'],
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
      tags: ['api', 'user'],
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
      tags: ['api', 'admin'],
      cors: {
        origin: ['*']
    },
      handler: service.createProduct,
      validate: {
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
        payload: service.validateProduct
        },
    }
  },
  {
    method: 'PUT',
    path: `/products/{id}`,
    config: {
      tags: ['api', 'admin'],
      handler: service.updateProduct,
      cors: {
        origin: ['*']
    },
      validate: {
        payload: service.validateUpdateProduct,
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
        params: {
            id: Joi.string().min(3)
        }
    }
    }},
    {
      method: 'DELETE',
      path: `/products/{id}`,
      config: {
        tags: ['api', 'admin'],
        handler: service.deleteProduct,
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
      }},
      {
        method: 'GET',
        path: '/bestsellers',
        config: {
          tags: ['api', 'admin'],
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