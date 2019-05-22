'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var model = require('../models/order.js');

const validateOrder = {
  customerId: Joi.string().required(),
  products: Joi.array().items(Joi.object().required())
}

// const getCustomer = 

const createOrder = function (req, reply) {
  if(req.headers.authorization){
    const token = req.headers.authorization
  }

    return new Promise((resolve, reject) => {
      model.createOrder(req.payload, function(err, order){ 
        if (err) {
          reject(Boom.badRequest(err));
        } else {
          resolve(reply.response({order: order }).code(200));
        }});
      });
}

const getOrders = function (req, reply) {
  var customer = {}
    if(req.query.customerId){
      customer = {
        customerId:  mongoose.Types.ObjectId(req.query.customerId)
      }
    }  
      return new Promise((resolve, reject) => {
        model.getOrders(customer, function(err, orders){ 
                if (err) {
                  reject(Boom.badRequest(err));
                }
                resolve(reply.response({orders: orders }).code(200));
      });
    });
  }

module.exports = {
    createOrder,
    validateOrder,
    getOrders
}


