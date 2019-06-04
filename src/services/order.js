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
  status: Joi.string().valid(["submitted", "processed", "delivered", "cancelled"]).required(),
  shippingAddress: Joi.string().optional(),
  products: Joi.array().required().items(Joi.object({
    productId: Joi.string().required(),
    styleId: Joi.string().optional(),
    topping: Joi.array().optional(),
    priceId: Joi.string().required(),
    quantity: Joi.number().positive().required(),
    description: Joi.string().optional()
  }).required())
}
const verifyToken = async function (token) {
 if (!token)
 throw Boom.badRequest("No token provided!")

  const decoded = await jwt.verify(token, publicKEY, { algorithms: ['RS256'] });
  return decoded.id;

}

const createOrder = async function (req, reply) {
  let userId; 
  const token = req.headers.authorization;
try {
  userId = await verifyToken(token);
} catch (error) {
  return Boom.badRequest("Token expired!")
}

  
  let data = {}
  if(req.payload.shippingAddress){
    data = {
      customerId: userId,
      products: req.payload.products,
      status: req.payload.status,
      shippingAddress: req.payload.shippingAddress
    };
  }  else{
    data = {
      customerId: userId,
      products: req.payload.products,
      status: req.payload.status
    };
  }


  try {
    const order = await model.createOrder(data);
    return order;
  } catch (error) {
    return Boom.badRequest(error);
  }
}

const getOrders = async function (req, reply) {
      let userId; 
      const token = req.headers.authorization;
    try {
      userId = await verifyToken(token);
    } catch (error) {
      return Boom.badRequest("Token expired!")
    }
      const customer = {
        customerId:  mongoose.Types.ObjectId(userId)
    }  
    try {
      const orders = await model.getOrders(customer);
      return orders;
    } catch (error) {
      return Boom.badRequest(error);
    }
  }
  const getOrdersById = async function (req, reply) {

      const id = {
        _id: mongoose.Types.ObjectId(req.params.id)
      }
      try {
        const orders = await model.getOrdersById(id);
        return orders;
      } catch (error) {
        return Boom.badRequest(error);
      }
    }

  const updateOrderStatus = async function (data) {
    if(!mongoose.Types.ObjectId.isValid(data._id)) throw Boom.badRequest("invalid id format!");
    const status = {
      status: data.status
    }
    try {
     
      const order = await model.updateOrderStatus(data._id, status);
      return order;
    } catch (error) {
      return Boom.badRequest(error)      
    }
  };
  
module.exports = {
    createOrder,
    validateOrder,
    getOrders,
    updateOrderStatus,
    getOrdersById
}


