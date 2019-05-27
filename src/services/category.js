'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var model = require('../models/category.js');
var mongoose = require('mongoose');
const empty = require('is-empty');
const validateCategory = {
  name: Joi.string().max(100).required(),
  image: Joi.string().max(400).required()
}

 const validateUpdateCategory = {
  name: Joi.string().max(100).optional(),
  image: Joi.string().max(400).optional()
 }
<<<<<<< HEAD

const createCategory = function (req, reply) {
return new Promise((resolve, reject) => {
  model.createCategory(req.payload, function(err, category){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      resolve(reply.response({category: category }).code(200));
    }});
  });
}

const updateCategory = function (req, reply) {
  return new Promise((resolve, reject) => {
    model.updateCategory(req.params.id, req.payload, function(err, category){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({category: category }).code(200));
      }});
    });
=======
 
const createCategory = async function (req, reply) {
  try {
    const category = model.createCategory(req.payload);
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

>>>>>>> 81d1a989b3d7ff981815f07cb180e662cc40cc24
};

const getAllCategories = async function (req, reply) {
  try {
    const categories = await model.getAllCategories();
    return categories;
  } catch (error) {
    return Boom.badRequest(err);
  }

}

const deleteCategory = async function (req, reply) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw Boom.badRequest("invalid id format!");

    
  return new Promise((resolve, reject) => {
    model.deleteCategory(req.params.id, function(err, category){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        if(empty(category)|| category==null) {
          reject(Boom.badRequest("Category id doesn't exist"));

        } else {
          resolve(reply.response({
            message: "Category successfully deleted",
            id: category._id
        }).code(200));
      }

      }});
    });
};




module.exports = {
  createCategory,
  validateCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
  validateUpdateCategory
}


