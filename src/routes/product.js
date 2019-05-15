
const service = require('../services/product.js');

module.exports =[ {
    method: 'POST',
    path: '/product/create',
    config: {
      tags: ['api'],
      // auth: ,
      handler: function (request, h) {

        return 'I did something!';
    },
    //   validate: {
    //     payload: service.validateCategory
    //     }
    }
  },
  {
    method: 'GET',
    path: '/product',
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