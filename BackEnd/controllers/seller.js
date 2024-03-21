const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const user = require("../Modules/user");

//signup clients function
exports.signupSeller = (request, response) => {
  const knex = request.app.locals.knex;

  console.log(request.body);
  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;
  const password = request.body.password;
  const phone = request.body.phone;
  const address = request.body.address;
  const profile_image_url = request.body.profile_image_url;
  const id_card_image_url = request.body.id_card_image_url;
  const user_type_id = 1;
  const region_id = request.body.region_id;
  const gender = request.body.gender;

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
  const sell = new user(
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    profile_image_url,
    id_card_image_url,
    user_type_id,
    region_id,
    gender
  );

  const SellerSchema = joi.object({
    //idcard_img_path:joi.string().not().empty().min(3).max(100).required(),
    //Personal_img_path:joi.string().not().empty().min(3).max(100).required(),
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
    profile_image_url: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
  });

  const joiError = SellerSchema.validate(sell);

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
    sell.password = hash;
    knex("users")
      .select("*")
      .where("email", "=", email)
      .andWhere("user_type_id", "=", 1)
      .then((user) => {
        if (!user[0]) {
          knex("users")
            .insert({
              first_name: sell.first_name,
              last_name: sell.last_name,
              email: sell.email,
              password: sell.password,
              phone: sell.phone,
              address: sell.address,
              profile_image_url: sell.profile_image_url,
              id_card_image_url: sell.id_card_image_url,
              user_type_id: sell.user_type_id,
              region_id: sell.region_id,
              is_deleted: 0,
              gender: sell.gender,
              created_at: new Date(),
            })
            .then((data) => {
              const token = jwt.sign(
                {
                  userEmail: email,
                  userId: data[0],
                  userTypeId: user_type_id,
                },
                "1999mg",
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
            msg: "seller email already exists",
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

//edit current seller function
exports.editCurrentSeller = (request, response) => {
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
  const profile_image_url = request.body.profile_image_url;
  const id_card_image_url = request.body.id_card_image_url;
  const user_type_id = 1;
  const region_id = request.body.region_id;
  const gender = request.body.gender;

  if (!user_type_id || !first_name || !last_name || !gender || !phone) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  const sell = new user(
    first_name,
    last_name,
    undefined,
    undefined,
    phone,
    address,
    profile_image_url,
    id_card_image_url,
    user_type_id,
    region_id,
    gender
  );

  const SellerSchema = joi.object({
    //idcard_img_path:joi.string().not().empty().min(3).max(100).required(),
    //Personal_img_path:joi.string().not().empty().min(3).max(100).required(),
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
    profile_image_url: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
  });

  const joiError = SellerSchema.validate(sell);

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
      first_name: sell.first_name,
      last_name: sell.last_name,
      phone: sell.phone,
      address: sell.address,
      profile_image_url: sell.profile_image_url,
      id_card_image_url: sell.id_card_image_url,
      region_id: sell.region_id,
      is_deleted: 0,
      gender: sell.gender,
    })
    .then((user) => {
      if (!user[0]) {
        response.status(200).json({
          token: token,
          status: "ok",
          msg: "Seller Updated successfully",
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

//add seller function
exports.addSeller = (request, response) => {
  const knex = request.app.locals.knex;
  const user_id = request.params.id;

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
  const address = request.body.address;
  const profile_image_url = request.body.profile_image_url;
  const id_card_image_url = request.body.id_card_image_url;
  const user_type_id = 1;
  const region_id = request.body.region_id;
  const gender = request.body.gender;

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
  const sell = new user(
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    profile_image_url,
    id_card_image_url,
    user_type_id,
    region_id,
    gender
  );

  const SellerSchema = joi.object({
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
    profile_image_url: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
  });

  const joiError = SellerSchema.validate(sell);

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
    sell.password = hash;

    if (tokenPayload.userTypeId == 3) {
      knex("users")
        .select("*")
        .where("email", "=", email)
        .andWhere("user_type_id", "=", 1)
        .then((user) => {
          if (!user[0]) {
            knex("users")
              .insert({
                first_name: sell.first_name,
                last_name: sell.last_name,
                email: sell.email,
                password: sell.password,
                phone: sell.phone,
                address: sell.address,
                profile_image_url: sell.profile_image_url,
                id_card_image_url: sell.id_card_image_url,
                user_type_id: sell.user_type_id,
                region_id: sell.region_id,
                is_deleted: 0,
                gender: sell.gender,
                created_at: new Date(),
              })
              .then((data) => {
                if (data !== 0) {
                  response.status(201).json({
                    status: "ok",
                    msg: "seller created successfully",
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
              msg: "seller email already exists",
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

//Edit Function For seller
exports.editSeller = (request, response) => {
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
  const profile_image_url = request.body.profile_image_url;
  const id_card_image_url = request.body.id_card_image_url;
  const user_type_id = 1;
  const region_id = request.body.region_id;
  const gender = request.body.gender;

  if (!user_type_id || !first_name || !last_name || !gender || !phone) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  const sell = new user(
    first_name,
    last_name,
    undefined,
    undefined,
    phone,
    address,
    profile_image_url,
    id_card_image_url,
    user_type_id,
    region_id,
    gender
  );

  const SellerSchema = joi.object({
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
    profile_image_url: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
  });

  const joiError = SellerSchema.validate(sell);

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
        first_name: sell.first_name,
        last_name: sell.last_name,
        phone: sell.phone,
        address: sell.address,
        profile_image_url: sell.profile_image_url,
        id_card_image_url: sell.id_card_image_url,
        region_id: sell.region_id,
        is_deleted: 0,
        gender: sell.gender,
      })
      .then((user) => {
        if (user != 0) {
          response.status(200).json({
            status: "ok",
            msg: "seller Updated successfully",
          });
        } else {
          response.status(404).json({
            status: "error",
            msg: "seller not found",
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

// Delete Seller Function
exports.deleteSeller = (request, response) => {
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
      .andWhere("user_type_id", "=", 1)
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
                msg: "seller deleted successfully",
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
            msg: "seller not found",
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
