'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var modelProduct = require('../models/product.js');
var modelCategory = require('../models/category.js');
var async = require('async');
// var modelPrice = require('../models/price.js');
// const validateCategory = {
//   name: Joi.string().max(100).required(),
//   image: Joi.string().max(400).required(),
// }
// async function saveAll(priceArr) {
//     console.log(priceArr);
//     const promises = priceArr.map(priceItem => modelPrice.createPrice(priceItem));
//     const responses = await Promise.all(promises);
//     return responses;
// }
// const createProduct = async function (req, reply) {
// return new Promise((resolve, reject) => {
//     const data = {
//         "categoryId": req.payload.categoryId,
//         "name": req.payload.name,
//         "image": req.payload.image,
//         "size": req.payload.size
//     }

//     modelProduct.createProduct(data, function(err, product){ 
//     if (err) {
//       reject(Boom.badRequest(err));
//     } else {
//         if(typeof(req.payload.price) === "string" ){
//             return new Promise((resolve, reject) => {
//                 const data = {
//                     price: req.payload.price,
//                     productId: product._id
//                 }
//                 modelPrice.createPrice(data, function(err, product){ 
//                     if (err) {
//                         reject(Boom.badRequest(err));
//                     } else {
//                         resolve(reply.response({product: product }).code(200));
//                     }});
//                 });
//         }
//         else{
//             return new Promise((resolve, reject) => {
//                 const data = {
//                     price: req.payload.price[0].medium,
//                     productId: product._id,
//                     size: "medium"
//                 }
//                 const data1 = {
//                     price: req.payload.price[1].large,
//                     productId: product._id,
//                     size: "large"
//                 }
//                 const save = saveAll([data, data1]);
//                 console.log(save,"fdsfssave")
//                 // resolve(reply.response([{product: product }, {price: save}]).code(200));
//                 });  
//         }
//     //   resolve(reply.response({product: product }).code(200));
//     }});
//   });
// }

const getProductsByCate = function (req, reply) {

  const id = req.params.categoryId;
  let pageNo = parseInt(req.query.pageNo);
  let size = parseInt(req.query.size);

  if(pageNo < 0 || pageNo === 0) {
        throw Boom.badRequest("Invalid page number, should start with 1");
  }
    return new Promise((resolve, reject) => {
        modelCategory.getCatebyId(id, function(err, category){ 
        if (err) {
          reject(Boom.badRequest(err));
        } else {
          modelProduct.countProduct(id, function(err, totalCount){ 
            if (err) {
              reject(Boom.badRequest(err));
            } else {     
              console.log(totalCount)       
              modelProduct.getProductsByCate(pageNo, size, id, function(err, products){ 
              if (err) {
                reject(Boom.badRequest(err));
              }
              resolve(reply.response([{category:category },{products: products }, {pages: Math.ceil(totalCount / size)}]).code(200));
              
        });
      }
    });
        }
  });
  });
}
  const getProductById = async function (req, reply) {
    const id = req.params.id;
      return new Promise((resolve, reject) => {
            modelProduct.getProductsById(id, function(err, product){ 
              if (err) {
                reject(Boom.badRequest(err));
              }
              resolve(reply.response({product: product}).code(200));
              });
              
        });
    }

module.exports = {
    getProductsByCate,
    getProductById
}


