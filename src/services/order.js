'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
const fs   = require('fs');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var model = require('../models/order.js');
var publicKEY  = fs.readFileSync('public.key', 'utf8');
const validateOrder = {
  status: Joi.string().valid(["submitted", "processing", "completed", "cancelled"]).required(),
  products: Joi.array().required().items(Joi.object({
    productId: Joi.string().required(),
    styleId: Joi.string().optional(),
    topping: Joi.array().optional(),
    priceId: Joi.string().required(),
    quantity: Joi.number().required()
  }).required())
}
const verifyToken = async function (token) {

 if (!token)
 throw Boom.badRequest("No token provided!")
 try {
  const decoded = await jwt.verify(token, publicKEY, { algorithms: ['RS256'] });
  return decoded;
 } catch (error) {
   return Boom.badRequest(error);
 }
}

const createOrder = async function (req, reply) {
  const token = req.headers.authorization;
  const userId = await verifyToken(token);
  const data = {
    customerId: userId,
    products: req.payload.products,
    status: req.payload.status
  };

    return new Promise((resolve, reject) => {
      model.createOrder(data, function(err, order){ 
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

  const updateOrderStatus = function (req, reply) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");
      return new Promise((resolve, reject) => {
      model.updateOrderStatus(req.params.id, req.payload, function(err, order){ 
        if (err) {
          reject(Boom.badRequest(err));
        } else {
          resolve(reply.response({order: order }).code(200));
        }});
      });
  };
module.exports = {
    createOrder,
    validateOrder,
    getOrders,
    updateOrderStatus
}


