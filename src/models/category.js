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

const updateCategory = (id, data) => CategoryModel.findByIdAndUpdate({_id:id}, data, {new : true});

const getAllCategories = () => CategoryModel.find();

const getCatebyId = (id) => CategoryModel.findById({_id:id},{"image":0});

const deleteCategory = (id) => CategoryModel.findByIdAndRemove({_id:id});


module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
  getCatebyId
}