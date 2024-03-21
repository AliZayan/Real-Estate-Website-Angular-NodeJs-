class Property {
  constructor(
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
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.youtube_url = youtube_url;
    this.region_id = region_id;
    this.rooms_number = rooms_number;
    this.bathrooms_number = bathrooms_number;
    this.floors_number = floors_number;
    this.latitude = latitude;
    this.longitude = longitude;
    this.property_category_id = property_category_id;
    this.property_status_id = property_status_id;
    this.image_url = image_url;
    this.feature_ids = feature_ids;
    this.content_sequres = content_sequres;

  }
}
module.exports = Property;
