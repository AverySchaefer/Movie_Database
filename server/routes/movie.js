const express = require("express");

const movieRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//Find every movie
movieRoutes.route("/movie").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
      .collection("movies")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//Get a single movie by ID
movieRoutes.route("/movie/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("movies")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
});

//Get all movies better than a specific score
movieRoutes.route("/movie/:score").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { score: {$gt: req.params.score} };
  db_connect
      .collection("movies")
      .find(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

//Get a single movie by name
movieRoutes.route("/movie/:name").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.name };
  db_connect
      .collection("movies")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

//Get a total count of all movies with each score
movieRoutes.route("/movieByScore").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
      .collection("movies")
      .aggregate({$group: {_id: "$score", totalMovies: {$sum: 1}}}, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

//Get all movies by directors that are awarded
movieRoutes.route("/awardedMovies").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
      .collection("movies")
      .aggregate({
        $lookup: {
            from: "directors", 
            localField: "movies.dirBy",
            foreignField: "name",
            as: "directedMovies" },
        $match: {awarded: true},
      }, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

//Create a new movie item
movieRoutes.route("/movie/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      dirBy: req.body.dirBy,
      year: req.body.year,
      format: req.body.format,
      seen: req.body.seen,
      score: req.body.score,
      genre: req.body.genre,
    };
    db_connect.collection("movies").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

//Update a movie item, identified by its ID
movieRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
      $set: {
        name: req.body.name,
        dirBy: req.body.dirBy,
        year: req.body.year,
        format: req.body.format,
        seen: req.body.seen,
        score: req.body.score,
        genre: req.body.genre,
      },
    };
    db_connect
      .collection("movies")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
});

//Delete a movie item by ID
movieRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("movies").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.status(obj);
    });
});

module.exports = movieRoutes;