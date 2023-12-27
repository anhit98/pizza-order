'use strict';
const Joi = require('joi');
const Boom = require('boom');
var model = require('../models/topping.js');
const empty = require('is-empty');

const validateTopping = {
  name: Joi.string().max(100).required(),
  image: Joi.string().required()
}

 const validateUpdateTopping = {
  name: Joi.string().max(100).optional(),
  image: Joi.string().optional()
}

const createTopping = async function (req, reply) {
  try {
    const topping = await model.createTopping(req.payload);
    return topping;
  } catch (error) {
    return Boom.badRequest(error);
  }
}

const updateTopping = async function (req, reply) {
  try {
    const topping = await model.updateTopping(req.params.id, req.payload);
    return topping;
  } catch (error) {
    return Boom.badRequest(error);
  }
};

const getAllToppings = async function (req, reply) {
  try {
    const toppings = await model.getAllToppings();
    return toppings;
  } catch (error) {
    return Boom.badRequest(error);    
  }

}

const deleteTopping = async function (req, reject) {
  try {
    const topping = await model.deleteTopping(req.params.id);
    if(empty(topping)|| topping==null) {
      reject(Boom.badRequest("Topping id doesn't exist"));
    } else {
      return {
        message: "Topping successfully deleted",
        id: topping._id
    };
    }
  } catch (error) {
    return Boom.badRequest(error);    
  }
};

module.exports = {
  createTopping,
  validateTopping,
  updateTopping,
  getAllToppings,
  deleteTopping,
  validateUpdateTopping
}


