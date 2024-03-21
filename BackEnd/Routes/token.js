const tokenRouter = require("express").Router()
const tokenController = require("../controllers/token")
const path = require('path');


// Get current user from token
tokenRouter.get("/currentUser",tokenController.getCurrentUser)
// send forget password email
tokenRouter.post("/forgetPassword",tokenController.ForgetPassword)
// reset password
tokenRouter.post("/resetPassword",tokenController.resetPassword)
// login
tokenRouter.post("/login",tokenController.login)
/////////////////////////////////////////////////////////////////////////
module.exports = tokenRouter


