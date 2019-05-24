'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {
        type: Date, 
        default: Date.now
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
        styleId: {
          type: Schema.Types.ObjectId,
          ref: "Style"
        },
        priceId: {
          type: Schema.Types.ObjectId,
          required: true
        },
        topping: 
        {
          type: [{            
            type: Schema.Types.ObjectId,
            ref: "Topping"
           
        }],
        default: undefined
      },
        description: String,
        quantity: {
          type: Number,
          required: true
        }
     }]
    
});



const OrderModel = mongoose.model('Order', orderSchema);

const createOrder =  (order,cb) =>  OrderModel.create(order,cb);

const getOrders = (customer, cb) => OrderModel.aggregate([
  {
    $match: customer,
  },
  { $unwind: {
    path: "$products",
    preserveNullAndEmptyArrays: true
} },
  
  { $lookup:
    {
      from: 'users',
      localField: 'customerId',
      foreignField: '_id',
      as: 'user'
    }
  },
  { $lookup:
    {
      from: 'products',
      localField: 'products.productId',
      foreignField: '_id',
      as: 'product.data'
    }
    
  },

  { $lookup:
    {
      from: 'prices',
      localField: 'products.priceId',
      foreignField: '_id',
      as: 'product.price'
    }
  },

     { $lookup:
      {
        from: 'styles',
        localField: 'products.styleId',
        foreignField: '_id',
        as: 'product.style'
      }
    },
    { $lookup:
      {
        from: 'toppings',
        localField: 'products.topping',
        foreignField: '_id',
        as: 'product.toppings'
      }
    },
    { $project: { 
      "product.data": { "$arrayElemAt": [ "$product.data", 0 ] } ,
      "product.style": { "$arrayElemAt": [ "$product.style", 0 ] } ,
      "product.price": { "$arrayElemAt": [ "$product.price", 0 ] } ,
      "product.toppings": 4
  }} ,
    { $group: {
      _id: "$_id",
      products: { $push: "$product"  }
      
    }}

    ],cb);


module.exports = {
  createOrder,
  getOrders
}