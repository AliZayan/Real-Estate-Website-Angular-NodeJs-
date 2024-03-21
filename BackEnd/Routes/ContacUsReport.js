const ContactUsReportRouter = require("express").Router()
const ContactUsReportController = require("../controllers/ContacUsReport")

//save report 
ContactUsReportRouter.post("/MakecontactusReport", ContactUsReportController.SavecontactusReport)
//get report 
ContactUsReportRouter.get("/ShowcontactusReport", ContactUsReportController.ShowcontactusReport)
//delete report
ContactUsReportRouter.delete("/DeletecontactusReport/:id",ContactUsReportController.DeletecontactusReport)
//get all user contact us
ContactUsReportRouter.get("/GetContactUseportById/:id", ContactUsReportController.getContactusReportByUserId);
// msg with the creator 
ContactUsReportRouter.post("/msgOwner/:id", ContactUsReportController.sendMessage);

module.exports = ContactUsReportRouter