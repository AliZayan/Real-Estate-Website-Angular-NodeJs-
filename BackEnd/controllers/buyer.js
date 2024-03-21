const bcrypt = require("bcrypt");
const user = require("../Modules/user");
const jwt = require("jsonwebtoken");
const joi = require("joi");

//signup clients function
exports.signupBuyer = (request, response) => {
  const knex = request.app.locals.knex;

  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;
  const password = request.body.password;
  const phone = request.body.phone;
  const region_id = request.body.region_id;
  const gender = request.body.gender;
  const profile_image_url= request.body.profile_image_url;
  const user_type_id = 2;
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

  const buyerModel = new user(
    first_name,
    last_name,
    email,
    password,
    phone,
    undefined,
    profile_image_url,
    undefined,
    user_type_id,
    region_id,
    gender
  );

  const buyerSchema = joi.object({
    email: joi.string().email().min(6).max(60).required(),
    password: joi.string().min(5).max(100).required(),
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
    gender: joi
      .string()
      .not()
      .empty()
      .min(1)
      .max(8)
      .pattern(/["male","female","Male","Female","M","F","m","f"]/)
      .required(),
    phone: joi.string().pattern(/[0-9]{11}/),
    profile_image_url: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
    address: joi.alternatives().try(joi.string()),
    user_type_id: joi.number().required(),
    region_id: joi.number().required(),
  });

  const joiError = buyerSchema.validate(buyerModel);

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
    buyerModel.password = hash;
    knex("users")
      .select("*")
      .where("email", "=", email)
      .andWhere("user_type_id", "=", 2)
      .then((user) => {
        if (!user[0]) {
          knex("users")
            .insert({
              first_name: buyerModel.first_name,
              last_name: buyerModel.last_name,
              email: buyerModel.email,
              password: buyerModel.password,
              phone: buyerModel.phone,
              user_type_id: buyerModel.user_type_id,
              region_id: buyerModel.region_id,
              is_deleted: 0,
              profile_image_url: buyerModel.profile_image_url,
              gender: buyerModel.gender,
              created_at: new Date(),
            })
            .then((data) => {
              const token = jwt.sign(
                {
                  userEmail: email,
                  userId: data[0],
                  userTypeId: user_type_id,
                },
                "4077AK",
                {}
              );

              response.status(201).json({
                token: token,
                status: "ok",
                msg: "register successfully",
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
            msg: "buyer email already exists",
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
  });
};

//edit current buyer fumction
exports.editCurrentBuyer = (request, response) => {
  const knex = request.app.locals.knex;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const phone = request.body.phone;
  const region_id = request.body.region_id;
  const gender = request.body.gender;
  const user_type_id = 2;
  if (!user_type_id || !first_name || !last_name || !gender || !phone) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const buyerModel = new user(
    first_name,
    last_name,
    undefined,
    undefined,
    phone,
    undefined,
    undefined,
    undefined,
    user_type_id,
    region_id,
    gender
  );

  const buyerSchema = joi.object({
    email: joi.alternatives().try(joi.string()),
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
    gender: joi
      .string()
      .not()
      .empty()
      .min(1)
      .max(8)
      .pattern(/["male","female","Male","Female","M","F","m","f"]/)
      .required(),
    phone: joi.string().pattern(/[0-9]{11}/),
    profile_image_url: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
    password: joi.alternatives().try(joi.string()),
    address: joi.alternatives().try(joi.string()),
    user_type_id: joi.number().required(),
    region_id: joi.number().required(),
  });

  const joiError = buyerSchema.validate(buyerModel);

  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }

  knex("users")
    .where("id", "=", tokenPayload.userId)
    .update({
      first_name: buyerModel.first_name,
      last_name: buyerModel.last_name,
      phone: buyerModel.phone,
      region_id: buyerModel.region_id,
      is_deleted: 0,
      gender: buyerModel.gender,
    })
    .then((user) => {
      if (!user[0]) {
        response.status(201).json({
          token: token,
          status: "ok",
          msg: "Buyer Updated successfully",
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
};

//add buyer function
exports.addBuyer = (request, response) => {
  const knex = request.app.locals.knex;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;
  const password = request.body.password;
  const phone = request.body.phone;
  const region_id = request.body.region_id;
  const gender = request.body.gender;
  const user_type_id = 2;
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

  const buyerModel = new user(
    first_name,
    last_name,
    email,
    password,
    phone,
    undefined,
    undefined,
    undefined,
    user_type_id,
    region_id,
    gender
  );

  const buyerSchema = joi.object({
    email: joi.string().email().min(6).max(60).required(),
    password: joi.string().min(5).max(100).required(),
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
    gender: joi
      .string()
      .not()
      .empty()
      .min(1)
      .max(8)
      .pattern(/["male","female","Male","Female","M","F","m","f"]/)
      .required(),
    phone: joi.string().pattern(/[0-9]{11}/),
    profile_image_url: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
    address: joi.alternatives().try(joi.string()),
    user_type_id: joi.number().required(),
    region_id: joi.number().required(),
  });

  const joiError = buyerSchema.validate(buyerModel);

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
    buyerModel.password = hash;

    if (tokenPayload.userTypeId == 3) {
      knex("users")
        .select("*")
        .where("email", "=", email)
        .andWhere("user_type_id", "=", 1)
        .then((user) => {
          if (!user[0]) {
            knex("users")
              .insert({
                first_name: buyerModel.first_name,
                last_name: buyerModel.last_name,
                email: buyerModel.email,
                password: buyerModel.password,
                phone: buyerModel.phone,
                user_type_id: buyerModel.user_type_id,
                region_id: buyerModel.region_id,
                is_deleted: 0,
                gender: buyerModel.gender,
                created_at: new Date(),
              })
              .then((data) => {
                response.status(201).json({
                  status: "ok",
                  msg: "buyer created successfully",
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
              msg: "buyer email already exists",
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
  });
};

// Edit Buyer
exports.editBuyer = (request, response) => {
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
  const region_id = request.body.region_id;
  const gender = request.body.gender;
  const user_type_id = 2;
  if (!user_type_id || !first_name || !last_name || !gender || !phone) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const buyerModel = new user(
    first_name,
    last_name,
    undefined,
    undefined,
    phone,
    undefined,
    undefined,
    undefined,
    user_type_id,
    region_id,
    gender
  );

  const buyerSchema = joi.object({
    email: joi.alternatives().try(joi.string()),
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
    gender: joi
      .string()
      .not()
      .empty()
      .min(1)
      .max(8)
      .pattern(/["male","female","Male","Female","M","F","m","f"]/)
      .required(),
    phone: joi.string().pattern(/[0-9]{11}/),
    profile_image_url: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
    password: joi.alternatives().try(joi.string()),
    address: joi.alternatives().try(joi.string()),
    user_type_id: joi.number().required(),
    region_id: joi.number().required(),
  });

  const joiError = buyerSchema.validate(buyerModel);

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
        first_name: buyerModel.first_name,
        last_name: buyerModel.last_name,
        phone: buyerModel.phone,
        region_id: buyerModel.region_id,
        is_deleted: 0,
        gender: buyerModel.gender,
      })
      .then((user) => {
        console.log(user);
        if (user != 0) {
          response.status(200).json({
            status: "ok",
            msg: "Buyer Updated successfully",
          });
        } else {
          response.status(404).json({
            status: "error",
            msg: "Buyer not found",
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

// Delete Buyer Function
exports.deleteBuyer = (request, response) => {
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
      .andWhere("user_type_id", "=", 2)
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
                msg: "buyer deleted successfully",
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
            msg: "buyer not found",
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
