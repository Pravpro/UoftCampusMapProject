var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username    : String,
    password    : String,
    isExec      : Boolean,
    isExecOfClub: {type: mongoose.Schema.Types.ObjectId, ref: "Club"},
    events:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ],
    clubs:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Club"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);