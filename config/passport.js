var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");


passport.use(
  new LocalStrategy(
    {
      usernameField: "username"
    },
    function(username, password, done) {
      db.Author.findOne({
        where: {
          username: username
        }
      }).then(function(dbAuthor) {
        if (!dbAuthor) {
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        else if (!dbAuthor.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        return done(null, dbAuthor);
      });
    }
  )
);

passport.serializeUser(function(Author, cb) {
  cb(null, Author);
});

passport.deserializeUser(function(obj, cb){
  cb(null, obj);
});


module.exports = passport;