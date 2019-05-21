'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var model = require('../models/price.js');
// import
const productSchema = new Schema({

      name: {
        type: String,
        required: [true, 'name is required']
      },
      categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, 'category-id is required']
      },
      image: {
        type: Array,
        required: [true, 'image is required']
      },
      description: {
        type: String
      },
      ingredients:{
        type: String
      },
      toppings:[
        {
          type: Schema.Types.ObjectId,
          ref: "Topping"
      }
      ],
      styles: [
        {
          type: Schema.Types.ObjectId,
          ref: "Style"
      }
      ]
     
});

const ProductModel = mongoose.model('Product', productSchema);

const getProductsByCate = (pageNo, size, cate, cb) => ProductModel.aggregate([
  {
    $match: cate,
  },
    { $lookup:
       {
         from: 'prices',
         localField: '_id',
         foreignField: 'productId',
         as: 'prices'
       }
     },
     { $lookup:
      {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category'
      }
    },
     {
      $project: {
       'toppings': false,
       'styles': false,
       'categoryId':false,
       'description': false,
       'prices.productId':false
  
      }
     },
     { $skip : size * (pageNo - 1) },
     { $limit : size }
     
    ],cb);

const getProductsById =  (id, cb) =>  ProductModel.findById({_id: id}).populate('toppings').populate('styles').exec(cb);
const countProduct = (cate, cb) => ProductModel.find(cate).countDocuments(cb);
module.exports = {
  getProductsByCate,
  getProductsById,
  countProduct
}