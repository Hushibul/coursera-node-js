const express = require("express");

const leaderRoute = express.Router();

leaderRoute.use(express.json());

leaderRoute
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("We will show all the leaders.");
  })
  .post((req, res, next) => {
    res.end(
      `We wiil add leader with name: ${req.body.name} and description: ${req.body.description}`
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT request doesnot support in this operation");
  })
  .delete((req, res, next) => {
    res.end("We will delete all the leaders!");
  });

leaderRoute
  .route("/:leaderId")
  .get((req, res, next) => {
    res.end(
      "We will send you the leader with the id of " + req.params.leaderId
    );
  })
  .post((req, res, next) => {
    res.statusCode = 403;

    res.end("POST request is not supported in this operation");
  })
  .put((req, res, next) => {
    res.end("We will update the leader with the id of " + req.params.leaderId);
  })
  .delete((req, res, next) => {
    res.end("We will delete the leader with this id " + req.params.leaderId);
  });

module.exports = leaderRoute;
