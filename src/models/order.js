'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {
        type: Date, 
        default: Date.now,
      },
      customerId: {
        type: Schema.Types.ObjectId,
        required: [true, 'userId is required']
      },
      products: [{
        productId: {
          type: Schema.Types.ObjectId,
          required: true
        },
        styleId: Schema.Types.ObjectId,
        priceId: {
          type: Schema.Types.ObjectId,
          required: true
        },
        topping: [
          {
            type: Schema.Types.ObjectId,
            ref: "Topping"
          }
        ],
        description: Schema.Types.ObjectId,
        quantity: {
          type: Number,
          required: true
        }
     }]
    
});
const OrderModel = mongoose.model('Order', orderSchema);

  const createOrder =  (order,cb) =>  OrderModel.create(order,cb);
module.exports = {
  createOrder
}