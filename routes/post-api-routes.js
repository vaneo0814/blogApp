var db = require("../models");

module.exports = function(app) {

  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }


    db.Post.findAll({
      where: query,
      include: [db.Author]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });


  app.get("/api/posts/:authorId", function(req, res) {

    db.Post.findAll({
      include: {
        model:db.Author,
        where: {
          id: req.params.authorId
        }
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/specific-post/:id", function(req, res) {

    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });


  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });


  app.put("/api/posts/:id", function(req, res) {
    db.Post.update(
      {
        title:req.body.title,
        body: req.body.body
      },
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
