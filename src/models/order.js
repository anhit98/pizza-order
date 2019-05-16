'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {
        type: Date, 
        default: Date.now
      },
      customer_id: {
        type: String,
        required: [true, 'userId is required']
      },
      
      order: [{
        product_id: String,
        quantity: String
     }],
     
      orderStatus: { 
        type: String,
        required: [true, 'status is required'],
        enum : ['ordered','pending','in-transit','completed'],
        default: 'ordered'
      }
    
});
const OrderModel = mongoose.model('Order', orderSchema);

  const createOrder =  (order,cb) =>  OrderModel.create(order,cb);
  const updateOrder =  (id, data, cb) =>  OrderModel.findByIdAndUpdate({_id:id}, data,{new : true} , cb);
  const findOrderById =  (idOrder, cb) =>  OrderModel.find({_id:idOrder}, cb);
  const findOrderByStatus =  (statusOrder, cb) =>  OrderModel.find(statusOrder, cb);

module.exports = {
  createOrder,
  updateOrder,
  findOrderById,
  findOrderByStatus
}