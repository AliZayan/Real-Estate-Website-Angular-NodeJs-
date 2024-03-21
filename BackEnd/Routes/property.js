const propertyRouter = require("express").Router();
const propertyController = require("../controllers/property");
const buyerMiddleare = require("../util/Middlewares");

//add property function
propertyRouter.post("/", propertyController.addProperty);
//get property by id
propertyRouter.get("/getById/:id", propertyController.getPropertyById);
//get my properties
propertyRouter.get("/myProperties", propertyController.getMyProperties);
//search properties
propertyRouter.post("/search", propertyController.searchProperties);
//edit property function
propertyRouter.put("/edit/:id", propertyController.editProperty);
//delete property function
propertyRouter.delete("/delete/:id", propertyController.deleteProperty);
//add property user favorite function
propertyRouter.post("/userFavorite", propertyController.addUserFavorite);
//retrived
propertyRouter.get("/isFavorite/:id", propertyController.isFavorite);
//retrive my  fav properties
propertyRouter.get(
  "/myFavoriteProperties",
  propertyController.getMyFavoriteProperties
);
//retrive data by type
propertyRouter.get("/apartement", propertyController.getAllApartement);
// get all villa 
propertyRouter.get("/villa", propertyController.getAllvilla);
// get all Town House 
propertyRouter.get("/townHouse", propertyController.getAllTownHouse);
// get all shop
propertyRouter.get("/store", propertyController.getAllshop);
// get all ware house
propertyRouter.get("/warehouse", propertyController.getAllwareHouse);
//get all office
propertyRouter.get("/office", propertyController.getAlloffice);



module.exports = propertyRouter;