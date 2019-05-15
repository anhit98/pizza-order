'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
const fs   = require('fs');
const jwt = require('jsonwebtoken');
var model = require('../models/order.js');
var publicKEY  = fs.readFileSync('public.key', 'utf8');

 const verifyToken = function (token) {
  if (!token)
  return res.status(403).send({ auth: false, message: 'No token provided.' });
  // return decoded._id;
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKEY, { algorithms: ['RS256'] }, function(err, decoded) {
      if(err) reject(Boom.badRequest(err));
      else resolve(decoded.id);
    });
  });
}

const validateOrder = {
  name: Joi.string().max(100).required(),
  fromAddress: Joi.string().max(100).required(),
  toAddress: Joi.string().max(100).required(),
  note: Joi.string(),
  status: Joi.string().valid(["booked", "pending", "in-transit", "complete"]).required()
}

const createBooking = async function (req, reply) {
const token = req.headers.authorization;
// console.log(token,"doanh")
const userId = await verifyToken(token);

return new Promise((resolve, reject) => {
  model.createBooking(req.payload, function(err, booking){ 
    if (err) {
      reject(Boom.badRequest(err));
    } else {
      resolve(reply.response({booking: booking }).code(200));
    }});
  });
}


const updateBooking = async function (req, reply) {
  const token = req.headers.authorization;
  await verifyToken(token);

  return new Promise((resolve, reject) => {
    model.updateBooking(req.params.id, req.payload, function(err, booking){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({booking: booking }).code(200));
      }});
    });
}

const findBookingByStatus = async function (req, reply) {
  const token = req.headers.authorization;
  await verifyToken(token);
  const queryObj = req.query;
  return new Promise((resolve, reject) => {
    model.findBookingByStatus(queryObj, function(err, booking){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({booking: booking }).code(200));
      }});
    });
}

const findBookingById = async function (req, reply) {
  const token = req.headers.authorization;
  await verifyToken(token);
  const _id = req.params.bookingId;
  return new Promise((resolve, reject) => {
    model.findBookingById(_id, function(err, booking){ 
      if (err) {
        reject(Boom.badRequest(err));
      } else {
        resolve(reply.response({booking: booking }).code(200));
      }});
    });
}

module.exports = {
  createBooking,
  // validateSchema,
  updateBooking,
  findBookingByStatus,
  findBookingById
}


