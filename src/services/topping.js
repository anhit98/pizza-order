'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var model = require('../models/topping.js');


const validateTopping = {
  name: Joi.string().max(100).required(),
  image: Joi.string().max(400).required()
}
 const validateUpdateTopping = {
  name: Joi.string().max(100).optional(),
  image: Joi.string().max(400).optional()
 }
const createTopping = function (req, reply) {
return new Promise((resolve, reject) => {
  model.createTopping(req.payload, function(err, topping){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      resolve(reply.response({topping: topping }).code(200));
    }});
  });
}


const updateTopping = function (req, reply) {
  return new Promise((resolve, reject) => {
    model.updateTopping(req.params.id, req.payload, function(err, topping){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({topping: topping }).code(200));
      }});
    });
};

const getAllToppings = function (req, reply) {
  return new Promise((resolve, reject) => {
    model.getAllToppings(function(err, toppings){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({toppings: toppings }).code(200));
      }});
    });
}

const deleteTopping = function (req, reply) {
 
  return new Promise((resolve, reject) => {
    model.deleteTopping(req.params.id, function(err, topping){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({
          message: "Topping successfully deleted",
          id: topping._id
      }).code(200));
      }});
    });
};




module.exports = {
  createTopping,
  validateTopping,
  updateTopping,
  getAllToppings,
  deleteTopping,
  validateUpdateTopping
}


