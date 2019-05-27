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
const createStyle = function (req, reply) {
return new Promise((resolve, reject) => {
  model.createStyle(req.payload, function(err, style){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      resolve(reply.response({style: style }).code(200));
    }});
  });
}


const updateStyle = function (req, reply) {
  return new Promise((resolve, reject) => {
    model.updateStyle(req.params.id, req.payload, function(err, style){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({style: style }).code(200));
      }});
    });
};

const getAllStyles = function (req, reply) {
  return new Promise((resolve, reject) => {
    model.getAllStyles(function(err, styles){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({styles: styles }).code(200));
      }});
    });
}

const deleteStyle = function (req, reply) {
 
  return new Promise((resolve, reject) => {
    model.deleteStyle(req.params.id, function(err, style){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        if(empty(style)|| style==null) {
          reject(Boom.badRequest("Style id doesn't exist"));

        } else {
          resolve(reply.response({
            message: "Style successfully deleted",
            id: style._id
        }).code(200));
        }

      }});
    });
};


module.exports = {
  createStyle,
  validateStyle,
  updateStyle,
  getAllStyles,
  deleteStyle,
  validateUpdateStyle
}


