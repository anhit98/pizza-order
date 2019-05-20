'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
      name: {
        type: String,
        required: [true, 'name is required']
      }
    
});
const ToppingModel = mongoose.model('Topping', toppingSchema);

// const createTopping =  (topping,cb) =>  ToppingModel.create(topping,cb);

// const updateTopping = (id, data, cb) => StyleTopping.findByIdAndUpdate({_id:id}, data, {new : true} , cb);

// const getAllToppings = (cb) => StyleModel.find(cb);

// const deleteTopping = (id, cb) => StyleModel.findByIdAndRemove({_id:id}, cb);


module.exports = {
  // createStyle,

  // updateStyle,
  // getAllStyles,
  // deleteStyle
}