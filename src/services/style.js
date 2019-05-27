'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var model = require('../models/style.js');


const validateStyle = {
  name: Joi.string().max(100).required()
}
 const validateUpdateStyle = {
  name: Joi.string().max(100).optional()
 }
const createStyle = async function (req, reply) {
  try {
    const style = await model.createStyle(req.payload);
    return style;
  } catch (error) {
    Boom.badRequest(error);
  }
}


const updateStyle = async function (req, reply) {
  try {
    const style = await model.updateStyle(req.params.id, req.payload);
    return style;
  } catch (error) {
    Boom.badRequest(error);
  }

};

const getAllStyles = async function (req, reply) {
  const styles = await model.getAllStyles();
  return styles;

}

const deleteStyle = async function (req, reply) {
 try {
   const style = await model.deleteStyle(req.params.id);
   if(empty(style)|| style==null) {
    return Boom.badRequest("Style id doesn't exist");

  } else {
    return style;
  }
   
 } catch (error) {
  Boom.badRequest(error);
 }
};


module.exports = {
  createStyle,
  validateStyle,
  updateStyle,
  getAllStyles,
  deleteStyle,
  validateUpdateStyle
}


