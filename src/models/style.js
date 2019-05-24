'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const styleSchema = new Schema({
      name: {
        type: String,
        required: [true, 'name is required']
      }
});
const StyleModel = mongoose.model('Style', styleSchema);

const createStyle =  (style,cb) =>  StyleModel.create(style,cb);

const updateStyle = (id, data, cb) => StyleModel.findByIdAndUpdate({_id:id}, data, {new : true} , cb);

const getAllStyles = (cb) => StyleModel.find(cb);

const deleteStyle = (id, cb) => StyleModel.findByIdAndRemove({_id:id}, cb);

module.exports = {
  createStyle,
  updateStyle,
  getAllStyles,
  deleteStyle
}