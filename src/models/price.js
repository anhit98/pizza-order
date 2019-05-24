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
const createPrice =  (price,cb) =>  PriceModel.insertMany(price,cb);

module.exports = {
    createPrice,
    PriceModel
}