var mongoose = require("mongoose"),
    events = require("./models/event.js"),
    clubs = require("./models/club.js"),
    users = require("./models/user.js");

var data = [
    {
        name : "Semi Formal",
        time: 1/1/2018,
        tags:["#dance","#food","#suitup"],
        location    : ['43.6596° N', '79.3977° W'],
        attendees   : 100,
        foodPresent : true,
        restrictions: false,
        foodItem    : ["Pizza","Soda"],
    }
];

function seedDB(){
    events.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removing Events");
         //add a few campgrounds
        data.forEach(function(seed){
            events.create(seed, function(err, event){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an event");
                    //create a club
                    clubs.create(                             // --------level 1
                        {
                            //add attributes
                        }, function(err, club){
                            if(err){
                                console.log(err);
                            } else {
                                events.clubs.push(club);
                                event.save();
                                console.log("Created new club");
                                users.create({                   // -------- level 2
                                    //put the user details
                                }, function(err, user){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        clubs.users.push(user)
                                        clubs.save();
                                    }
                                })
                            }
                        })
                }
            })
        })
    })
}
    //add a few comments

module.exports = seedDB();