'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var model = require('../models/price.js');
// import
const productSchema = new Schema({

      name: {
        type: String,
        required: [true, 'name is required']
      },
      categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, 'category-id is required']
      },
      image: {
        type: Array,
        required: [true, 'image is required']
      },
      description: {
        type: String
      },
      ingredients: {
        type: String
      },
      toppings:
      {
        type: [{            
          type: Schema.Types.ObjectId,
          ref: "Topping",
         
      }],
      default: undefined
    },
      
      styles:       
      {
        type: [{            
          type: Schema.Types.ObjectId,
          ref: "Style",
         
      }],
      default: undefined
    }
     
});

const ProductModel = mongoose.model('Product', productSchema);

const getProductsByCate = (pageNo, size, cate, cb) => ProductModel.aggregate([
  {
    $match: cate,
  },
    { $lookup:
       {
         from: 'prices',
         localField: '_id',
         foreignField: 'productId',
         as: 'prices'
       }
     },
     { $lookup:
      {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category'
      }
    },
     {
      $project: {
       'toppings': false,
       'styles': false,
       'categoryId':false,
       'description': false,
       'prices.productId':false
      }
     },
     { $skip : size * (pageNo - 1) },
     { $limit : size }
     
    ],cb);

const getProductsById =  (id, cb) =>  ProductModel.aggregate([
  {
    $match: {_id: mongoose.Types.ObjectId(id)}
  },
  { $lookup:
   {
     from: 'prices',
     localField: '_id',
     foreignField: 'productId',
     as: 'prices'
   }
 },
 { $lookup:
  {
    from: 'toppings',
    localField: 'toppings',
    foreignField: '_id',
    as: 'toppings'
  }
},
{ $lookup:
  {
    from: 'styles',
    localField: 'styles',
    foreignField: '_id',
    as: 'styles'
  }
}
  
 ],cb);
 const checkIfProductExist = (id) => ProductModel.findById({_id: mongoose.Types.ObjectId(id)});
const countProduct = (cate) => ProductModel.find(cate).countDocuments();
const createProduct =  (product) =>  ProductModel.create(product);
const updateProduct = (id, data) => ProductModel.findByIdAndUpdate({_id:id}, data, {new : true});
const deleteProduct = (id) => ProductModel.findByIdAndRemove({_id:id});

module.exports = {
  getProductsByCate,
  getProductsById,
  countProduct,
  createProduct,
  checkIfProductExist,
  updateProduct,
  deleteProduct
}