
const service = require('../services/product.js');

module.exports =[ 
  {
    method: 'GET',
    path: '/product/{categoryId}',
    config: {
      tags: ['api'],
      cors: {
        origin: ['*']
    },
      handler: service.getProductsByCate,
    //   validate: {
    //     payload: service.validateCategory
    //     }
    }
  },
  {
    method: 'GET',
    path: '/products/details/{id}',
    config: {
      tags: ['api'],
      cors: {
        origin: ['*']
    },
      handler: service.getProductById,
    //   validate: {
    //     payload: service.validateCategory
    //     }
    }
  }
]