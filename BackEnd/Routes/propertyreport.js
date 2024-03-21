const PropertyReportRouter = require("express").Router()
const ProprtyReportController = require("../controllers/propertyreport")

//save report 
PropertyReportRouter.post("/MakePropertyReport", ProprtyReportController.SavePropertyReport)
//show all property report 
PropertyReportRouter.get("/ShowPropertyReport", ProprtyReportController.ShowPropertyReport)
//show specfic property report 
PropertyReportRouter.get("/getPropertyReportById/:id", ProprtyReportController.getPropertyReportById);
//delete report
PropertyReportRouter.delete("/DeletePropertyReport/:id",ProprtyReportController.DeletePropertyReport)

module.exports = PropertyReportRouter