const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const user = require("../Modules/user");

//signup clients function
exports.signupCompany = (request, response) => {
  const knex = request.app.locals.knex;

  //const profileImg_path = request.body.profileImg_path
  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;
  const password = request.body.password;
  const phone = request.body.phone;
  const address = request.body.address;
  const user_type_id = 4;
  const region_id = request.body.region_id;
  const profile_image_url = request.body.profile_image_url;

  if (
    !user_type_id ||
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !phone
  ) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  const comp = new user(
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    profile_image_url,
    undefined,
    user_type_id,
    region_id,
    undefined
  );

  const companySchema = joi.object({
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
    profile_image_url: joi.alternatives().try(joi.string()),
    gender: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
  });

  const joiError = companySchema.validate(comp);

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
    comp.password = hash;
    knex("users")
      .select("*")
      .where("email", "=", email)
      .andWhere("user_type_id", "=", 4)
      .then((user) => {
        if (!user[0]) {
          knex("users")
            .insert({
              first_name: comp.first_name,
              last_name: comp.last_name,
              email: comp.email,
              password: comp.password,
              phone: comp.phone,
              address: comp.address,
              user_type_id: comp.user_type_id,
              region_id: comp.region_id,
              profile_image_url: comp.profile_image_url,
              is_deleted: 0,
              created_at: new Date(),
            })
            .then((data) => {
              const token = jwt.sign(
                {
                  userEmail: email,
                  userId: data[0],
                  userTypeId: user_type_id,
                },
                "2000az",
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
            msg: "company email already exists",
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
//edit current company function
exports.editCurrentCompany = (request, response) => {
  const knex = request.app.locals.knex;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  //const profileImg_path = request.body.profileImg_path
  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const phone = request.body.phone;
  const address = request.body.address;
  const user_type_id = 4;
  const region_id = request.body.region_id;
  const profile_image_url = request.body.profile_image_url;

  if (!user_type_id || !first_name || !last_name || !phone) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const comp = new user(
    first_name,
    last_name,
    undefined,
    undefined,
    phone,
    address,
    profile_image_url,
    undefined,
    user_type_id,
    region_id,
    undefined
  );

  const companySchema = joi.object({
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
    gender: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
  });

  const joiError = companySchema.validate(comp);

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
      first_name: comp.first_name,
      last_name: comp.last_name,
      phone: comp.phone,
      address: comp.address,
      user_type_id: comp.user_type_id,
      region_id: comp.region_id,
      is_deleted: 0,
    })
    .then((user) => {
      if (!user[0]) {
        response.status(201).json({
          token: token,
          status: "ok",
          msg: "Company Updated successfully",
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

//add company function
exports.addCompany = (request, response) => {
  const knex = request.app.locals.knex;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  //const profileImg_path = request.body.profileImg_path
  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;
  const password = request.body.password;
  const phone = request.body.phone;
  const address = request.body.address;
  const user_type_id = 4;
  const region_id = request.body.region_id;
  const profile_image_url = request.body.profile_image_url;

  if (
    !user_type_id ||
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !phone
  ) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  const comp = new user(
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    profile_image_url,
    undefined,
    user_type_id,
    region_id,
    undefined
  );

  const companySchema = joi.object({
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
    profile_image_url: joi.alternatives().try(joi.string()),
    gender: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
  });

  const joiError = companySchema.validate(comp);

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
    comp.password = hash;

    if (tokenPayload.userTypeId == 3) {
      knex("users")
        .select("*")
        .where("email", "=", email)
        .andWhere("user_type_id", "=", 4)
        .then((user) => {
          if (!user[0]) {
            knex("users")
              .insert({
                first_name: comp.first_name,
                last_name: comp.last_name,
                email: comp.email,
                password: comp.password,
                phone: comp.phone,
                address: comp.address,
                user_type_id: comp.user_type_id,
                region_id: comp.region_id,
                is_deleted: 0,
                created_at: new Date(),
              })
              .then((data) => {
                if (data !== 0) {
                  response.status(201).json({
                    status: "ok",
                    msg: "company created successfully",
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
              msg: "company email already exists",
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

// Edit company Function
exports.editCompany = (request, response) => {
  const knex = request.app.locals.knex;
  const user_id = request.params.id;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  //const profileImg_path = request.body.profileImg_path
  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const phone = request.body.phone;
  const address = request.body.address;
  const user_type_id = 4;
  const region_id = request.body.region_id;
  const profile_image_url = request.body.profile_image_url;

  if (!user_type_id || !first_name || !last_name || !phone) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const comp = new user(
    first_name,
    last_name,
    undefined,
    undefined,
    phone,
    address,
    profile_image_url,
    undefined,
    user_type_id,
    region_id,
    undefined
  );

  const companySchema = joi.object({
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
    address: joi.string().min(3).max(100).required(),
    user_type_id: joi.number().required(),
    region_id: joi.number().required(),
    profile_image_url: joi.alternatives().try(joi.string()),
    gender: joi.alternatives().try(joi.string()),
    id_card_image_url: joi.alternatives().try(joi.string()),
  });

  const joiError = companySchema.validate(comp);

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
        first_name: comp.first_name,
        last_name: comp.last_name,
        phone: comp.phone,
        address: comp.address,
        user_type_id: comp.user_type_id,
        region_id: comp.region_id,
        is_deleted: 0,
      })
      .then((user) => {
        if (user != 0) {
          response.status(200).json({
            status: "ok",
            msg: "company Updated successfully",
          });
        } else {
          response.status(404).json({
            status: "error",
            msg: "company not found",
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

// Delete Company Function
exports.deleteCompany = (request, response) => {
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
      .andWhere("user_type_id", "=", 4)
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
                msg: "company deleted successfully",
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
            msg: "company not found",
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
