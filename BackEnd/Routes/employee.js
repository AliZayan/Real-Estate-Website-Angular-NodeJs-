const employeeRouter = require("express").Router();
const employeeController = require("../controllers/employee");

//edit employee function
employeeRouter.put("/edit/:id", employeeController.editEmployee);
//delete Employee function
employeeRouter.delete("/delete/:id", employeeController.deleteEmployee);
//add employee function
employeeRouter.post("/add", employeeController.addEmployee);
//edit current employee
employeeRouter.put("/Profile", employeeController.editCurrentEmployee);
module.exports = employeeRouter;
