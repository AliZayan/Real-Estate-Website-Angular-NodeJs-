const buyerRouter = require("express").Router();
const buyerController = require("../controllers/buyer");
const buyerMiddleare = require("../util/Middlewares");

//customer function calling
buyerRouter.post("/", buyerController.signupBuyer);
//edit current buyer
buyerRouter.put("/", buyerController.editCurrentBuyer);

//Edit buyer
buyerRouter.put("/edit/:id", buyerController.editBuyer);
// delete Buyer
buyerRouter.delete("/delete/:id", buyerController.deleteBuyer);
//add buyer function
buyerRouter.post("/add", buyerController.addBuyer);

module.exports = buyerRouter;
