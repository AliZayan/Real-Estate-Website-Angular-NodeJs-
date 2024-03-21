const fileRouter = require("express").Router();
const fileController = require("../controllers/file");
const buyerMiddleare = require("../util/Middlewares");
const multer = require("multer");

const path = require("path");
const upload = multer({
  dest: "uploads/",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
//upload file function
fileRouter.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  fileController.upload
);

//download file function
fileRouter.get("/download", fileController.download);
module.exports = fileRouter;
