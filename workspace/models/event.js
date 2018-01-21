var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    name        : String,
    time        : Date,
    tags        : [String],
    location    : [Number],
    attendees   : Number,
    foodPresent : Boolean,
    restrictions: Boolean,
    foodItem    : [String],
    club        : {type: mongoose.Schema.Types.ObjectId, ref: "Club"}
});

module.exports = mongoose.model("Event", EventSchema);
