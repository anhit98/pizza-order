'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
const fs   = require('fs');
var model = require('../models/order.js');
var publicKEY  = fs.readFileSync('public.key', 'utf8');
const validateOrder = {
  customerId: Joi.string().required(),
  products: Joi.array().items(Joi.object().required()),
}
const verifyToken = function (token) {
  console.log("token");
 if (!token)
 return res.status(403).send({ auth: false, message: 'No token provided.' });
 // return decoded._id;
 return new Promise((resolve, reject) => {
   jwt.verify(token, publicKEY, { algorithms: ['RS256'] }, function(err, decoded) {
     if(err) reject(Boom.badRequest(err));
     else resolve(decoded.id);
   });
 });
}
// const getCustomer = 

<<<<<<< HEAD
const createOrder = function (req, reply) {
  if(req.headers.authorization){
    const token = req.headers.authorization
  }
=======
const createOrder = async function (req, reply) {
  const token = req.headers.authorization;
  const userId = await verifyToken(token);
  const data = {
    customerId: userId,
    products: req.payload.products
  };

>>>>>>> 3f6629963db6868f598fb7b5f30dd3ace12bd919
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


