const lookupRouter = require("express").Router()
const lookupController = require("../controllers/lookup")
const lookupMiddleWare = require("../util/Middlewares")



// Get lookups
lookupRouter.get("/cities",lookupController.getCities)
lookupRouter.get("/propertyFeatures",lookupController.getFeatures)
lookupRouter.get("/propertyCategories",lookupController.getPropertyCategories)
lookupRouter.get("/userTypes",lookupController.getUserTypes)
lookupRouter.get("/propertyStatuses",lookupController.getPropertyStatuses)
lookupRouter.get("/cityRegions/:id",lookupController.getRegionsByCityId)

/////////////////////////////////////////////////////////////////////////

module.exports = lookupRouter


