'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);
const categorySchema = new Schema({
      name: {
        type: String,
        required: [true, 'name is required']
      },

      image:  {
          type: String,
          require:[true, "image is required"]
      }
});
const CategoryModel = mongoose.model('Category', categorySchema);

const createCategory =  (category) =>  CategoryModel.create(category);

const updateCategory = (id, data, cb) => CategoryModel.findByIdAndUpdate({_id:id}, data, {new : true} , cb);

const getAllCategories = () => CategoryModel.find();

const getCatebyId = (id, cb) => CategoryModel.findById({_id:id},{"image":0}, cb);

const deleteCategory = (id, cb) => CategoryModel.findByIdAndRemove({_id:id}, cb);


module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
  getCatebyId
}