const middleware = require("../middleware");
const express = require("express"),
      router  = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment = require("../models/comment");

// ===========================================

router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) { console.log(err); } else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// Create Campground
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err) { console.log(err); res.redirect("/campgrounds") } else {
			Comment.create(req.body.comment, function(err, comment){
			if (err) { res.redirect("/campgrounds") } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect(`/campgrounds/${campground._id}`);
				}
			});
		}
	});
});

// Edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, locatedCamp){
		if (err) {
			res.redirect("back");
		} else {
			Comment.findById(req.params.comment_id, function(err, locatedComment){
				if (err) { res.redirect("back"); } else {
					res.render("comments/edit", {campground: locatedCamp, comment: locatedComment});
				}
			})
		}
	});
});

// Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

// Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndDelete(req.params.comment_id, function(err){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

module.exports = router;