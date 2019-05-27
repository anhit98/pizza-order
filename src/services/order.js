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
  shippingAddress: Joi.string().optional(),
  products: Joi.array().required().items(Joi.object({
    productId: Joi.string().required(),
    styleId: Joi.string().optional(),
    topping: Joi.array().optional(),
    priceId: Joi.string().required(),
    quantity: Joi.number().required(),
    description: Joi.string().optional()
  }).required())
}
const verifyToken = async function (token) {
 if (!token)
 throw Boom.badRequest("No token provided!")
 try {
  const decoded = await jwt.verify(token, publicKEY, { algorithms: ['RS256'] });
  return decoded._id;
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
  try {
    const order = await model.createOrder(data);
    return order;
  } catch (error) {
    return Boom.badRequest(error);
  }
}

const getOrders = async function (req, reply) {
  var customer = {}
    if(req.query.customerId){
      customer = {
        customerId:  mongoose.Types.ObjectId(req.query.customerId)
      }
    }  
    try {
      const orders = await model.getOrders(customer);
      return orders;
    } catch (error) {
      return Boom.badRequest(error);
    }
  }

  const updateOrderStatus = async function (req, reply) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");
    try {
      const order = await model.updateOrderStatus(req.params.id, req.payload);
      return order;
    } catch (error) {
      return Boom.badRequest(error)      
    }
  };
  
module.exports = {
    createOrder,
    validateOrder,
    getOrders,
    updateOrderStatus
}


