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
  products: Joi.array().required().items(Joi.object({
    productId: Joi.string().required(),
    styleId: Joi.string().optional(),
    topping: Joi.array().optional(),
    priceId: Joi.string().required(),
    quantity: Joi.number().required()
  }).required())
}
const verifyToken = function (token) {
  console.log("token");
 if (!token)
 throw Boom.badRequest("No token provided!")
 // return decoded._id;
 return new Promise((resolve, reject) => {
   jwt.verify(token, publicKEY, { algorithms: ['RS256'] }, function(err, decoded) {
     if(err) reject(Boom.badRequest(err));
     else resolve(decoded.id);
   });
 });
}

const createOrder = async function (req, reply) {
  const token = req.headers.authorization;
  const userId = await verifyToken(token);
  const data = {
    customerId: userId,
    products: req.payload.products
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

module.exports = {
    createOrder,
    validateOrder,
    getOrders
}


