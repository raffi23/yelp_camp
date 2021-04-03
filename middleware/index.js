const Campground = require("../models/campground"),
      Comment = require("../models/comment");
let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, locatedCamp){
			if(err) {
                req.flash("error", "campground not found");
                res.redirect("back");
            } else {
                if (locatedCamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission.");
                    res.redirect("back");
                }
            }
		})
	} else {
        req.flash("error", "You need to be logged in.");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, locatedComment){
			if (err) {
				res.redirect("back");
			} else {
				if(locatedComment.author.id.equals(req.user.id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
        req.flash("error", "You need to be logged in.");
		res.redirect("/login");
	}
}

module.exports = middlewareObj;