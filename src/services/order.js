'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var model = require('../models/order.js');

const validateOrder = {
    
}

const createOrder = function (req, reply) {
    console.log("fdgv ")
return new Promise((resolve, reject) => {
  model.createOrder(req.payload, function(err, order){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      resolve(reply.response({order: order }).code(200));
    }});
  });
}


module.exports = {
    createOrder,
    validateOrder
}


