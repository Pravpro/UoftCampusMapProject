var mongoose = require("mongoose");

var ClubSchema = new mongoose.Schema({
    name        : String,
    description : String,
    execs:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    events:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
});

module.exports = mongoose.model("Club", ClubSchema);