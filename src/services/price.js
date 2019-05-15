'use strict';
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Boom = require('boom');
var model = require('../models/price.js');

const createPrice = function (req, reply) {
    return new Promise((resolve, reject) => {
    model.createPrice(req.payload, function(err, product){ 
        if (err) {
            reject(Boom.badRequest(err));
        } else {
            resolve(reply.response({product: product }).code(200));
        }});
    });
}



module.exports = {
    createPrice
}


