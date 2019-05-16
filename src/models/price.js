'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
      productId: {
        type: String,
        required: [true, 'productId is required']
      },

      price: {
        type: String,
        required: [true, 'price is required']
      },

      size: {
        type: String
        // required: [true, 'size is required']
      },
      topping:{
        type: Array
      },
      description: {
        type: String
      }
     
});

const PriceModel = mongoose.model('Price', priceSchema);

const createPrice =  (price, cb) =>  PriceModel.create(price);

// const updateCategory = (id, data, cb) => CategoryModel.findByIdAndUpdate({_id:id}, data, {new : true} , cb);

// const getAllCategories = (cb) => CategoryModel.find(cb);

// const deleteCategory = (id, cb) => CategoryModel.findByIdAndRemove({_id:id}, cb);


module.exports = {
    createPrice
}