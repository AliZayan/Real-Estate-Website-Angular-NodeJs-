const GenaralReportRouter = require("express").Router()
const GenaralReportController = require("../controllers/GenralReport")

//save report 
GenaralReportRouter.post("/MakeGenaralReport", GenaralReportController.SaveGenaralReport)
//get report 
GenaralReportRouter.get("/ShowGenaralReport", GenaralReportController.ShowGenaralReport)
//delete report
GenaralReportRouter.put("/DeleteGenaralReport/:id",GenaralReportController.DeleteGenaralReport)

module.exports = GenaralReportRouter