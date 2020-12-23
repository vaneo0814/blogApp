var db = require("../models");

module.exports = function(app) {
  app.get("/api/authors", function(req, res) {
    db.Author.findAll({
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/authors/:id", function(req, res) {

    db.Author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });


  app.post("/api/authors", function(req, res) {
    db.Author.create(req.body).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/createblog", function(req, res) {

    console.log(req.body);

    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      AuthorId: req.body.AuthorId
    }).then(function(dbAuthor){
      res.json(dbAuthor);
      // res.redirect(307, "/").catch(function(err){
      //   res.status(401).json(err);
      // });
    });
  });

};


