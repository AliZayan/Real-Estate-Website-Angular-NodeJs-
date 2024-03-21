const ReportModule = require("../Modules/report");
const joi = require("joi");

//add products function
exports.SaveReport = (request, response) => {
  const knex = request.app.locals.knex;

  const name = request.body.name;
  const email = request.body.email;
  const text = request.body.text;
  let creator_type_buyer = "Buyer";
  let creator_type_seller = "Seller";
  let creator_type_company = "Comapny";

  if (!name || !email || !text) {
    return response.status(400).json({
      status: "error",
      msg: "400 Bad Request ",
    });
  }
  const ReportObject = new ReportModule(name, email, text, "creator_type");

  const ReportSchema = joi.object({
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
      .pattern(/[a-z A-Z]{3,50}/)
      .required(),
    text: joi
      .string()
      .not()
      .empty()
      .min(3)
      .max(200)
      .pattern(/[a-z A-Z]{3,200}/)
      .required(),
    creator_type: joi
      .string()
      .not()
      .empty()
      .min(3)
      .max(50)
      .pattern(/[a-z A-Z]{1,50}/)
      .required(),
  });

  const joiError = ReportSchema.validate(ReportObject);
  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: "400 Bad Request",
    });
  }

  knex("buyers")
    .select("*")
    .where("email", "=", email)
    .then((buyerdata) => {
      console.log(buyerdata);
      knex("report")
        .insert({
          email: ReportObject.email,
          name: ReportObject.name,
          text: ReportObject.text,
          creator_type: creator_type_buyer,
          buyers_id: buyerdata[0].id,
        })
        .then((data) => {
          //buyer .then response
          response.status(201).json({
            status: "ok",
            msg: "Report Created by buyer",
          });
        })
        .catch((error) => {
          console.log(error);
          response.status(500).json({
            status: "error",
            msg: "500 Internal Server Error From Buyer report",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      //seller searching report
      knex("sellers")
        .select("*")
        .where("email", "=", email)
        .then((sellerdata) => {
          console.log(sellerdata);
          knex("report")
            .insert({
              email: ReportObject.email,
              name: ReportObject.name,
              text: ReportObject.text,
              creator_type: creator_type_seller,
              sellers_id: sellerdata[0].id,
            })
            .then((data) => {
              response.status(201).json({
                status: "ok",
                msg: "Report Created by seller",
              });
            })
            .catch((error) => {
              console.log(error);
              response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error From seller report",
              });
            });
        })

        .catch((error) => {
          console.log(error);
          //seller searching report
          knex("companies")
            .select("*")
            .where("email", "=", email)
            .then((companydata) => {
              console.log(companydata);
              knex("report")
                .insert({
                  email: ReportObject.email,
                  name: ReportObject.name,
                  text: ReportObject.text,
                  creator_type: creator_type_company,
                  companies_id: companydata[0].id,
                })
                .then((data) => {
                  response.status(201).json({
                    status: "ok",
                    msg: "Report Created by company",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  response.status(500).json({
                    status: "error",
                    msg: "500 Internal Server Error From company report",
                  });
                });
            })

            .catch((error) => {
              console.log(error);
              response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error No User Found",
              });
            });

          //....................seller 2
        });

      //........................buyer 1
    });
};

// Delete Report
exports.DeleteReport = (request, response) => {
  const knex = request.app.locals.knex;
  const id = request.body.id;

  if (!id) {
    return response.status(400).json({
      status: "error",
      msg: "400 Bad Request",
    });
  }

  knex("report")
    .select("*")
    .where("id", "=", id)
    .update({
      is_deleted: "1",
    })
    .then((ReportData) => {
      response.status(201).json({
        status: "ok",
        msg: "Report deleted successfully",
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
exports.ShowReport = (request, response) => {
  const knex = request.app.locals.knex;

  knex("report")
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
