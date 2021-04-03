const express = require("express"),
      router  = express.Router(),
      passport = require("passport"),
      User = require("../models/user"),
      Campground = require("../models/campground"),
      Comment = require("../models/comment");

router.get("/", function(req, res){
	res.render('landing');
});

// AUTH ROUTES

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	let user = new User({username: req.body.username});
	User.register(user, req.body.password, function(err, user){
		if(err){ 
			req.flash("error", err.message);
			res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp! " + user.username);
			res.redirect("/campgrounds");
		})
	});
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"

}),function(req, res){});

router.get("/logout", function(req, res){
	req.logOut();
	req.flash("success", "logged out saccessfully");
	res.redirect("/");
});

module.exports = router;