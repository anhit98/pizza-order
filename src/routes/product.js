
const service = require('../services/product.js');

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
    //   validate: {
    //     payload: service.validateCategory
    //     }
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
    //   validate: {
    //     payload: service.validateCategory
    //     }
    }
  }
]