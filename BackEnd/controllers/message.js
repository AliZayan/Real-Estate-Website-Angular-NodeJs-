const bcrypt = require("bcrypt");
const message = require("../Modules/message");
const jwt = require("jsonwebtoken");
const joi = require("joi");

//send message function
exports.sendMessage = (request, response) => {
  const knex = request.app.locals.knex;

  const receiver_id = request.body.receiver_id;
  const message_body = request.body.message_body;

  const tokentest = request.headers.authorization;
  console.log("tokentest: ", tokentest);
  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  if (!receiver_id || !message_body) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const messageModel = new message(
    tokenPayload.userId,
    receiver_id,
    message_body
  );

  const messageSchema = joi.object({
    sender_id: joi.number().required(),
    message_body: joi.string().min(1).max(450).required(),
    receiver_id: joi.number().required(),
  });

  const joiError = messageSchema.validate(messageModel);

  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }

  knex("users")
    .where("id", "=", receiver_id)
    .andWhere("is_deleted", "=", 0)
    .then((receiver) => {
      if (receiver[0]) {
        knex("message")
          .insert({
            message_body: messageModel.message_body,
            receiver_id: messageModel.receiver_id,
            created_at: new Date(),
            sender_id: tokenPayload.userId,
          })
          .then((data) => {
            console.log("data:", data);
            response.status(201).json({
              status: "ok",
              msg: "message sent successfully",
            });
          })
          .catch((error) => {
            console.log("error: ", error);
            response.status(500).json({
              status: "error",
              exception: error,
              msg: "500 Internal Server Error",
            });
          });
      } else {
        return response.status(400).json({
          status: "error",
          msg: "receiver not found ",
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

//get chat by user id function
exports.getChat = (request, response) => {
  const knex = request.app.locals.knex;
  const user_id = request.params.id;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  knex("message as message")
    .select(
      "message.*",
      "sender.first_name as sender_first_name",
      "sender.last_name as sender_last_name",
      "sender.profile_image_url as sender_profile_image_url",
      "sender.user_type_id as sender_user_type_id",
      "receiver.first_name as receiver_first_name",
      "receiver.last_name as receiver_last_name",
      "receiver.profile_image_url as receiver_profile_image_url",
      "receiver.user_type_id as receiver_user_type_id"
    )
    .leftJoin("users as sender", "message.sender_id", "sender.id")
    .leftJoin("users as receiver", "message.receiver_id", "receiver.id")
    .where((q) =>
      q
        .where("message.sender_id", "=", tokenPayload.userId)
        .andWhere("message.receiver_id", "=", user_id)
    )
    .orWhere((q) =>
      q
        .where("message.sender_id", "=", user_id)
        .andWhere("message.receiver_id", "=", tokenPayload.userId)
    )
    .orderBy([{ column: "created_at", order: "asc" }])
    .then((data) => {
      return response.status(200).json({
        status: "ok",
        data: data,
      });
    })
    .catch((error) => {
      console.log("catch error: ", error);
      return response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });
};

//get chat by user id function
exports.getInboxList = (request, response) => {
  const knex = request.app.locals.knex;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  knex("message as message")
    .select(
      "message.*",
      "sender.first_name as sender_first_name",
      "sender.last_name as sender_last_name",
      "sender.profile_image_url as sender_profile_image_url",
      "sender.user_type_id as sender_user_type_id",
      "receiver.first_name as receiver_first_name",
      "receiver.last_name as receiver_last_name",
      "receiver.profile_image_url as receiver_profile_image_url",
      "receiver.user_type_id as receiver_user_type_id"
    )
    .leftJoin("users as sender", "message.sender_id", "sender.id")
    .leftJoin("users as receiver", "message.receiver_id", "receiver.id")
    .where("message.sender_id", "=", tokenPayload.userId)
    .orWhere("message.receiver_id", "=", tokenPayload.userId)
    .orderBy([{ column: "created_at", order: "desc" }])
    .groupBy("message.receiver_id", "message.sender_id")
    .then((data) => {
      var result = [];

      data.forEach(function (item, index) {
        if (item.sender_id == tokenPayload.userId) {
          var resultItem = result.findIndex(
            (r) =>
              r.sender_id == item.receiver_id ||
              r.receiver_id == item.receiver_id
          );
          if (resultItem == -1) {
            result.push(item);
          }
        } else if (item.receiver_id == tokenPayload.userId) {
          var resultItem2 = result.findIndex(
            (r) =>
              r.sender_id == item.sender_id || r.receiver_id == item.sender_id
          );
          if (resultItem2 == -1) {
            result.push(item);
          }
        }
      });

      return response.status(200).json({
        status: "ok",
        data: result,
      });
    })
    .catch((error) => {
      console.log("catch error: ", error);
      return response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });
};
