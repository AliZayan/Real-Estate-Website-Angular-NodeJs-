const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");

//get cities function
exports.getCities = (request, response) => {
  const knex = request.app.locals.knex;
  knex("cities")
    .then((result) => {
      if (result != null) {
        response.status(200).json(result);
      } else {
        response.status(404).json({
          status: "error",
          msg: "no cities",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
        exception: error,
      });
    });
};

//get features function
exports.getFeatures = (request, response) => {
  const knex = request.app.locals.knex;
  knex("features")
    .then((result) => {
      if (result != null) {
        response.status(200).json(result);
      } else {
        response.status(404).json({
          status: "error",
          msg: "no features",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
        exception: error,
      });
    });
};

//get property categories function
exports.getPropertyCategories = (request, response) => {
  const knex = request.app.locals.knex;
  knex("property_categories")
    .then((result) => {
      if (result != null) {
        response.status(200).json(result);
      } else {
        response.status(404).json({
          status: "error",
          msg: "no property categories",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
        exception: error,
      });
    });
};

//get user types function
exports.getUserTypes = (request, response) => {
  const knex = request.app.locals.knex;
  knex("user_types")
    .then((result) => {
      if (result != null) {
        response.status(200).json(result);
      } else {
        response.status(404).json({
          status: "error",
          msg: "no user types",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
        exception: error,
      });
    });
};

//get property statuses function
exports.getPropertyStatuses = (request, response) => {
  const knex = request.app.locals.knex;
  knex("property_statuses")
    .then((result) => {
      if (result != null) {
        response.status(200).json(result);
      } else {
        response.status(404).json({
          status: "error",
          msg: "no property status",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
        exception: error,
      });
    });
};

//get regions by city id function
exports.getRegionsByCityId = (request, response) => {
  const cityId = request.params.id;
  console.log(cityId);
  const knex = request.app.locals.knex;
  knex("regions")
    .where("city_id", "=", cityId)
    .then((result) => {
      if (result != null) {
        response.status(200).json(result);
      } else {
        response.status(404).json({
          status: "error",
          msg: "no regions",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
        exception: error,
      });
    });
};
