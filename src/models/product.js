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
        type: String,
        required: [true, 'category-id is required']
      },
      image: {
        type: String,
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

const getProductsByCate = (pageNo, size, id, cb) => ProductModel.aggregate([
  {
    $match: 
    {
      categoryId: id
    },
  },

    { $lookup:
       {
         from: 'prices',
         localField: '_id',
         foreignField: 'productId',
         as: 'prices'
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
const countProduct = (id, cb) => ProductModel.find({"categoryId" : id}).count().countDocuments(cb);
module.exports = {
  getProductsByCate,
  getProductsById,
  countProduct
}