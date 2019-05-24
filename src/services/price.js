'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
const model = require('../models/price.js');
const mongoose = require('mongoose');
const modelProduct = require('../models/product.js');
const empty = require('is-empty');
const validatePrice = {
  price: Joi.number().required(),
  size: Joi.string().max(100).optional(),
  description: Joi.string().max(400).optional(),
  productId: Joi.string().max(400).required()
}

 const validateUpdatePrice = {
    price: Joi.number().optional(),
    size: Joi.string().max(100).optional(),
    description: Joi.string().max(400).optional(),
    productId: Joi.string().max(400).optional()
 }
//  const checkIfProductIdExist = async function(id)
const checkIfProductIdExist = function (id) {
    console.log(id);
   return new Promise((resolve, reject) => {
     modelProduct.checkIfProductExist(id, function(err, product) {
       if(err) reject(Boom.badRequest(err));
       else resolve(product);
     });
   });
  }
const createPrice = async function (req, reply) {
if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");    
const checkproId = await checkIfProductIdExist(req.payload.productId);
if(empty(checkproId) )  throw Boom.badRequest("Product id doesn't exist");
return new Promise((resolve, reject) => {
  model.createPrice(req.payload, function(err, price){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      resolve(reply.response({price: price }).code(200));
    }});
  });
}


const updatePrice = function (req, reply) {
if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");       
  return new Promise((resolve, reject) => {
    model.updatePrice(req.params.id, req.payload, function(err, price){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({price: price }).code(200));
      }});
    });
};

const getPrice = async function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.query.productId)) throw Boom.badRequest("invalid id format!");    
  const checkproId = await checkIfProductIdExist(req.query.productId);
  if(empty(checkproId) )  throw Boom.badRequest("Product id doesn't exist");
  let productId = {productId:  mongoose.Types.ObjectId(req.query.productId)}
  return new Promise((resolve, reject) => {
    model.getPrice(productId, function(err, price){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({price: price }).code(200));
      }});
    });
}

const deletePrice = function (req, reply) {
if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");     
  return new Promise((resolve, reject) => {
    model.deletePrice(req.params.id, function(err, price){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
          if(empty(price)|| price==null) {
              reject(Boom.badRequest("Price id doesn't exist"));

            } else {

                resolve(reply.response({
                message: "Price successfully deleted",
                id: price._id
                }).code(200));
            }
      }});
    });
};




module.exports = {
  createPrice,
  validatePrice,
  updatePrice,
  getPrice,
  deletePrice,
  validateUpdatePrice
}


