var path = require("path");

var authenticate = require("../config/middleware/authenticate");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/viewblogs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //authenticate is used to restrict the user from viewing this page unless signed in
  app.get("/createblog", authenticate, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blogCreate.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signUp.html"));
  });


  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    //res.end();
  });


  app.get("/userblog", authenticate, function (req, res) {

    res.sendFile(path.join(__dirname, "../public/userblog.html"));
  });


};