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
  { $lookup:
    {
      from: 'users',
      localField: 'customerId',
      foreignField: '_id',
      as: 'users'
    }
  },
  { $lookup:
    {
      from: 'prices',
      localField: 'products.priceId',
      foreignField: '_id',
      as: 'products.priceId'
    }
  },
  { $lookup:
    {
      from: 'products',
      localField: 'products.productId',
      foreignField: '_id',
      as: 'products.productId'
    },
    
  },

     { $lookup:
      {
        from: 'styles',
        localField: 'products.styleId',
        foreignField: '_id',
        as: 'products.styleId'
      }
    },
    { $lookup:
      {
        from: 'toppings',
        localField: 'products.topping',
        foreignField: '_id',
        as: 'products.topping'
      }
    },
    { $group: {
      _id: "$_id",
      products: { "$push": "$products" }
    }}
    //  {
    //   $project: {
    //    'toppings': false,
    //    'styles': false,
    //    'categoryId':false,
    //    'description': false,
    //    'prices.productId':false
  
    //   }
    //  },
    ],cb);


module.exports = {
  createOrder,
  getOrders
}