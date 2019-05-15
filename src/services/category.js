'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var model = require('../models/category.js');


const validateCategory = {
  name: Joi.string().max(100).required(),
  image: Joi.string().max(400).required(),
}

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
};

const getAllCategories = function (req, reply) {
  return new Promise((resolve, reject) => {
    model.getAllCategories(function(err, categories){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({categories: categories }).code(200));
      }});
    });
}

const deleteCategory = function (req, reply) {
 
  return new Promise((resolve, reject) => {
    model.deleteCategory(req.params.id, function(err, category){ 
      console.log("vfdgdf");
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({
          message: "Category successfully deleted",
          id: category._id
      }).code(200));
      }});
    });
};




module.exports = {
  createCategory,
  validateCategory,
  updateCategory,
  getAllCategories,
  deleteCategory
}


