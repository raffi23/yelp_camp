const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  methodOverride = require("method-override"),
	  mongoose = require('mongoose'),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local").Strategy,
	  Campground = require("./models/campground"),
	  Comment = require("./models/comment"),
	  User = require("./models/user"),
	  seedDB = require("./seeds"),
	  flash  = require("connect-flash");

const campgroundRoutes = require("./routes/campgrounds"),
	  commentsRoutes   = require("./routes/comments"),
	  indexRoutes	   = require("./routes/index");
	
mongoose.connect('mongodb+srv://raffi23:2331@cluster0.u47wq.mongodb.net/<dbname>?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
  	useFindAndModify: false,
  	useCreateIndex: true
}).then(function(){
	console.log("connected to DB!")
}).catch(function(err){
	console.log("Error: ", err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`))
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

// PASSPORT CONFIG

app.use(require("express-session")({
	secret: "raffi is best",
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

app.listen(3000, "127.0.0.1", function(){
	console.log('YelpCamp server is listening');
});