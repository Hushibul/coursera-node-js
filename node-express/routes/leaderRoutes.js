const express = require("express");

const leaderRoute = express.Router();

leaderRoute.use(express.json());

const Leaders = require("../models/leaderModel");

//All leaders
leaderRoute
  .route("/")
  .get((req, res, next) => {
    Leaders.find()
      .then((leaders) => {
        res.statusCode = 302;
        res.setHeader("Content-Type", "application/json");
        res.json(leaders);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Leaders.create(req.body)
      .then((leader) => {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT request doesnot support in this operation");
  })
  .delete((req, res, next) => {
    Leaders.remove()
      .then((leaders) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leaders);
      })
      .catch((err) => next(err));
  });

//Leader by specific id
leaderRoute
  .route("/:leaderId")
  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then((leader) => {
        res.statusCode = 302;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;

    res.end("POST request is not supported in this operation");
  })
  .put((req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      { $set: req.body },
      { new: true }
    )
      .then((leader) => {
        req.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
      .then((leader) => {
        req.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch((err) => next(err));
  });

module.exports = leaderRoute;
