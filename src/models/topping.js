'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
      name: {
        type: String,
        required: [true, 'name is required']
      },
      image: {
        type: String,
        required: [true, 'image is required']
      },
    
});
const ToppingModel = mongoose.model('Topping', toppingSchema);

const createTopping =  (topping) =>  ToppingModel.create(topping);

const updateTopping = (id, data) => ToppingModel.findByIdAndUpdate({_id:id}, data, {new : true} );

const getAllToppings = () => ToppingModel.find();

const deleteTopping = (id) => ToppingModel.findByIdAndRemove({_id:id});


module.exports = {
  createTopping,
  updateTopping,
  getAllToppings,
  deleteTopping
}