// Processes allMobils JSON file into Mongo mobil objects

var mongoose = require("mongoose");
const Mobil = require("../models/mobil").model;
const fs = require("fs");

let mobilData = fs.readFileSync(__dirname + "/allMobils.json");
mobilData = JSON.parse(mobilData).mobils;

let allMobils = [];
mobilData.forEach(mobil => {
  allMobils.push(new Mobil(mobil));
});

module.exports = allMobils;
