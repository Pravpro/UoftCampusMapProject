var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    jQuery = require("jquery");
    // ajax_request = require("ajax-request");
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req,res){
    res.render("../views/index");
});

app.get("/event", function(req,res){
    res.render("../views/card");
});


app.listen(process.env.PORT || 3000, function(){
   console.log("Working");
});