const express = require("express");
const bodyParser = require("body-parser");
var authenticate = require('../authenticate');
const cors = require("./cors");

const Favourites = require('../models/favourite');
const Dishes = require('../models/dishes')
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

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favourites);
          } else {
            req.body.user = req.user._id;
            Favourites.create({ user: req.user._id }).then(
              (favourites) => {
                req.body.forEach((element) => {
                  favourites.dishes.push(element._id);
                });
                favourites.save();
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favourites);
              },
              (err) => next(err)
            );
          }
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
    Favourites.findOneAndRemove({ "user": req.user._id })
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      }, (err) => next(err)
      )
      .catch((err) => next(err));
  });


favouriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    console.log("dishId: " + req.params.dishId);
    Favourites.findOne({ user: req.user._id })
      .then((favourite) => {
        if (favourite) {
          //Is dishId part of the favourites?
            var index = favourite.dishes.indexOf(req.params.dishId);
            if (index !== -1) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              Dishes.findById(favourite.dishes[index])
              .then((dish) => {
                res.json(dish);
              })
             
          }
            else {
              var err = new Error(
                "There is no favourite with id" +
                req.params.dishId + "!"
              );
              err.status = 404;
              return next(err);
        }
      }
  })
  .catch((err) => (err));
})
.post(cors.cors, authenticate.verifyUser, (req, res, next) => {
  Favourites.findOne({"user": req.user._id})
  .then((favourite) => {
    //Is dish already in favourite list?
    var index = favourite.dishes.indexOf(req.params.dishId);
    if(index == -1) {
      favourite.dishes.push(req.params.dishId);
      favourite.save()

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(favourite);
    } else {
      res.json(favourite);
    }
  })
  .catch((err) => (err));
})
.delete(cors.cors, authenticate.verifyUser, (req, res, next) => {
  Favourites.findOne({"user": req.user._id})
  .then((favourite) => {
    var index = favourite.dishes.indexOf(req.params.dishId);
    if(index !== -1) {
      favourite.dishes.splice(index, 1);
      favourite.save();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(favourite);
    } else {
      //do nothing
      var err = new Error(
        "No favourite dish with id " +
        req.params.dishId + "to delete!"
      );
      err.status = 404;
      return next(err);
    }
  })
  .catch((err) => (err));
});

module.exports = favouriteRouter;
