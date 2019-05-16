
const service = require('../services/product.js');

module.exports =[ {
    method: 'POST',
    path: '/product/create',
    config: {
      tags: ['api'],
      // auth: ,
      handler: service.createProduct,
    //   validate: {
    //     payload: service.validateCategory
    //     }
    }
  },
  {
    method: 'GET',
    path: '/',
    config: {
      tags: ['api'],
      // auth: ,
      handler: service.getAllProducts,
    //   validate: {
    //     payload: service.validateCategory
    //     }
    }
  }
]