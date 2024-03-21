const GenaralReportModule = require("../Modules/GenralReport");
const joi = require("joi");

//add products function
exports.SaveGenaralReport = (request, response) => {
  const knex = request.app.locals.knex;

  const name = request.body.name;
  const email = request.body.email;
  const text = request.body.text;



  if (!name || !email || !text) {
    return response.status(400).json({
      status: "error",
      msg: "400 Bad Request Data error",
    });
  }
  const GenaralReportObject = new GenaralReportModule(name, email, text);

  const GenaralReportSchema = joi.object({
    name: joi
      .string()
      .not()
      .empty()
      .min(3)
      .max(200)
      .pattern(/[a-z A-Z]{3,20}/)
      .required(),
    email: joi
      .string()
      .not()
      .empty()
      .min(3)
      .max(50)
      .email()
      .required(),
    text: joi
      .string()
      .not()
      .empty()
      .min(3)
      .max(1000)
      .pattern(/[a-z A-Z]{0,1000}/)
      .required(),
  
  });

  const joiError = GenaralReportSchema.validate(GenaralReportObject);
  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: "400 Bad Request Joi error",
    });
  }

  knex("genral_report")
  .insert({
    email: GenaralReportObject.email,
    name: GenaralReportObject.name,
    text: GenaralReportObject.text,
    created_at:new Date(),
  })
  .then((data) => {
    response.status(201).json({
      status: "ok",
      msg: "Genaral Report Created",
    });
  })
  .catch((error) => {
    console.log(error);
    response.status(500).json({
      status: "error",
      msg: "500 Internal Server",
    });
  });
};

// Delete Report
exports.DeleteGenaralReport = (request, response) => {
  const knex = request.app.locals.knex;
  const id = request.params.id;

  if (!id) {
    return response.status(400).json({
      status: "error",
      msg: "400 Bad Request Data error",
    });
  }

  knex("genral_report")
    .select("*")
    .where("id", "=", id)
    .update({
      is_deleted: "1",
    })
    .then((ReportData) => {
      response.status(201).json({
        status: "ok",
        msg: "Genaral Report deleted successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
};

//Get
exports.ShowGenaralReport = (request, response) => {
  const knex = request.app.locals.knex;

  knex("genral_report")
    .select("*")
    .where("is_deleted", "=", 0)
    .then((ReportData) => {
      response.status(200).json(ReportData);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
};
