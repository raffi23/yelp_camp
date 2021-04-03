const middleware = require("../middleware");
const express = require("express"),
      router  = express.Router(),
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment");
// Index - shows all campgrounds
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

// Create - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	const name = req.body.name;
	const image = req.body.image;
	const description = req.body.description;
	const author = {
        id: req.user._id,
        username: req.user.username
	};
	const price = req.body.price;
	const newCampground = {
		title: name,
		image: image,
        description: description,
		author: author,
		price: price
	};
	
	Campground.create(newCampground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// New - form to add new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// Show - shows more info about one campground
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, locatedCamp){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: locatedCamp});
		}
	});
});

// Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) { res.redirect("/campgrounds"); } else {
			res.render("campgrounds/edit", {campground: campground});
		}
	});
});
// Update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, locatedCamp){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect(`/campgrounds/${req.params.id}`)
		}
	});
});

// Destroy
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){

	Campground.findByIdAndRemove(req.params.id, function(err, removedCamp){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			Comment.deleteMany({_id: { $in: removedCamp.comments }}, (err) => {
				if (err) { res.redirect("/campgrounds"); } else {
					res.redirect("/campgrounds");
				}
			});
		}
	});
});

module.exports = router;