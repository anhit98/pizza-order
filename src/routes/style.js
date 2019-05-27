
const service = require('../services/style.js');
const Joi = require('joi');

module.exports =[ {
    method: 'POST',
    path: '/styles',
    config: {
      tags: ['api'],
      auth: false,
      handler: service.createStyle,
      validate: {
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
    auth: false,    
    handler: service.updateStyle,
    cors: {
      origin: ['*']
  },
    validate: {
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
        auth: false,        
        handler: service.deleteStyle,
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