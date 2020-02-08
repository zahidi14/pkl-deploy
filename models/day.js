var mongoose = require("mongoose");
const mobilSchema = require("./mobil").schema;

var daySchema = new mongoose.Schema({
  date: Date,
  mobils: [mobilSchema]
});
var Day = mongoose.model("Day", daySchema);

module.exports.model = Day;
module.exports.schema = daySchema;
