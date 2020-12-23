// Requiring necessary npm packages
var express = require("express");
var passport = require("./config/passport");
var session = require("express-session");
//need to require it somewhere in the file for lint to read file
//var mysql = require("mysql");
var PORT = process.env.PORT || 8080;
// Requiring our models for syncing
var db = require("./models");


// Sets up the Express app to handle data parsing
// Static directory
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require("./routes/html-routes.js")(app);
require("./routes/blog-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("http://localhost:" + PORT);
  });
});