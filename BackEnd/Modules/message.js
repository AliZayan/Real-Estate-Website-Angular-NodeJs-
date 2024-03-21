class message {
  constructor(sender_id, receiver_id, message_body) {
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.message_body = message_body;
  }
}
module.exports = message;
