const messageRouter = require("express").Router();
const messageController = require("../controllers/message");
const buyerMiddleare = require("../util/Middlewares");

const path = require("path");

//send message function calling
messageRouter.post("/send", messageController.sendMessage);
//get message by id function calling
messageRouter.get("/getChat/:id", messageController.getChat);
//get message by id function calling
messageRouter.get("/myInbox", messageController.getInboxList);





module.exports = messageRouter;