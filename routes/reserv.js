var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

// Parameters:
// {
//   "date": String ("Dec 02 2019 06:00"),
//   "mobil": mobil id,
// 	"name": String,
// 	"phone": String,
// 	"email": String
// }

router.get("/", function(req, res)  {
  Day.find({})
  .then((result) =>{
    res.json(result);
  })
  .catch((err) => {
    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
  });
});

router.post("/", function(req, res, next) {
  Day.find({ date: req.body.date }, (err, days) => {
    if (!err) {
      if (days.length > 0) {
        let day = days[0];
        day.mobils.forEach(mobil => {
          if (mobil._id == req.body.mobil) {
            // The correct mobil is mobil
            if(mobil.isAvailable === false){
              mobil.reservation = new Reservation({
                name: "",
                phone: "",
                email: ""
              });
              mobil.isAvailable = true;
              

              day.save(err => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("del");
                  res.status(200).send("dele");
                }
              });
            }else{
              console.log("meow");
            }
           
          } 
        });
      } else {
        console.log("Day not found");
      }
    }
  });
});



module.exports = router;
