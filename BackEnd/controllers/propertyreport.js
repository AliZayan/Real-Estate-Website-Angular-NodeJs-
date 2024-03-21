const ProprtyReportModule = require("../Modules/propertyreport");
const joi = require("joi");
const jwt = require("jsonwebtoken");
//add products function
exports.SavePropertyReport = (request, response) => {
  const knex = request.app.locals.knex;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  const Message_Body = request.body.Message_Body;
  const Property_id = request.body.Property_id;


  if ( !Message_Body) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  const PropertyReportObject = new ProprtyReportModule(Message_Body);

  const PropertyReportSchema = joi.object({
    Message_Body: joi
      .string()
      .not()
      .empty()
      .min(5)
      .max(1000)
      .pattern(/[a-z A-Z]{0,1000}/)
      .required(),
  });

  const joiError = PropertyReportSchema.validate(PropertyReportObject);
  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }
  knex("properties")
  .select("*")
  .where("id", "=", Property_id)
  .then((PrpertyData) => 
     {if (PrpertyData[0]) 
    {
    knex("property_reports")
    .insert({
      message_body: PropertyReportObject.Message_Body,
      properties_id:Property_id,
      users_id: tokenPayload.userId,
      created_at:new Date(),
  
    })
    .then((data) => {
      response.status(201).json({
        status: "ok",
        msg: "Property Report Created",
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server inside property_reports query",
      });
    });
   }
   else {
    response.status(400).json({
      status: "error",
      msg: "Proprety id not exist on our system",
    });
  }


  })
  .catch((error) => {
    console.log(error);
    response.status(500).json({
      status: "error",
      exception: error,
      msg: "500 Internal Server Error inside proprty query",
    });
  });

};

// Delete property reports
exports.DeletePropertyReport = (request, response) => {
  const knex = request.app.locals.knex;
  const id = request.params.id;
 //remove Bearer from authorization header and remove extra spaces
 const token = request.headers.authorization.replace("Bearer", "").trim();
 // decode token and get payload json
 var tokenPayload = jwt.decode(token, { json: true });
 console.log("tokenPayload: ", tokenPayload);
 
  if (!id) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }


  if ( tokenPayload.userTypeId == 3 ) 
  {
    
    knex("property_reports")
    .select("*")
    .where("id", "=", id)
    .update({
      is_deleted: "1",
    })
    .then((ReportData) => {
      response.status(201).json({
        status: "ok",
        msg: "Propery Report deleted successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });   }

  else
   {
      response.status(500).json({
        status: "error",
        msg: "you have no access to delete this property",
      })
  }
 
};

//Get property reports
exports.ShowPropertyReport = (request, response) => {
  const knex = request.app.locals.knex;
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

    
    knex()
    .select(
      "property_reports.*",
      "user.first_name as property_Report_created_by_first_name",
      "user.last_name as  property_Report_created_by_f_last_name",
      "user.email as property_created_by_email",
      "user.phone as property_created_by_phone",
      "user_types.name as user_types",
      "property.title as title",
      "user_prop.first_name as property_owner_created_by_first_name",
      "user_prop.last_name as  property_owner_created_by_f_last_name",
    )
    .from("property_reports as property_reports")
    .leftJoin(
      "properties as property",
      "property.id",
      "property_reports.properties_id"
    )
    .leftJoin( "users as user_prop",  
    "user_prop.id",         
    "property.created_by"
   )
   .leftJoin( "users as user",  
              "user.id",         
              "property_reports.users_id"
             )
  .leftJoin(
              "user_types as user_types",
              "user.user_type_id",
              "user_types.id"
              )
    .where("property.is_deleted", "=", 0)
    .andWhere("property_reports.is_deleted", "=", 0)
    .then((property) => {    
      if ( tokenPayload.userTypeId == 3 ) 
      { response.status(200).json(property);   }

      else
       {
          response.status(500).json({
            status: "error",
            msg: "you have no access to delete this property",
          })
      }
      })
    .catch((error) => {
      console.log("catch error: ", error);
      response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });

};


// get property by id
exports.getPropertyReportById = (request, response) => {
    const knex = request.app.locals.knex;
    const property_id = request.params.id;
 //remove Bearer from authorization header and remove extra spaces
 const token = request.headers.authorization.replace("Bearer", "").trim();
 // decode token and get payload json
 var tokenPayload = jwt.decode(token, { json: true });
 console.log("tokenPayload: ", tokenPayload);

    knex()
      .select(
        "property_reports.*",
        "user.first_name as property_Report_created_by_first_name",
        "user.last_name as  property_Report_created_by_f_last_name",
        "user.email as property_created_by_email",
        "user.phone as property_created_by_phone",
        "user.profile_image_url as profile_image_url",
        "user_types.name as user_types",
        "property.title as title" 
      )
      .from("property_reports as property_reports")
      .leftJoin(
        "properties as property",
        "property.id",
        "property_reports.properties_id"
      )
     .leftJoin( "users as user",  
                "user.id",         
                "property_reports.users_id"
               )
    .leftJoin(
                "user_types as user_types",
                "user.user_type_id",
                "user_types.id"
                )
/*  .where((q) =>
        q
        .where("property.id", "=", property_id)
        .andWhere("property.is_deleted", "=", 0)
      )
      .then((property) => {
      
        if ( tokenPayload.userTypeId == 3 ) 
        { response.status(200).json(property);   }

        else
         {
            response.status(500).json({
              status: "error",
              msg: "you have no access to delete this property",
            })
        }
        })
      .catch((error) => {
        console.log("catch error: ", error);
        response.status(500).json({
          status: "error",
          exception: error,
          msg: "500 Internal Server Error",
        });
      });
  };*/
      .where("property.id", "=", property_id)
      .andWhere("property.is_deleted", "=", 0)
      .then((property) => {    
        if ( tokenPayload.userTypeId == 3 ) 
        { response.status(200).json(property);   }

        else
         {
            response.status(500).json({
              status: "error",
              msg: "you have no access to delete this property",
            })
        }
        })
      .catch((error) => {
        console.log("catch error: ", error);
        response.status(500).json({
          status: "error",
          exception: error,
          msg: "500 Internal Server Error",
        });
      });
  };