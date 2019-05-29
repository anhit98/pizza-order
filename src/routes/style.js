
const service = require('../services/style.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/styles',
    config: {
      tags: ['api'],
      handler: service.createStyle,
      validate: {
        headers:
        Joi.object().keys({
          'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
        }).options({ allowUnknown: true }),
        payload: service.validateStyle
        },
        cors: {
          origin: ['*']
      }
    }
  },
  {
  method: 'PUT',
  path: `/styles/{id}`,
  config: {
    tags: ['api'],
    handler: service.updateStyle,
    cors: {
      origin: ['*']
  },
    validate: {
      headers:
      Joi.object().keys({
        'authorization': Joi.string().required().description('Authorization header containing the JSON Web Token')
      }).options({ allowUnknown: true }),
      payload: service.validateUpdateStyle,
      params: {
          id: Joi.string().min(3)
      }
  }
  }},
  {
    method: 'GET',
    path: `/styles`,
    config: {
      tags: ['api'],
      auth: false,      
      handler: service.getAllStyles,
      cors: {
        origin: ['*']
    }
    },
},
{
  method: 'DELETE',
  path: `/styles/{id}`,
  config: {
    tags: ['api'],
    handler: service.deleteStyle,
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
  }}
]