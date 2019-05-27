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

const createStyle =  (style) =>  StyleModel.create(style);

const updateStyle = (id, data) => StyleModel.findByIdAndUpdate({_id:id}, data, {new : true});

const getAllStyles = () => StyleModel.find();

const deleteStyle = (id) => StyleModel.findByIdAndRemove({_id:id});

module.exports = {
  createStyle,
  updateStyle,
  getAllStyles,
  deleteStyle
}