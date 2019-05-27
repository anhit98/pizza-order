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
     try {
      const product = await modelProduct.createProduct(req.payload);
      return product;
     } catch (error) {
      return Boom.badRequest(error);
     }
}

const updateProduct = async function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");
  try {
      const updatedProduct = await updateProduct(req.params.id, req.payload);
      return updatedProduct;
  } catch (error) {
      return Boom.badRequest(err);
  }
};

const getProducts = async function (req, reply) {
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
          try {
            const totalCount = await countProduct(cate);
            const products = await getProductsByCate(pageNo, size, cate);
            const result = [{products: products }, {pages: Math.ceil(totalCount / size)}];
            return result;
          } catch (error) {
            return Boom.badRequest(error);
          }
}

  const getProductById = async function (req, reply) {
    const id = req.params.id;
    try {
      const product = modelProduct.getProductsById(id);

      return {product: product[0]};
    } catch (error) {
      return Boom.badRequest(error);
    }

    }


    const checkIfPriceDeleted = async function (id) {
      let productId = {productId:  mongoose.Types.ObjectId(id)};
      try {
        const price = await modelPrice.getPrice(productId);
        return price;
      } catch (error) {
        return Boom.badRequest(err);
      }
    }

    const deleteProduct = async function (req, reply) {
      if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");
      const isPriceDeleted = await checkIfPriceDeleted(req.params.id);
      if(isPriceDeleted.length) throw Boom.badRequest("Please delete all price of the product!");
      const product = await modelProduct.deleteProduct(req.params.id);          
      try {
        if(empty(product)|| product==null) {
          return Boom.badRequest("Product id doesn't exist");

        } else {
          const result = {
            message: "Product successfully deleted",
            id: product._id
        };
          return result;
      }
        
      } catch (error) {
        return Boom.badRequest(err);
      }
    };

    const getBestSellersProducts = async function (req, reply) {
          const categoryId =  mongoose.Types.ObjectId(req.query.categoryId);
          try {
            const bestSellerProducts = modelOrder.getBestSellerProducts(categoryId);
            return bestSellerProducts;
          } catch (error) {
              return Boom.badRequest(error);
          }
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


