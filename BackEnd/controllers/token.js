const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//get current user function
exports.getCurrentUser = (request, response) => {
  const knex = request.app.locals.knex;
  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  knex
    .select(
      "user.*",
      "type.name as user_type_name",
      "region.name as region_name",
      "city.id as city_id",
      "city.name as city_name"
    )
    .from("users as user")
    .leftJoin("user_types as type", "user.user_type_id", "type.id")
    .leftJoin("regions as region", "user.region_id", "region.id")
    .leftJoin("cities as city", "region.city_id", "city.id")
    .where("user.id", "=", tokenPayload.userId)
    .limit(1)
    .then((result) => {
      if (result[0] != null) {
        response.status(200).json(result[0]);
      } else {
        response.status(404).json({
          status: "error",
          msg: "User not found",
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

//login function
exports.login = (request, response) => {
  console.log("login");
  const knex = request.app.locals.knex;

  const email = request.body.email;
  const password = request.body.password;
  const user_type_id = request.body.user_type_id;
  if (!email || !password || !user_type_id) {
    return response.status(400).json({
      status: "error",
      msg: "Required field are missing",
    });
  }

  knex("users")
    .select(
      "id",
      "first_name",
      "last_name",
      "email",
      "password",
      "user_type_id"
    )
    .limit(1)
    .where("email", "=", email)
    .andWhere("user_type_id", "=", user_type_id)
    .then((user) => {
      if (user[0] != null) {
        bcrypt.compare(password, user[0].password, (error, result) => {
          if (error) {
            console.log("error: ", error);
          }
          if (result) {
            console.log("result: ", result);
            const token = jwt.sign(
              {
                userEmail: user[0].email,
                userId: user[0].id,
                userTypeId: user[0].user_type_id,
              },
              "4077AK",
              {}
            );

            response.status(200).json({
              token: token,
              status: "ok",
              msg: "login successfully",
            });
          } else {
            response.status(401).json({
              status: "error",
              msg: "invalid password",
            });
          }
        });
      } else {
        response.status(404).json({
          status: "error",
          msg: "This email is not registered",
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

// forget password function
exports.ForgetPassword = (request, response) => {
  const knex = request.app.locals.knex;
  const email = request.body.email;
  const user_type_id = request.body.user_type_id;

  if (!email || !user_type_id) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  knex
    .select("user.*", "type.name as user_type_name")
    .from("users as user")
    .leftJoin("user_types as type", "user.user_type_id", "type.id")
    .where("email", "=", email)
    .andWhere("user_type_id", "=", user_type_id)
    .limit(1)
    .then((user) => {
      if (user[0] != null) {
        const token = jwt.sign(
          {
            userEmail: user[0].email,
            userId: user[0].id,
            userTypeId: user[0].user_type_id,
            userTypeName: user[0].user_type_name,
          },
          "4077AK",
          {}
        );
        var sent;

        if (user[0].user_type_name == "seller") {
          sent = sendEmail(email, token, "http://localhost:4200/resetS?token=");
        } else if (user[0].user_type_name == "buyer") {
          sent = sendEmail(email, token, "http://localhost:4200/resetB?token=");
        } else if (user[0].user_type_name == "company") {
          sent = sendEmail(email, token, "http://localhost:4200/resetC?token=");
        } else {
          sent = sendEmail(email, token, "http://localhost:4200/resetB?token=");
        }

        if (sent != "0") {
          return response.status(200).json({
            status: "ok",
            msg: "Forget password email sent successfully",
          });
        } else {
          return response.status(500).json({
            status: "error",
            msg: "500 Internal Server Error",
          });
        }
      } else {
        response.status(400).json({
          status: "error",
          msg: "This email is not registered",
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

//reset Password function
exports.resetPassword = (request, response) => {
  console.log("*****************resetPassword*****************");

  const password = request.body.password;
  const confirmPassword = request.body.confirmPassword;
  if (!confirmPassword || !password) {
    return response.status(400).json({
      status: "error",
      msg: "Password and confirm Password are Required",
    });
  } else if (password !== confirmPassword) {
    return response.status(400).json({
      status: "error",
      msg: "Password and confirm Password are not matching",
    });
  }

  const knex = request.app.locals.knex;
  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  bcrypt.hash(password, 9, function (err, hash) {
    if (err) {
      console.log(err);
    }
    knex("users")
      .where("id", "=", tokenPayload.userId)
      .limit(1)
      .update({
        password: hash,
      })
      .then((result) => {
        console.log(result);
        if (result != null) {
          response.status(200).json({
            status: "ok",
            msg: "password updated successfully",
          });
        } else {
          response.status(404).json({
            status: "error",
            msg: "User not found",
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
  });
};

function sendEmail(email, token, url) {
  const nodemailer = require("nodemailer");

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fromhousetohomewebsite@gmail.com",
      pass: "jmdprtqllwykjyjg",
    },
  });
  const link = url + token;
  let details = {
    from: "fromhousetohomewebsite@gmail.com",
    to: email,
    subject: "Reset password",
    text: "Reset password",
    html:
      '<p>You requested for reset password, kindly use this <a href="' +
      link +
      '">link</a> to reset your password</p>',
  };

  mailTransporter.sendMail(details, (error, info) => {
    if (error) {
      console.log("error found");
      console.log(error);
    } else {
      console.log("send");
    }
  });
}
