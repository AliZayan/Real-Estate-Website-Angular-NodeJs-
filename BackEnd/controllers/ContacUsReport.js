const ContactusReportModule = require("../Modules/ContacUsReport");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const message = require("../Modules/message");
//add products function
exports.SavecontactusReport = (request, response) => {
  const knex = request.app.locals.knex;
    //remove Bearer from authorization header and remove extra spaces
    const token = request.headers.authorization.replace("Bearer", "").trim();
    // decode token and get payload json
    var tokenPayload = jwt.decode(token, { json: true });
    console.log("tokenPayload: ", tokenPayload);

  const Message = request.body.text;
  if ( !Message) {
    return response.status(400).json({
      status: "error",
      msg: "Required Data are missing",
    });
  }
  const contactusReportObject = new ContactusReportModule(Message);

  const ContactUsReportSchema = joi.object({
    Message: joi
      .string()
      .not()
      .empty()
      .min(3)
      .max(1000)
      .pattern(/[a-z A-Z]{0,1000}/)
      .required(),
  
  });

  const joiError = ContactUsReportSchema.validate(contactusReportObject);
  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }
  knex("users")
  .select("*")
  .where("id", "=", tokenPayload.userId)
  .then((Data) => 
  { if (Data[0]) 
    {
      knex("contactus_report")
      .insert({
        message: contactusReportObject.Message,
        users_id: tokenPayload.userId,
        created_at:new Date(),
      })
      .then((data) => {
        response.status(201).json({
          status: "ok",
          msg: "Your Report Created you can check  your messges each period",
        });
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({
          status: "error",
          msg: "500 Internal Server",
        });
      });

    }
    else {
      response.status(400).json({
        status: "error",
        msg: "You must sign up first to be exist on our system",
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

// Delete Report
exports.DeletecontactusReport = (request, response) => {
  const knex = request.app.locals.knex;
  const Report_id = request.params.id;
 //remove Bearer from authorization header and remove extra spaces
 const token = request.headers.authorization.replace("Bearer", "").trim();
 // decode token and get payload json
 var tokenPayload = jwt.decode(token, { json: true });
 console.log("tokenPayload: ", tokenPayload);
 
  if (!Report_id) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }
  
  if ( tokenPayload.userTypeId == 3 ) 
  {
   
    knex("contactus_report")
    .select("*")
    .where('id', Report_id )  
    .then(userNametList => {
       if (userNametList.length === 0) 
      { 
        response.status(500).json({
          status: "error",
          msg: "your report id not exist on our system??-->3",
        })
      }
      else
      {  
         knex("contactus_report")
          .where('id', Report_id )
          .update({ is_deleted: 1 })
          .then((ReportData) => {
            response.status(201).json({
              status: "ok",
              msg: "Report deleted successfully",
            });
        })
        .catch((error) => 
        {
          console.log(error);
          response.status(500).json({
            status: "error",
            msg: "500 Internal Server Error",
          });

        })
      }
    
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });   
  }

  else
   {
      response.status(500).json({
        status: "error",
        msg: "you have no access to delete this property",
      })
  }
};



//Get contact us reports
exports.ShowcontactusReport = (request, response) => {
  const knex = request.app.locals.knex;
  const token = request.headers.authorization.replace("Bearer", "").trim();
  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);
   
  knex()
  .select(
    "contactus_report.*",
    "user.first_name as property_Report_created_by_first_name",
    "user.last_name as  property_Report_created_by_f_last_name",
    "user.email as property_created_by_email",
    "user.phone as property_created_by_phone",
    "user_types.name as user_types",
  )
  .from("contactus_report as contactus_report")
 .leftJoin( "users as user",  
            "user.id",         
            "contactus_report.users_id"
           )
.leftJoin(
            "user_types as user_types",
            "user.user_type_id",
            "user_types.id"
            )
  .where("contactus_report.is_deleted", "=", 0)
    .then((ReportData) => {
        if ( tokenPayload.userTypeId == 3 ) 
        { response.status(200).json(ReportData); }
        else
         { 
              response.status(500).json({
              status: "error",
              msg: "you have no access to delete this property",
            })
        }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
};


// get property by id
exports.getContactusReportByUserId = (request, response) => {
    const knex = request.app.locals.knex;
    const User_id = request.params.id;
 //remove Bearer from authorization header and remove extra spaces
 const token = request.headers.authorization.replace("Bearer", "").trim();
 // decode token and get payload json
 var tokenPayload = jwt.decode(token, { json: true });
 console.log("tokenPayload: ", tokenPayload);

    knex()
      .select(
        "contactus_report.*",
        "user.first_name as property_Report_created_by_first_name",
        "user.last_name as  property_Report_created_by_f_last_name",
        "user.email as property_created_by_email",
        "user.phone as property_created_by_phone",
        "user_types.name as user_types",

      )
      .from("contactus_report as contactus_report")
   
     .leftJoin( "users as user",  
                "user.id",         
                "contactus_report.users_id"
               )
    .leftJoin(
                "user_types as user_types",
                "user.user_type_id",
                "user_types.id"
                )
      .where("user.id", "=", User_id)
      .andWhere("contactus_report.is_deleted", "=", 0)
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

  
//send message function
exports.sendMessage = (request, response) => {
  const knex = request.app.locals.knex;

  const receiver_id = request.params.id;
  const message_body = "Hello sir i will help you in your problem can you just wait me <3";
 const tokentest = request.headers.authorization;
  console.log("tokentest: ", tokentest);
  
  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  if (!receiver_id ) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const messageModel = new message(
    tokenPayload.userId,
    receiver_id,
    message_body,
  );

  const messageSchema = joi.object({
    sender_id: joi.number().required(),
    message_body: joi.string().min(1).max(450).required(),
    receiver_id: joi.number().required(),
  });

  const joiError = messageSchema.validate(messageModel);

  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }

  knex("users")
    .where("id", "=", receiver_id)
    .andWhere("is_deleted", "=", 0)
    .then((receiver) => {
      if (receiver[0]) {
        knex("message")
          .insert({
            message_body: messageModel.message_body,
            receiver_id: messageModel.receiver_id,
            created_at: new Date(),
            sender_id: tokenPayload.userId,
          })
          .then((data) => {
            console.log("data:", data);
            response.status(201).json({
              status: "ok",
              msg: "message sent successfully",
            });
          })
          .catch((error) => {
            console.log("error: ", error);
            response.status(500).json({
              status: "error",
              exception: error,
              msg: "500 Internal Server Error",
            });
          });
      } else {
        return response.status(400).json({
          status: "error",
          msg: "receiver not found ",
        });
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