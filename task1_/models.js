const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/myDatabase")
  .then(() => {
    console.log("Connection Successful...");
  })
  .catch(() => {
    console.log("Connection is not eastablished , TRY again..");
  });

const objectSchema = new mongoose.Schema(
    {
        _id: Number,
        user: String,
        text: String,
        __v: Number,
        source: String,
        updatedAt: Date,
        type: String,
        createdAt: Date,
        deleted: Boolean,
        used: Boolean,
      
});

module.exports = mongoose.model('details',objectSchema)