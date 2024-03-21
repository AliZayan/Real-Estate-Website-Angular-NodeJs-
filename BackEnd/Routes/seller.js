const sellerRouter = require("express").Router();
const sellerController = require("../controllers/seller");
// const selleradscontroller=require("../controllers/advertisement")

//seller  signup function
sellerRouter.post("/", sellerController.signupSeller);
//edit current seller function
sellerRouter.put("/", sellerController.editCurrentSeller);

//edit seller function
sellerRouter.put("/edit/:id", sellerController.editSeller);
//delete Seller function
sellerRouter.delete("/delete/:id", sellerController.deleteSeller);
//add seller function
sellerRouter.post("/add", sellerController.addSeller);

module.exports = sellerRouter;
