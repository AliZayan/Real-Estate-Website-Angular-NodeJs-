const userRouter = require("express").Router();
const userController = require("../controllers/user");
const buyerMiddleare = require("../util/Middlewares");

const path = require("path");

//get users list function calling
userRouter.get("/getList/:userTypeId", userController.getList);

//get user by id function calling
userRouter.get("/getById/:id", userController.getById);

module.exports = userRouter;
