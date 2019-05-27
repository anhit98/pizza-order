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
const createPrice =  (price) =>  PriceModel.create(price);

const updatePrice = (id, data) => PriceModel.findByIdAndUpdate({_id:id}, data, {new : true} );

const getPrice = (productId) => PriceModel.find(productId);

const deletePrice = (id) => PriceModel.findByIdAndRemove({_id:id});


module.exports = {
  createPrice,
  updatePrice,
  getPrice,
  deletePrice
}