const express = require("express");

const dishRouter = express.Router();

dishRouter.use(express.json());

dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("We will send all the dishes to you!");
  })
  .post((req, res, next) => {
    res.end(
      `We wiil add dishes with name: ${req.body.name} and description: ${req.body.description}`
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT request doesnot support in this format");
  })
  .delete((req, res, next) => {
    res.end("We will delete all the dishes!");
  });

dishRouter
  .route("/:dishId")
  .get((req, res, next) => {
    res.end("We will send you the dish with the id of " + req.params.dishId);
  })
  .post((req, res, next) => {
    res.statusCode = 403;

    res.end("POST request is not supported in this operation");
  })
  .put((req, res, next) => {
    res.end("We will update dish with the id of " + req.params.dishId);
  })
  .delete((req, res, next) => {
    res.end("We will delete the dish with this id " + req.params.dishId);
  });

module.exports = dishRouter;
