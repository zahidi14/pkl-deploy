var mongoose = require("mongoose");

const reservationSchema = require("./reservation").schema;

var mobilSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  tipe: String,
  harga: String,
  isAvailable: Boolean,
  reservation: {
    required: false,
    type: reservationSchema
  }
});
var Mobil = mongoose.model("Mobil", mobilSchema);

module.exports.model = Mobil;
module.exports.schema = mobilSchema;
