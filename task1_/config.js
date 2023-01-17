const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/myDatabase")
  .then(() => {
    console.log("Connection Successful...");
  })
  .catch(() => {
    console.log("Connection is not stablished , TRY again..");
  });