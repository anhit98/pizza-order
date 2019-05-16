'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

      name: {
        type: String,
        required: [true, 'name is required']
      },

      categoryId: {
        type: String,
        required: [true, 'category-id is required']
      },
      image: {
        type: String,
        required: [true, 'image is required']
      }
     
    
});

const ProductModel = mongoose.model('Product', productSchema);

const createProduct =  (product,cb) =>  ProductModel.create(product,cb);

// const updateCategory = (id, data, cb) => CategoryModel.findByIdAndUpdate({_id:id}, data, {new : true} , cb);

const getAllProducts = (cb) => ProductModel.aggregate([
    { $lookup:
       {
         from: 'prices',
         localField: '_id.toObject()',
         foreignField: 'productId.toObject()',
         as: 'prices'
       }
     }
    ],cb);

// const deleteCategory = (id, cb) => CategoryModel.findByIdAndRemove({_id:id}, cb);


module.exports = {
    createProduct,
    getAllProducts
//   updateCategory,
//   getAllCategories,
//   deleteCategory
}