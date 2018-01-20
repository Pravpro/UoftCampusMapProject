var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    name        : String,
    time        : Date,
    tags        : [String],
    location    : String,
    attendees   : Number,
    foodPresent : Boolean,
    restrictions: Boolean,
    foodItem    : {type: mongoose.Schema.Types.ObjectId, ref: "Food"},
    club        : {type: mongoose.Schema.Types.ObjectId, ref: "Club"}
});

module.exports = mongoose.model("Event", EventSchema);
