var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Events          = require("./models/event"),
    clubs           = require("./models/club"),
    dateformat      = require("dateformat"),
    methodOverride = require("method-override");
    // seedDB      = require("./seeds");
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Connected a database
var url = "mongodb://localhost/uoftclubs";
mongoose.connect(url);


app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.clubs = req.user.Club;
   next();
});

app.get("/", function(req,res){
    res.render("../views/index", {currentUser: req.user});
});

app.get("/events", function(req,res){
    Events.find({}, function(err, allEvents) {
        // res.render("../views/card", {events: allEvents});
        if(err){
            console.log(err);
        } else {
            console.log("Messages sent!");
            res.send(allEvents);
        }
    });
});

// The login page route and logic routes
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }));

// The sign up page route and logic routes
app.get("/register", function(req, res) {
    res.render("register");
});

// Need to update isExecofCLub
app.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username, isExec: false, events: [ ], clubs: [ ]});
   User.register(newUser, req.body.password, function(err, user) {
       if (err) {
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function() { //this line will call the serializer and deserializer method of passport.
           res.redirect("/");
       });
   });
});

// This route is responsible for changing a users account to an exec account
// Pre-req: Recieves student id, club name
app.post("/user/:id/update", function(req, res) {
    console.log(req.params.id);
    User.findByIdAndUpdate(req.params.id, {$set: {isExec: true}} , {new: true}, function(err, user) {
        user.save();
    });
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

// events create page (get, post)
app.get("/new", function(req, res) {
    console.log(clubs);
    res.render("Event/new",{currentUser: req.user});
    
});

app.post("/events", function(req, res) {
      // get data from form and add to campgrounds array
    var name = req.body.name;
    var location = req.body.location.split(', ');
    var lat = location[0];
    var long = location[1];
    var tags = req.body.tags.split(', ');
    if (req.body.foodPresent == 'on') {
        var foodPresent = true;
    } else {
        var foodPresent = false;
    }
    if (req.body.restrictions == "on") {
        var restrictions = true;
    } else {
        var restrictions = false;
    }
    var time = new Date();
    var newEvent = {name: name, time: time, tags: tags, location: [lat, long], foodPresent: foodPresent, restrictions: restrictions} //missing clubname, fooditem, attendes, 
    console.log(newEvent);
    Events.create(newEvent, function(err, newlyCreated) {
        res.redirect("/");
    });
});

app.listen(process.env.PORT || 3000, function(){
   console.log("Working");
});