'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var modelProduct = require('../models/product.js');
var async = require('async');
var mongoose = require('mongoose');
var modelPrice = require('../models/price.js');

const validateProduct = {
  name: Joi.string().max(100).required(),
  image: Joi.array().required(),
  categoryId: Joi.string().required(),
  ingredients: Joi.string().required(),
  description: Joi.string().optional(),
  styles: Joi.array().optional(),
  toppings: Joi.array().optional(),
  price: Joi.array().required().items(Joi.object({
    price: Joi.number().required(),
    size: Joi.string().required(),
    description: Joi.string().required()
  }).required())
}
// async function saveAll(priceArr) {
//     console.log(priceArr);
//     const promises = priceArr.map(priceItem => modelPrice.createPrice(priceItem));
//     const responses = await Promise.all(promises);
//     return responses;
// }
const createProduct = async function (req, reply) {
  const priceArr = req.payload.price;
  delete req.payload.price;
    return new Promise((resolve, reject) => {

    modelProduct.createProduct(req.payload, function(err, product){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
              priceArr.forEach(function (item) {
                item.productId = product._id
                
            });
                modelPrice.createPrice(priceArr, function(err,price){ 
                    if (err) {
                        reject(Boom.badRequest(err));
                    }
                        resolve(reply.response([{product: product},{price: price}]).code(200));
                    });
    }});
  });
}

const getProducts = function (req, reply) {
var cate = {}
  if(req.query.categoryId){
    cate = {
      categoryId:  mongoose.Types.ObjectId(req.query.categoryId)
    }
  }
  let pageNo = parseInt(req.query.pageNo);
  let size = parseInt(req.query.size);

  if(pageNo < 0 || pageNo === 0) {
        throw Boom.badRequest("Invalid page number, should start with 1");
  }
    return new Promise((resolve, reject) => {
          modelProduct.countProduct(cate, function(err, totalCount){ 
            if (err) {
              reject(Boom.badRequest(err));
            } else {     
              console.log(totalCount)       
              modelProduct.getProductsByCate(pageNo, size, cate, function(err, products){ 
              if (err) {
                reject(Boom.badRequest(err));
              }
              resolve(reply.response([{products: products }, {pages: Math.ceil(totalCount / size)}]).code(200));
              
        });
      }
    });
  });
}
  const getProductById = async function (req, reply) {
    const id = req.params.id;
      return new Promise((resolve, reject) => {
            modelProduct.getProductsById(id, function(err, product){ 
              console.log(product)
              if (err) {
                reject(Boom.badRequest(err));
              }
              resolve(reply.response({product: product[0]}).code(200));
              });
              
        });
    }

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    validateProduct
}


