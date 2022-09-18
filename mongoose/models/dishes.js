const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dishesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

let Dishes = mongoose.model("Dish", dishesSchema);

module.exports = Dishes;
