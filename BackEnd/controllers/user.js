const bcrypt = require("bcrypt");
const user = require("../Modules/user");
const jwt = require("jsonwebtoken");
const joi = require("joi");

//get users list by user type id function
exports.getList = (request, response) => {
  const knex = request.app.locals.knex;
  const user_type_id = request.params.userTypeId;
  knex()
    .select(
      "user.*",
      "city.id as user_city_id",
      "city.name as user_city_name",
      "region.name as user_region_name"
    )
    .from("users as user")
    .leftJoin("regions as region", "user.region_id", "region.id")
    .leftJoin("cities as city", "region.city_id", "city.id")
    .where("user.is_deleted", "=", 0)
    .andWhere("user.user_type_id", "=", user_type_id)
    .then((users) => {
      response.status(200).json(users);
    })
    .catch((error) => {
      console.log("catch error: ", error);
      response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });
};

//get users by user id function
exports.getById = (request, response) => {
  const knex = request.app.locals.knex;
  const user_id = request.params.id;
  knex()
    .select(
      "user.*",
      "city.id as user_city_id",
      "city.name as user_city_name",
      "region.name as user_region_name"
    )
    .from("users as user")
    .leftJoin("regions as region", "user.region_id", "region.id")
    .leftJoin("cities as city", "region.city_id", "city.id")
    .where("user.is_deleted", "=", 0)
    .andWhere("user.id", "=", user_id)
    .then((users) => {
      if (users[0]) {
        response.status(200).json(users[0]);
      } else {
        response.status(500).json({
          status: "error",
          msg: "User not found",
        });
      }
    })
    .catch((error) => {
      console.log("catch error: ", error);
      response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });
};
