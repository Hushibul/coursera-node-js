const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  commtent: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

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
  comments: [commentSchema],
});

let Dishes = mongoose.model("Dish", dishesSchema);

module.exports = Dishes;
