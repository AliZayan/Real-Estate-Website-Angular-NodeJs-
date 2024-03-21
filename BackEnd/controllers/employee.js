const bcrypt = require("bcrypt");
const { response } = require("express");
const { request } = require("http");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const user = require("../Modules/user");

//add employee function
exports.addEmployee = (request, response) => {
  const knex = request.app.locals.knex;

  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;
  const password = request.body.password;
  const phone = request.body.phone;
  const address = request.body.address;
  const user_type_id = 3;
  const region_id = request.body.region_id;
  const gender = request.body.gender;
  const prof_img="uploads/Employee.jpg";

  if (
    !user_type_id ||
    !first_name ||
    !last_name ||
    !gender ||
    !email ||
    !password ||
    !phone
  ) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  const employeeObject = new user(
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    undefined,
    undefined,
    user_type_id,
    region_id,
    gender
  );

  const employeeSchema = joi.object({
    gender: joi
      .string()
      .not()
      .empty()
      .min(1)
      .max(6)
      .pattern(/["male","female","Male","Female","M","F"]/)
      .required(),
    phone: joi
      .string()
      .pattern(/[0-9]{11}/)
      .required(),
    first_name: joi
      .string()
      .not()
      .min(3)
      .max(50)
      .pattern(/[a-z A-Z]{3,50}/)
      .required(),
    last_name: joi
      .string()
      .not()
      .min(3)
      .max(50)
      .pattern(/[a-z A-Z]{3,50}/)
      .required(),
    email: joi.string().email().min(6).max(60).required(),
    password: joi.string().min(5).max(15).required(),
    address: joi.string().min(1).max(100).required(),
    user_type_id: joi.number().required(),
    region_id: joi.number().required(),
    profile_image_url: joi.alternatives().try(joi.number(), joi.string()),
    id_card_image_url: joi.alternatives().try(joi.number(), joi.string()),
  });

  const joiError = employeeSchema.validate(employeeObject);
  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }
  bcrypt.hash(password, 9, function (err, hash) {
    if (err) {
      console.log(err);
    }
    employeeObject.password = hash;

    knex("users")
      .insert({
        first_name: employeeObject.first_name,
        last_name: employeeObject.last_name,
        email: employeeObject.email,
        password: employeeObject.password,
        phone: employeeObject.phone,
        address: employeeObject.address,
        user_type_id: employeeObject.user_type_id,
        region_id: employeeObject.region_id,
        is_deleted: 0,
        gender: employeeObject.gender,
        created_at: new Date(),
        profile_image_url: prof_img,
      })
      .then((data) => {
        employeeObject.hashedPassword = undefined;
        response.status(201).json({
          status: "ok",
          msg: "Created",
          result: employeeObject,
        });
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          status: "error",
          exception: error,
          msg: "500 Internal Server Error",
        });
      });
  });
};

// Edit employee Function
exports.editEmployee = (request, response) => {
  const knex = request.app.locals.knex;
  const user_id = request.params.id;


  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const phone = request.body.phone;
  const address = request.body.address;
  const user_type_id = 3;
  const region_id = request.body.region_id;
  const gender = request.body.gender;
  const prof_img="uploads/Employee.jpg";
  if (!user_type_id || !first_name || !last_name || !gender || !phone) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  const employeeObject = new user(
    first_name,
    last_name,
    undefined,
    undefined,
    phone,
    address,
    undefined,
    undefined,
    user_type_id,
    region_id,
    gender
  );

  const employeeSchema = joi.object({
    gender: joi
      .string()
      .not()
      .empty()
      .min(1)
      .max(6)
      .pattern(/["male","female","Male","Female","M","F"]/)
      .required(),
    phone: joi
      .string()
      .pattern(/[0-9]{11}/)
      .required(),
    first_name: joi
      .string()
      .not()
      .min(3)
      .max(50)
      .pattern(/[a-z A-Z]{3,50}/)
      .required(),
    last_name: joi
      .string()
      .not()
      .min(3)
      .max(50)
      .pattern(/[a-z A-Z]{3,50}/)
      .required(),
    email: joi.alternatives().try(joi.string()),
    password: joi.alternatives().try(joi.string()),
    address: joi.string().min(1).max(100).required(),
    user_type_id: joi.number().required(),
    region_id: joi.number().required(),
    profile_image_url: joi.alternatives().try(joi.number(), joi.string()),
    id_card_image_url: joi.alternatives().try(joi.number(), joi.string()),
  });

  const joiError = employeeSchema.validate(employeeObject);
  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }
  if (tokenPayload.userTypeId === 3) {
    knex("users")
      .where("id", "=", user_id)
      .andWhere("user_type_id", "=", user_type_id)
      .update({
        first_name: employeeObject.first_name,
        last_name: employeeObject.last_name,
        phone: employeeObject.phone,
        address: employeeObject.address,
        region_id: employeeObject.region_id,
        is_deleted: 0,
        gender: employeeObject.gender,
        profile_image_url: prof_img,
      })
      .then((user) => {
        if (user != 0) {
          response.status(200).json({
            status: "ok",
            msg: "employee updated successfully",
          });
        } else {
          response.status(404).json({
            status: "error",
            msg: "employee not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  } else {
    response.status(400).json({
      status: "error",
      msg: "you have no access to perform this action",
    });
  }
};

// Delete Employee Function
exports.deleteEmployee = (request, response) => {
  const knex = request.app.locals.knex;

  const user_id = request.params.id;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  if (tokenPayload.userTypeId === 3) {
    knex("users")
      .where("id", "=", user_id)
      .andWhere("user_type_id", "=", 3)
      .update({
        is_deleted: 1,
      })
      .then((data) => {
        console.log("data: ", data);
        if (data !== 0) {
          var deletePropertyPromise = knex("properties")
            .where("created_by", "=", user_id)
            .update({ is_deleted: 1 });

          var deletePropertyUserFavorites = knex("user_favorites")
            .where("user_id", "=", user_id)
            .update({ is_deleted: 1 });

          Promise.all([deletePropertyPromise, deletePropertyUserFavorites])
            .then((promiseData) => {
              console.log("promiseData:", promiseData);
              response.status(200).json({
                status: "ok",
                msg: "employee deleted successfully",
              });
            })
            .catch((error) => {
              console.log(error);
              response.status(500).json({
                status: "error",
                exception: error,
                msg: "500 Internal Server Error",
              });
            });
        } else {
          response.status(400).json({
            status: "error",
            msg: "employee not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          status: "error",
          exception: error,
          msg: "500 Internal Server Error",
        });
      });
  } else {
    response.status(400).json({
      status: "error",
      msg: "you have no access to perform this action",
    });
  }
};

//edit current employee fumction
exports.editCurrentEmployee = (request, response) => {
  const knex = request.app.locals.knex;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const phone = request.body.phone;
  const address = request.body.address;
  const user_type_id = 3;
  const region_id = request.body.region_id;
  const gender = request.body.gender;
  const prof_img="uploads/Employee.jpg";
  if (!user_type_id || !first_name || !last_name || !gender || !phone) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  const employeeObject = new user(
    first_name,
    last_name,
    undefined,
    undefined,
    phone,
    address,
    undefined,
    undefined,
    user_type_id,
    region_id,
    gender
  );

  const employeeSchema = joi.object({
    gender: joi
      .string()
      .not()
      .empty()
      .min(1)
      .max(6)
      .pattern(/["male","female","Male","Female","M","F"]/)
      .required(),
    phone: joi
      .string()
      .pattern(/[0-9]{11}/)
      .required(),
    first_name: joi
      .string()
      .not()
      .min(3)
      .max(50)
      .pattern(/[a-z A-Z]{3,50}/)
      .required(),
    last_name: joi
      .string()
      .not()
      .min(3)
      .max(50)
      .pattern(/[a-z A-Z]{3,50}/)
      .required(),
    email: joi.alternatives().try(joi.string()),
    password: joi.alternatives().try(joi.string()),
    address: joi.string().min(1).max(100).required(),
    user_type_id: joi.number().required(),
    region_id: joi.number().required(),
    profile_image_url: joi.alternatives().try(joi.number(), joi.string()),
    id_card_image_url: joi.alternatives().try(joi.number(), joi.string()),
  });

  const joiError = employeeSchema.validate(employeeObject);
  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }
  if (tokenPayload.userTypeId === 3) {
    knex("users")
      .where("id", "=", tokenPayload.userId)
      .andWhere("user_type_id", "=", user_type_id)
      .update({
        first_name: employeeObject.first_name,
        last_name: employeeObject.last_name,
        phone: employeeObject.phone,
        address: employeeObject.address,
        region_id: employeeObject.region_id,
        is_deleted: 0,
        gender: employeeObject.gender,
        profile_image_url: prof_img,
      })
      .then((user) => {
        if (user != 0) {
          response.status(200).json({
            status: "ok",
            msg: "employee updated successfully",
          });
        } else {
          response.status(404).json({
            status: "error",
            msg: "employee not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  } else {
    response.status(400).json({
      status: "error",
      msg: "you have no access to perform this action",
    });
  }
};
