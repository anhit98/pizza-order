'use strict';
const Joi = require('joi');
const Boom = require('boom');
var model = require('../models/category.js');
var mongoose = require('mongoose');
const empty = require('is-empty');
const validateCategory = {
  name: Joi.string().max(100).required(),
  image: Joi.string().required()
}
 const validateUpdateCategory = {
  name: Joi.string().max(100).optional(),
  image: Joi.string().optional()
 }

const createCategory = async function (req, reply) {
  try {
    const category = await model.createCategory(req.payload);
    return category;
  } catch (error) {
    return Boom.badRequest(error);
  }
}

const updateCategory = async function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");
  try {
    const category = await model.updateCategory(req.params.id, req.payload);
    return category;
  } catch (error) {
    Boom.badRequest(error);
  }
};

const getAllCategories = async function (req, reply) {
  try {
    const categories = await model.getAllCategories();
    return {categories: categories};
  } catch (error) {
    return Boom.badRequest(error);
  }
}

const deleteCategory = async function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");
  try {
    const category = await model.deleteCategory(req.params.id);
    if(empty(category)|| category==null) {
      return Boom.badRequest("Category id doesn't exist");

    } else {

      return {
        message: "Category successfully deleted",
        id: category._id
    };
  }
  } catch (error) {
    return Boom.badRequest(error);
  }
};

module.exports = {
  createCategory,
  validateCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
  validateUpdateCategory
}