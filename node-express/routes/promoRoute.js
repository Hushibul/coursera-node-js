const express = require("express");

const promoRoute = express.Router();

promoRoute.use(express.json());

promoRoute
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("We will send all the promotions.");
  })
  .post((req, res, next) => {
    res.end(
      `We wiil add promotion with name: ${req.body.name} and description: ${req.body.description}`
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT request doesnot support in this format");
  })
  .delete((req, res, next) => {
    res.end("We will delete all the promotions!");
  });

promoRoute
  .route("/:promotionId")
  .get((req, res, next) => {
    res.end(
      "We will send you the promotion with the id of " + req.params.promotionId
    );
  })
  .post((req, res, next) => {
    res.statusCode = 403;

    res.end("POST request is not supported in this operation");
  })
  .put((req, res, next) => {
    res.end(
      "We will update promotion with the id of " + req.params.promotionId
    );
  })
  .delete((req, res, next) => {
    res.end(
      "We will delete the promotion with this id " + req.params.promotionId
    );
  });

module.exports = promoRoute;
