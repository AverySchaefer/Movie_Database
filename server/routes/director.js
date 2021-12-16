const express = require("express");

const directorRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//Find every director
directorRoutes.route("/director").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
      .collection("directors")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//Get a single director by name
directorRoutes.route("/director/:name").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { name: req.params.name };
    db_connect
        .collection("directors")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
});

//Create a new movie item
directorRoutes.route("/director/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        numMovies: req.body.numMovies,
        awarded: req.body.awarded,
    };
    db_connect.collection("directors").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

//Update a movie item, identified by its ID
directorRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
      $set: {
        name: req.body.name,
        numMovies: req.body.numMovies,
        awarded: req.body.awarded,
      },
    };
    db_connect
      .collection("directors")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
});

//Delete a movie item by ID
directorRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("directors").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.status(obj);
    });
});

module.exports = directorRoutes;