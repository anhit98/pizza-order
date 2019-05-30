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
        required: [true, 'user id is required']
      },
      shippingAddress: {
        type: String
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
  
     }],
     status: {
      type: String,
      required: [true, 'status is required'],
      enum : ['submitted', "processed", "delevered",'cancelled'],
    },
    
});



const OrderModel = mongoose.model('Order', orderSchema);

const createOrder =  (order) =>  OrderModel.create(order);

const getOrders = (customer) => OrderModel.aggregate([
  {
    $match: customer,
  },
  {
    $match: id
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
      as: 'product.product'
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
      "product.product": { "$arrayElemAt": [ "$product.product", 0 ] } ,
      "product.style": { "$arrayElemAt": [ "$product.style", 0 ] } ,
      "product.price": { "$arrayElemAt": [ "$product.price", 0 ] } ,
      "user": { "$arrayElemAt": [ "$user", 0 ] } ,
      "product.quantity": "$products.quantity",
      "product.toppings": "$product.toppings",
      "status":"$status"

  }} ,
    { $group: {
      _id: "$_id",
      customer: { "$first": "$user" },
      products: { $push: "$product" },
      status: {"$first": "$status" }
      
    }},
    { $project: { 
      "products.product.toppings": false,
      "products.product.styles": false

  }} 

    ]);

  const getBestSellerProducts = (cate) => OrderModel.aggregate([

      { $unwind: {
        path: "$products",
        preserveNullAndEmptyArrays: true
    } },
      
      { $lookup:
        {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'product.product'
        }
      },      
      {
        $match: cate
      },

    
      { $lookup:
        {
          from: 'prices',
          localField: 'products.priceId',
          foreignField: '_id',
          as: 'product.price'
        }
      },
        { $project: { 
          "product.product": { "$arrayElemAt": [ "$product.product", 0 ] } ,
          "product.total":{ $multiply: [ { "$arrayElemAt": [ "$product.price.price", 0 ] }, "$products.quantity" ] }
    
      }} ,
        { $group: {
          _id: "$_id",
          products: { $push: "$product" }          
        }},
  

      { $unwind: "$products"},
      { $lookup:
        {
          from: 'toppings',
          localField: 'products.product.toppings',
          foreignField: '_id',
          as: 'products.product.toppings'
        }
      }  ,
      { $lookup:
        {
          from: 'styles',
          localField: 'products.product.styles',
          foreignField: '_id',
          as: 'products.product.styles'
        }
      }  ,
      { $lookup:
        {
          from: 'prices',
          localField: 'products.product._id',
          foreignField: 'productId',
          as: 'products.product.prices'
        }
      }  ,
      { $group: {
        _id: "$products.product",
        totalSales : { $sum : "$products.total" }
      }},
      { $sort : { totalSales : -1 } },
      { $limit : 5 }
        ]);

  const updateOrderStatus = (id, data) => OrderModel.findByIdAndUpdate({_id:id}, data, {new : true});

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  getBestSellerProducts
}