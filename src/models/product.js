'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var model = require('../models/price.js');
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
      topping:{
        type: Array
      },
      style: {
        type: Array
      }
     
});

const ProductModel = mongoose.model('Product', productSchema);

const getProductsByCate = (id, cb) => ProductModel.aggregate([
  {
    $match: 
    {
      categoryId: id
    }
  },
    { $lookup:
       {
         from: 'prices',
         localField: '_id',
         foreignField: 'productId',
         as: 'prices'
       }
     }
    ],cb);

// const getProductsByCate = (cb) => model.find(cb);


module.exports = {
  getProductsByCate
}