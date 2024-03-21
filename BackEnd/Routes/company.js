const companyRouter = require("express").Router();
const companyController = require("../controllers/company");
const companyMiddleare = require("../util/Middlewares");

//company function calling
companyRouter.post("/", companyController.signupCompany);
companyRouter.put("/", companyController.editCurrentCompany);

//edit company function
companyRouter.put("/edit/:id", companyController.editCompany);
//delete Company function
companyRouter.delete("/delete/:id", companyController.deleteCompany);
//add company function
companyRouter.post("/add", companyController.addCompany);
module.exports = companyRouter;
