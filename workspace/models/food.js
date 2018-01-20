var mongoose = require("mongoose");

var FoodSchema = new mongoose.Schema({
    typeOfFood: String
});

module.exports = mongoose.model("Event", FoodSchema);