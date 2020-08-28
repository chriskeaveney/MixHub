const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Record = new Schema({
    record_title: {
      type: String
    },
    record_artist: {
      type: String
    },
    record_description: {
      type: String
    },
    record_price: {
      type: Number
    },
    record_genre: {
      type: String
    },
    record_size: {
      type: String
    },
    record_type: {
      type: String
    },
    record_image: {
      type: String
    },
    record_owner: {
      type: String
    },
    record_owner_name: {
      type: String
    },
    record_owner_email: {
      type: String
    },
    record_owner_location: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Record = mongoose.model("records", Record);
