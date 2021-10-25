const express = require("express");
const bodyParser = require("body-parser");
var authenticate = require('../authenticate');
const cors = require("./cors");

const Favourites = require('../models/favourite');

const favouriteRouter = express.Router();

favouriteRouter.use(express.json());

favouriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({ user: req.user._id })
      .populate("user")
      .populate("dishes")
      .then(
        (favourites) => {
          // filter the favourites that match the req.user._id
          if (favourites) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favourites);
          } else {
            var err = new Error(
              "There are no favourites list for user with username " +
                req.user.username
            );
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({ user: req.user._id })
    .populate("user")
    .populate("dishes")
      .then(
        (favourites) => {
          if (favourites) {
            req.body.forEach((element) => {
              var index = favourites.dishes.indexOf(element._id);
              if (index == -1) {
                favourites.dishes.push(element._id);
              }
            });
            favourites.save();
          } else {
            req.body.user = req.user._id;
            Favourites.create({ user: req.user._id }).then(
              (favourites) => {
                req.body.forEach((element) => {
                  favourites.dishes.push(element);
                });
                favourites.save();
              },
              (err) => next(err)
            );
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favourites);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favourites");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOneAndRemove({"user": req.user._id})
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(resp);
    }, (err) => next(err)
    )
    .catch((err) => next(err));
  });

module.exports = favouriteRouter;
