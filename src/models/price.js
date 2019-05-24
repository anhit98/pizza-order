'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
      productId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'productId is required']
      },

      price: {
        type: Number,
        required: [true, 'price is required']
      },

      size: {
        type: String
      },

      description: {
        type: String
      }
     
});

const PriceModel = mongoose.model('Price', priceSchema);
const createPrice =  (price,cb) =>  PriceModel.create(price,cb);

const updatePrice = (id, data, cb) => PriceModel.findByIdAndUpdate({_id:id}, data, {new : true} , cb);

const getPrice = (productId, cb) => PriceModel.find(productId, cb);

const deletePrice = (id, cb) => PriceModel.findByIdAndRemove({_id:id}, cb);


module.exports = {
  createPrice,
  updatePrice,
  getPrice,
  deletePrice,
  
}