const bcrypt = require("bcrypt");
const property = require("../Modules/property");
const UserFavorite = require("../Modules/user_favorite");
const jwt = require("jsonwebtoken");
const joi = require("joi");

//add property function
exports.addProperty = (request, response) => {
  const knex = request.app.locals.knex;

  const title = request.body.title;
  const price = request.body.price;
  const description = request.body.description;
  const youtube_url = request.body.youtube_url;
  const region_id = request.body.region_id;
  const rooms_number = request.body.rooms_number;
  const bathrooms_number = request.body.bathrooms_number;
  const floors_number = request.body.floors_number;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  const property_category_id = request.body.property_category_id;
  const image_url = request.body.image_url;
  const property_status_id = request.body.property_status_id;
  const feature_ids = request.body.feature_ids;
  const content_sequres = request.body.square;


  if (
    !title ||
    !price ||
    !rooms_number ||
    !bathrooms_number ||
    !floors_number ||
    !property_category_id ||
    !property_status_id||
    !content_sequres
  ) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const propertyModel = new property(
    title,
    price,
    description,
    youtube_url,
    region_id,
    rooms_number,
    bathrooms_number,
    floors_number,
    latitude,
    longitude,
    property_category_id,
    property_status_id,
    image_url,
    feature_ids,
    content_sequres
  );

  const propertySchema = joi.object({
    title: joi.string().min(3).max(1000).required(),
    price: joi.number().required(),
    description: joi.string().min(3).max(20000).required(),
    youtube_url: joi.string().uri().min(10).required(),
    region_id: joi.number().required(),
    rooms_number: joi.number().required(),
    bathrooms_number: joi.number().required(),
    floors_number: joi.number().required(),
    latitude: joi.alternatives().try(joi.number()),
    longitude: joi.alternatives().try(joi.number()),
    property_category_id: joi.number().required(),
    property_status_id: joi.number().required(),
    image_url: joi.string().required(),
    feature_ids: joi.alternatives().try(joi.array()),
    content_sequres:joi.number().required(),
  });

  const joiError = propertySchema.validate(propertyModel);

  if (joiError.error) {
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }
  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  knex("properties")
    .insert({
      title: propertyModel.title,
      price: propertyModel.price,
      description: propertyModel.description,
      youtube_url: propertyModel.youtube_url,
      region_id: propertyModel.region_id,
      rooms_number: propertyModel.rooms_number,
      bathrooms_number: propertyModel.bathrooms_number,
      floors_number: propertyModel.floors_number,
      latitude: propertyModel.latitude,
      longitude: propertyModel.longitude,
      property_category_id: propertyModel.property_category_id,
      property_status_id: propertyModel.property_status_id,
      image_url: propertyModel.image_url,
      created_at: new Date(),
      created_by: tokenPayload.userId,
      square:propertyModel.content_sequres,
      is_deleted: false,
    })
    .then((data) => {
      console.log("query result data: ", data);
      const property_id = data[0];
      console.log(feature_ids);
      const property_features_arr = feature_ids.map((feature_id) => {
        return { property_id: property_id, feature_id: feature_id };
      });
      console.log(property_features_arr);
      knex("property_features")
        .insert(property_features_arr)
        .then((data) => {
          console.log("query result data: ", data);
          response.status(201).json({
            status: "ok",
            msg: "property created successfully",
          });
        })
        .catch((error) => {
          console.log("catch error: ", error);
          response.status(500).json({
            status: "error",
            exception: error,
            msg: "500 Internal Server Error",
          });
        });
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

//delete property function
exports.deleteProperty = (request, response) => {
  const knex = request.app.locals.knex;
  const property_id = request.params.id;
  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);
  knex("properties")
    .where("id", "=", property_id)
    .andWhere("is_deleted", "=", 0)
    .select("created_by")
    .then((data) => {
      if (data[0]) {
        if (
          tokenPayload.userId == data[0].created_by ||
          tokenPayload.userTypeId == 3
        ) {
          var deletePropertyPromise = knex("properties")
            .where("id", "=", property_id)
            .update({ is_deleted: 1 });
          var deletePropertyFeatures = knex("property_features")
            .where("property_id", "=", property_id)
            .delete();
          var deletePropertyUserFavorites = knex("user_favorites")
            .where("property_id", "=", property_id)
            .delete();

          Promise.all([
            deletePropertyPromise,
            deletePropertyFeatures,
            deletePropertyUserFavorites,
          ])
            .then((data) => {
              response.status(200).json({
                status: "ok",
                msg: "property deleted successfully",
              });
            })
            .catch((error) => {
              console.log("catch error: ", error);
              response.status(500).json({
                status: "error",
                exception: error,
                msg: "500 Internal Server Error",
              });
            });
        } else {
          response.status(500).json({
            status: "error",
            msg: "you have no access to delete this property",
          });
        }
      } else {
        response.status(500).json({
          status: "error",
          msg: "property not found",
        });
      }
    });
};

//edit property function
exports.editProperty = (request, response) => {
  const knex = request.app.locals.knex;
  const property_id = request.params.id;
  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);
  knex("properties")
    .where("id", "=", property_id)
    .andWhere("is_deleted", "=", 0)
    .select("created_by")
    .then((data) => {
      if (data[0]) {
        if (
          tokenPayload.userId == data[0].created_by ||
          tokenPayload.userTypeId == 3
        ) {
          return saveEditProperty(request, response, property_id);
        } else {
          response.status(500).json({
            status: "error",
            msg: "you have no access to edit this property",
          });
        }
      } else {
        response.status(404).json({
          status: "error",
          msg: " property not found",
        });
      }
    });
};

function saveEditProperty(request, response, property_id) {
  const knex = request.app.locals.knex;

  const title = request.body.title;
  const price = request.body.price;
  const description = request.body.description;
  const youtube_url = request.body.youtube_url;
  const region_id = request.body.region_id;
  const rooms_number = request.body.rooms_number;
  const bathrooms_number = request.body.bathrooms_number;
  const floors_number = request.body.floors_number;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  const property_category_id = request.body.property_category_id;
  const property_status_id = request.body.property_status_id;
  let image_url = request.body.image_url;
  const feature_ids = request.body.feature_ids;
  const content_sequres = request.body.square;

  console.log("img:",image_url );
  if (
    !title ||
    !price ||
    !rooms_number ||
    !bathrooms_number ||
    !floors_number ||
    !property_category_id ||
    !property_status_id||
    !content_sequres
  ) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const propertyModel = new property(
    title,
    price,
    description,
    youtube_url,
    region_id,
    rooms_number,
    bathrooms_number,
    floors_number,
    latitude,
    longitude,
    property_category_id,
    property_status_id,
    image_url,
    feature_ids,
    content_sequres
  );

  const propertySchema = joi.object({
    title: joi.string().min(3).max(1000).required(),
    price: joi.number().required(),
    description: joi.string().min(3).max(20000).required(),
    youtube_url: joi.string().uri().min(10).required(),
    region_id: joi.number().required(),
    rooms_number: joi.number().required(),
    bathrooms_number: joi.number().required(),
    floors_number: joi.number().required(),
    latitude: joi.alternatives().try(joi.number()),
    longitude: joi.alternatives().try(joi.number()),
    property_category_id: joi.number().required(),
    property_status_id: joi.number().required(),
    image_url: joi.any(),
    feature_ids: joi.alternatives().try(joi.array()),
    content_sequres:joi.number().required(),
  });

  const joiError = propertySchema.validate(propertyModel);

  if (joiError.error) {
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }
if (image_url==null||image_url==""||image_url==undefined|| image_url.length == 0) {
  knex("properties")
  .where("id", "=", property_id)
  .andWhere("is_deleted", "=", 0)
  .update({
    title: propertyModel.title,
    price: propertyModel.price,
    description: propertyModel.description,
    youtube_url: propertyModel.youtube_url,
    region_id: propertyModel.region_id,
    rooms_number: propertyModel.rooms_number,
    bathrooms_number: propertyModel.bathrooms_number,
    floors_number: propertyModel.floors_number,
    latitude: propertyModel.latitude,
    longitude: propertyModel.longitude,
    property_category_id: propertyModel.property_category_id,
    property_status_id: propertyModel.property_status_id,
    square:propertyModel.content_sequres,
    is_deleted: false,
  })
  .then((data) => {
    const property_features_arr = feature_ids.map((feature_id) => {
      return { property_id: property_id, feature_id: feature_id };
    });
    console.log(property_features_arr);

    knex("property_features")
      .where("property_id", "=", property_id)
      .delete()
      .then((data) => {
        knex("property_features")
          .insert(property_features_arr)
          .then((data) => {
            console.log("query result data: ", data);
            response.status(200).json({
              status: "ok",
              msg: "property updated successfully",
            });
          })
          .catch((error) => {
            console.log("catch error: ", error);
            response.status(500).json({
              status: "error",
              exception: error,
              msg: "500 Internal Server Error",
            });
          });
      })
      .catch((error) => {
        console.log("catch error: ", error);
        response.status(500).json({
          status: "error",
          exception: error,
          msg: "500 Internal Server Error",
        });
      });
  })
  .catch((error) => {
    console.log("catch error: ", error);
    response.status(500).json({
      status: "error",
      exception: error,
      msg: "500 Internal Server Error",
    });
  });

}
else{
  knex("properties")
    .where("id", "=", property_id)
    .andWhere("is_deleted", "=", 0)
    .update({
      title: propertyModel.title,
      price: propertyModel.price,
      description: propertyModel.description,
      youtube_url: propertyModel.youtube_url,
      region_id: propertyModel.region_id,
      rooms_number: propertyModel.rooms_number,
      bathrooms_number: propertyModel.bathrooms_number,
      floors_number: propertyModel.floors_number,
      latitude: propertyModel.latitude,
      longitude: propertyModel.longitude,
      property_category_id: propertyModel.property_category_id,
      property_status_id: propertyModel.property_status_id,
      image_url: propertyModel.image_url,
      square:propertyModel.content_sequres,
      is_deleted: false,
    })
    .then((data) => {
      const property_features_arr = feature_ids.map((feature_id) => {
        return { property_id: property_id, feature_id: feature_id };
      });
      console.log(property_features_arr);

      knex("property_features")
        .where("property_id", "=", property_id)
        .delete()
        .then((data) => {
          knex("property_features")
            .insert(property_features_arr)
            .then((data) => {
              console.log("query result data: ", data);
              response.status(200).json({
                status: "ok",
                msg: "property updated successfully",
              });
            })
            .catch((error) => {
              console.log("catch error: ", error);
              response.status(500).json({
                status: "error",
                exception: error,
                msg: "500 Internal Server Error",
              });
            });
        })
        .catch((error) => {
          console.log("catch error: ", error);
          response.status(500).json({
            status: "error",
            exception: error,
            msg: "500 Internal Server Error",
          });
        });
    })
    .catch((error) => {
      console.log("catch error: ", error);
      response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });

  }
    //end knex
}

//get my properties
exports.getMyProperties = (request, response) => {
  const knex = request.app.locals.knex;

  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);
  var query = getPropertyQuery(knex);

  query
    .where("property.is_deleted", "=", 0)
    .andWhere("property.created_by", "=", tokenPayload.userId)
    .then((properties) => {
      response.status(200).json(properties);
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

//get my properties
exports.searchProperties = (request, response) => {
  const knex = request.app.locals.knex;

  const city_id = request.body.city_id;
  const region_id = request.body.region_id;
  const property_status_id = request.body.property_status_id;
  const property_category_id = request.body.property_category_id;
  const price_min = request.body.price_min;
  const price_max = request.body.price_max;
  var query = getPropertyQuery(knex).where("property.is_deleted", "=", 0);

  if (property_status_id) {
    query.andWhere("property.property_status_id", "=", property_status_id);
  }
  if (property_category_id) {
    query.andWhere("property.property_category_id", "=", property_category_id);
  }
  if (region_id) {
    query.andWhere("property.region_id", "=", region_id);
  } else if (city_id) {
    query.andWhere("city.id", "=", city_id);
  }

  if (price_min) {
    query.andWhere("property.price", ">=", price_min);
  }

  if (price_max) {
    query.andWhere("property.price", "<=", price_max);
  }
  query
    .then((properties) => {
      response.status(200).json(properties);
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
exports.getPropertyById = (request, response) => {
  const knex = request.app.locals.knex;
  const property_id = request.params.id;
  knex()
    .select(
      "property.*",
      "category.name as property_category_name",
      "city.id as property_city_id",
      "city.name as property_city_name",
      "status.name as property_status_name",
      "property_feature.feature_id as feature_id",
      "feature.name as feature_name",
      "region.name as property_region_name",
      "user.first_name as property_created_by_first_name",
      "user.last_name as property_created_by_last_name",
      "user.email as property_created_by_email",
      "user.phone as property_created_by_phone",
      "user.profile_image_url as profile_image_url",
      "user_types.name as user_types"
      
    )
    .from("properties as property")
    
    .leftJoin(
      "property_categories as category",
      "property.property_category_id",
      "category.id"
    )
    .leftJoin(
      "property_statuses as status",
      "property.property_status_id",
      "status.id"
    )
   .leftJoin("users as user", "property.created_by", "user.id")
   .leftJoin(
    "user_types as user_types",
    "user.user_type_id",
    "user_types.id"
  )
    .leftJoin("regions as region", "property.region_id", "region.id")
    .leftJoin("cities as city", "region.city_id", "city.id")
    .leftJoin(
      "property_features as property_feature",
      "property.id",
      "property_feature.property_id"
    )
    .leftJoin(
      "features as feature",
      "property_feature.feature_id",
      "feature.id"
    )   
    .where("property.id", "=", property_id)
    .andWhere("property.is_deleted", "=", 0)
    .then((property) => {
      var featuresList = groupFeatures(property);
      var res = property[0];
      if (res) {
        res.feature_id = undefined;
        res.feature_name = undefined;
        res.features = featuresList;
        response.status(200).json(res);
      } else {
        response.status(500).json({
          status: "error",
          msg: "Property not found",
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

function groupFeatures(property) {
  var result = property.reduce(function (r, a) {
    r["features"] = r["features"] || [];
    r["features"].push({
      feature_id: a.feature_id,
      feature_name: a.feature_name,
    });
    return r;
  }, Object.create(null));
  return result.features;
}

//#region add user favorite

//add property Favorite function
exports.addUserFavorite = (request, response) => {
  const knex = request.app.locals.knex;
  //remove Bearer from authorization header and remove extra spaces
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);

  const property_id = request.body.property_id;
  const is_favorite = request.body.is_favorite;

  if (!property_id || is_favorite == undefined) {
    return response.status(400).json({
      status: "error",
      msg: "Required fields are missing",
    });
  }

  const userFavoriteModel = new UserFavorite(
    property_id,
    tokenPayload.userId,
    is_favorite
  );

  const propertySchema = joi.object({
    property_id: joi.number().required(),
    is_favorite: joi.boolean().required(),
    user_id: joi.number().required(),
  });

  const joiError = propertySchema.validate(userFavoriteModel);

  if (joiError.error) {
    console.log(joiError.error.details);
    return response.status(400).json({
      status: "error",
      msg: joiError.error.details,
    });
  }
  knex("properties")
    .where("id", "=", property_id)
    .andWhere("is_deleted", "=", 0)
    .select("*")
    .then((data) => {
      if (data[0]) {
        knex("user_favorites")
          .where("property_id", "=", property_id)
          .andWhere("user_id", "=", tokenPayload.userId)
          .then((data) => {
            if (data[0]) {
              editUserFavorite(
                request,
                response,
                userFavoriteModel,
                property_id,
                tokenPayload.userId
              );
            } else {
              insertUserFavorite(request, response, userFavoriteModel);
            }
          })
          .catch((error) => {
            console.log(error);
            response.status(500).json({
              status: "error",
              exception: error,
              msg: "500 Internal Server Error",
            });
          });
      } else {
        response.status(404).json({
          status: "error",
          msg: "property not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });
};

function editUserFavorite(
  request,
  response,
  userFavoriteModel,
  property_id,
  user_id
) {
  const knex = request.app.locals.knex;
  knex("user_favorites")
    .where("property_id", "=", property_id)
    .andWhere("user_id", "=", user_id)
    .update({
      is_deleted: !userFavoriteModel.is_favorite,
    })
    .then((data) => {
      console.log("data");
      console.log(data);
      response.status(201).json({
        status: "ok",
        msg: "user favorite updated successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });
}

function insertUserFavorite(request, response, userFavoriteModel) {
  const knex = request.app.locals.knex;
  knex("user_favorites")
    .insert({
      property_id: userFavoriteModel.property_id,
      user_id: userFavoriteModel.user_id,
      is_deleted: !userFavoriteModel.is_favorite,
    })
    .then((data) => {
      console.log("data");
      console.log(data);
      response.status(201).json({
        status: "ok",
        msg: "user favorite created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        exception: error,
        msg: "500 Internal Server Error",
      });
    });
}
//#endregion

//check if property is in user favorites
exports.isFavorite = (request, response) => {
  const knex = request.app.locals.knex;
  const id = request.params.id;
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);
  knex("properties")
    .where("id", "=", id)
    .andWhere("is_deleted", "=", 0)
    .select("*")
    .then((data) => {
      if (data[0]) {
        knex("user_favorites")
          .where("property_id", "=", id)
          .andWhere("user_id", "=", tokenPayload.userId)
          .andWhere("is_deleted", "=", 0)
          .select("*")
          .then((data) => {
            console.log("query result data: ", data);
            if (data[0]) {
              response.status(200).json(data);
            } else {
              response.status(400).json({
                status: "not found",
                msg: "property is not in your favorites",
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
      } else {
        response.status(404).json({
          status: "error",
          msg: "property not found",
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

//get my favorite properties list
exports.getMyFavoriteProperties = (request, response) => {
  const knex = request.app.locals.knex;
  const token = request.headers.authorization.replace("Bearer", "").trim();

  // decode token and get payload json
  var tokenPayload = jwt.decode(token, { json: true });
  console.log("tokenPayload: ", tokenPayload);
  var query = getPropertyQuery(knex);
  query
    .join(
      "user_favorites as favorite",
      function () {
        this.on("property.id", "=", "favorite.property_id")
          .on("favorite.user_id", "=", tokenPayload.userId)
          .on("favorite.is_deleted", "=", 0);
      },
      "inner"
    )
    .where("property.is_deleted", "=", 0)

    .then((data) => {
      console.log("query result data: ", data);
      response.status(200).json(data);
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

function getPropertyQuery(knex) {
  return knex()
    .select(
      "property.*",
      "category.name as property_category_name",
      "status.name as property_status_name",
      "city.id as property_city_id",
      "city.name as property_city_name",
      "region.name as property_region_name",
      "user.first_name as property_created_by_first_name",
      "user.last_name as property_created_by_last_name",
      "user.email as property_created_by_email",
      "user.phone as property_created_by_phone"
    )
    .from("properties as property")
    .leftJoin(
      "property_categories as category",
      "property.property_category_id",
      "category.id"
    )
    .leftJoin(
      "property_statuses as status",
      "property.property_status_id",
      "status.id"
    )
    .leftJoin("regions as region", "property.region_id", "region.id")
    .leftJoin("cities as city", "region.city_id", "city.id")
    .leftJoin("users as user", "property.created_by", "user.id");
}
//return types of the  property as we dfined 
//appartment

//get my properties
exports.getAllApartement = (request, response) => {
  const knex = request.app.locals.knex;
  const property_category_id=1;
  var query = getPropertyQuery(knex).where("property.is_deleted", "=", 0);

  query
    .where("property.property_category_id", "=", property_category_id)
    .then((properties) => {
      response.status(200).json(properties);
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

/////////////// Get All townHouse 

exports.getAllTownHouse = (request, response) => {
  const knex = request.app.locals.knex;
  const property_category_id=3;
  var query = getPropertyQuery(knex).where("property.is_deleted", "=", 0);

  query
    .where("property.property_category_id", "=", property_category_id)
    .then((properties) => {
      response.status(200).json(properties);
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


/// get all shop 
exports.getAllshop = (request, response) => {
  const knex = request.app.locals.knex;
  const property_category_id=6;
  
  var query = getPropertyQuery(knex);

  query
    .where("property.is_deleted", "=", 0)
    .andWhere("property.property_category_id", "=", property_category_id)
    .then((properties) => {
      response.status(200).json(properties);
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




//// get all ware house


exports.getAllwareHouse = (request, response) => {
  const knex = request.app.locals.knex;
  const property_category_id=7;
  
  var query = getPropertyQuery(knex);

  query
    .where("property.is_deleted", "=", 0)
    .andWhere("property.property_category_id", "=", property_category_id)
    .then((properties) => {
      response.status(200).json(properties);
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


//// get all office 


exports.getAlloffice = (request, response) => {
  const knex = request.app.locals.knex;
  const property_category_id=4;
 
  var query = getPropertyQuery(knex);

  query
    .where("property.is_deleted", "=", 0)
    .andWhere("property.property_category_id", "=", property_category_id)
    .then((properties) => {
      response.status(200).json(properties);
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

exports.getAllvilla = (request, response) => {
  const knex = request.app.locals.knex;
  const property_category_id=2;
  var query = getPropertyQuery(knex);

  query
    .where("property.is_deleted", "=", 0)
    .andWhere("property.property_category_id", "=", property_category_id)
    .then((properties) => {
      response.status(200).json(properties);
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