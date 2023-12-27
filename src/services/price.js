'use strict';
const Joi = require('joi');
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

const checkIfProductIdExist = async function (id) {
  try {
    const product = await modelProduct.checkIfProductExist(id);
    return product;
  } catch (error) {
    return Boom.badRequest(error);
  }
}

const createPrice = async function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.payload.productId)) throw Boom.badRequest("invalid id format!");
  const checkproId = await checkIfProductIdExist(req.payload.productId);
  if(empty(checkproId) )  throw Boom.badRequest("Product id doesn't exist");
  try {
    const price = await model.createPrice(req.payload);
    return price;
  } catch (error) {
    return Boom.badRequest(error);
  }
}

const updatePrice = async function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");       
  try {
    const price  =await model.updatePrice(req.params.id, req.payload);
    return price;
  } catch (error) {
    return Boom.badRequest(error);
  }
};

const getPrice = async function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.query.productId)) throw Boom.badRequest("invalid id format!");    
  const checkproId = await checkIfProductIdExist(req.query.productId);
  if(empty(checkproId) )  throw Boom.badRequest("Product id doesn't exist");
  let productId = {productId:  mongoose.Types.ObjectId(req.query.productId)};
  try {
    const price = await model.getPrice(productId);
    return price;
  } catch (error) {
    return Boom.badRequest(error);
  }
}

const deletePrice = async function (req, reply) {
if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");     
try {
    const price = await model.deletePrice(req.params.id);
    if(empty(price)|| price==null) {
      return Boom.badRequest("Price id doesn't exist");
    } else {
      return price;
    }

  } catch (error) {
    return Boom.badRequest(error);
  }
};

module.exports = {
  createPrice,
  validatePrice,
  updatePrice,
  getPrice,
  deletePrice,
  validateUpdatePrice
}


