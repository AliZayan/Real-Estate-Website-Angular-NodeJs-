const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const multer = require("multer");
const path = require("path");
fs = require("fs");

//upload file function
exports.upload = (request, response) => {
  const tempPath = request.file.path;
  const targetPath = path.join(
    __dirname,
    "../uploads/" + request.file.originalname
  );

  if (
    path.extname(request.file.originalname).toLowerCase() === ".png" ||
    path.extname(request.file.originalname).toLowerCase() === ".jpg" ||
    path.extname(request.file.originalname).toLowerCase() === ".jpeg" ||
    path.extname(request.file.originalname).toLowerCase() === ".gif" ||
    path.extname(request.file.originalname).toLowerCase() === ".pdf"
  ) {
    console.log("targetPath: ", targetPath);
    console.log("tempPath: ", tempPath);
    fs.rename(tempPath, targetPath, (err) => {
      if (err) {
        return response.status(400).json({
          status: "error",
          msg: err,
        });
      }

      return response
        .status(200)
        .contentType("text/plain")
        .json({
          status: "ok",
          msg: "file uploaded successfully",
          image_url: "uploads/" + request.file.originalname,
        });
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) {
        return response.status(400).json({
          status: "error",
          msg: err,
        });
      }

      return response.status(403).contentType("text/plain").json({
        status: "ok",
        msg: "Only .png, .jpg, .jpeg, .pdf, and .gif files are allowed!",
      });
    });
  }
};

exports.download = async (request, response) => {
  if (!request.query.image_path) {
    return response.status(400).json({
      status: "error",
      msg: "Required query params missing",
    });
  }
  const image_path = request.query.image_path;

  console.log("image_path: ", image_path);
  const img = path.join(__dirname, "../" + image_path);
  console.log("path: ", img);
  return response.sendFile(img);
};
