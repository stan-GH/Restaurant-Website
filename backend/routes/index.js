var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const ReservationDate = require("../schema/ReservationDate");
const Data = require("../schema/UserData")


const dbRoute =
    "mongodb+srv://dbUser:dbUserPassword@cluster0.latlx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    mongoose.connect(dbRoute, { useUnifiedTopology: true });
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

router.get("/:year/:month/:day", function(req, res, next) {
  ReservationDate.findOne({month: req.params.month, year: req.params.year}, function(err, results) {
    if (err) {
      return res.json({success: false, error: err});
    } else {
      return res.json({success: true, data: results.dates.get(req.params.day)});
    }
  })
});

router.post("/new", function(req, res, next) {
  let reservationData = new ReservationDate({
    month: req.body.month,
    year: req.body.year,
    dates: new Map()
  });

  reservationData.save((err) => {
    if (err) {
      return res.json({success: false, error: err});
    } else {
      return res.json({success: true});
    }
  })
});

router.post("/", function(req, res, next) {
  let newUser = new Data({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dateReserved: req.body.dateReserved,
      timeReserved: req.body.timeReserved
  });

  newUser.save((err) => {
    if (err) {
      return res.json({success: false, error: err});
    }else {
      return res.json({success: true});
    }
  });
});

router.put("/time", function(req, res, next) {
  ReservationDate.findOne({month: req.body.month, year: req.body.year}, function(err, results) {
    if (err) {
      return res.json({success: false, error: err});
    } else {
      if (results.dates.get(req.body.day) == null) {
        results.dates.set(req.body.day, [req.body.timeReserved]);
      } else {
        results.dates.get(req.body.day).push(req.body.timeReserved);
      }
      ReservationDate.findOneAndUpdate({month: req.body.month, year: req.body.year}, {dates: results.dates}, function(err2, results2) {
        if (err2) {
          return res.json({success: false, error: err});
        } else {
          return res.json({success: true});
        }
      });
    }
  })
})



module.exports = router;
