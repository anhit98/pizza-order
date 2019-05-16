
const service = require('../services/product.js');

module.exports =[ 
  // {
  //   method: 'POST',
  //   path: '/product/create',
  //   config: {
  //     tags: ['api'],
  //     // auth: ,
  //     handler: service.createProduct,
  //   //   validate: {
  //   //     payload: service.validateCategory
  //   //     }
  //   }
  // },
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
  }
]