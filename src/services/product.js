'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var modelProduct = require('../models/product.js');
var async = require('async');
var mongoose = require('mongoose');
var modelPrice = require('../models/price.js');
var modelOrder = require('../models/order.js');
const empty = require('is-empty');

const validateProduct = {
  name: Joi.string().max(100).required(),
  image: Joi.array().required(),
  categoryId: Joi.string().required(),
  ingredients: Joi.string().required(),
  description: Joi.string().optional(),
  styles: Joi.array().optional(),
  toppings: Joi.array().optional()
}
const validateUpdateProduct = {
  name: Joi.string().max(100).optional(),
  image: Joi.array().optional(),
  categoryId: Joi.string().optional(),
  ingredients: Joi.string().optional(),
  description: Joi.string().optional(),
  styles: Joi.array().optional(),
  toppings: Joi.array().optional()
}

const createProduct = async function (req, reply) {
    return new Promise((resolve, reject) => {
    modelProduct.createProduct(req.payload, function(err, product){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      resolve(reply.response({product: product }).code(200));
    }});
  });
}

const updateProduct = function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");
    return new Promise((resolve, reject) => {
    modelProduct.updateProduct(req.params.id, req.payload, function(err, product){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({product: product }).code(200));
      }});
    });
};

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
    const checkIfPriceDeleted = function (id) {
      let productId = {productId:  mongoose.Types.ObjectId(id)}
      return new Promise((resolve, reject) => {
        modelPrice.getPrice(productId, function(err, price){ 
          if (err) {
            reject(Boom.badRequest(err));
          } else {
            resolve(price);
          }});
        });
    }
    const deleteProduct = async function (req, reply) {
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");
      const isPriceDeleted = await checkIfPriceDeleted(req.params.id);
      if(isPriceDeleted.length) throw Boom.badRequest("Please delete all price of the product!");
      return new Promise((resolve, reject) => {
        modelProduct.deleteProduct(req.params.id, function(err, product){ 
          if (err) {
            reject(Boom.badRequest(err));
          } else {
            if(empty(product)|| product==null) {
              reject(Boom.badRequest("Product id doesn't exist"));
    
            } else {
              resolve(reply.response({
                message: "Product successfully deleted",
                id: product._id
            }).code(200));
          }
    
          }});
        });
    };

    const getBestSellersProducts = function (req, reply) {
          const categoryId =  mongoose.Types.ObjectId(req.query.categoryId)
          return new Promise((resolve, reject) => {
                  modelOrder.getBestSellerProducts(categoryId, function(err, products){ 
                    if (err) {
                      reject(Boom.badRequest(err));
                    }
                    resolve(reply.response({products: products }).code(200));
                    
          });
        });
      }

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    validateProduct,
    updateProduct,
    validateUpdateProduct,
    deleteProduct,
    getBestSellersProducts

}


