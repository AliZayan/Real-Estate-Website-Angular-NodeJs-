class user {
  constructor(
    first_name,
    last_name,
    email,
    password,
    phone,
    address,
    profile_image_url,
    id_card_image_url,
    user_type_id,
    region_id,
    gender
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.profile_image_url = profile_image_url;
    this.id_card_image_url = id_card_image_url;
    this.user_type_id = user_type_id;
    this.region_id = region_id;
    this.gender = gender;
  }
}
module.exports = user;
