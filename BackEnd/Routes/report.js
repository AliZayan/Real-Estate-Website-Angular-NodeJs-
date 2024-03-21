const reportRouter = require("express").Router()
const reportcontroller = require("../controllers/report")

//save report 
reportRouter.post("/MakeReport", reportcontroller.SaveReport)
//get report 
reportRouter.get("/ShowReport", reportcontroller.ShowReport)
//delete report
reportRouter.put("/DeleteReport",reportcontroller.DeleteReport)


module.exports = reportRouter