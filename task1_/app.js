const express = require("express");
const Data = require("./models");
const app = express();

app.use(express.json());

//getAllData
app.get("/getAllData", async (_, res) => {
  Data.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "Some error occurred while retrieving All data.",
      });
    });
  // let data = await Data.find();
  // res.send(data);
});

//Get data with id
app.get("/getData/:_id", async (req, res) => {
  const id = req.params._id;
  Data.findById(req.params)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found data with id " + `${id}` });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving data with id=" + `${id}` });
    });
  // try{
  //   const data=await Data.find(req.params)
  //   res.status(201).json(data)
  // }catch(error){
  //   res.status(500).json({msg:error})
  // }
});

//Post
app.post("/add", async (req, res) => {
  let data = new Data(req.body);
  // Validate request
  if (!req.body) {
    res.status(404).send({ message: "Content can not be empty!" });
    return;
  }
  data
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Data.",
      });
    });
  // let result = await data.save();
  // console.log(req.body);
  // res.send(result);
});

//delete
app.delete("/:_id", async (req, res) => {
  const id = req.params._id;

  Data.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete Data with id=" +
            `${id}` +
            ". Maybe data was not found!",
        });
      } else {
        res.send({
          message: "Data deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete data with id=" + `${id}`,
      });
    });
  // console.log(req.params);
  // let data = await Data.deleteOne(req.params);
  // res.send(data);
});

//put the data
app.put("/:_id", async (req, res) => {
  if (!Data(req.body)) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params._id;

  Data.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update Data with id=" + `${id}` + ". Maybe data not found!",
        });
      } else res.send({ message: "Data updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Data with id=" + `${id}`,
      });
    });
  // console.log(req.params);
  // let data = await Data.updateOne(req.params, { $set: req.body });
  // res.send(data);
});

//patch the data
app.patch("/:_id", async (req, res) => {
  if (!Data(req.body)) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params._id;

  Data.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update Data with id=" + `${id}` + ". Maybe data not found!",
        });
      } else res.send({ message: "Data updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Data with id=" + `${id}`,
      });
    });
  // console.log(req.params);
  // let data = await Data.findByIdAndUpdate(req.params, { $set: req.body });
  // res.send(data);
});

//delete all
app.delete("/:_id", async (_, res) => {
  Data.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} All Data deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
});

app.all("*", (_, res) => {
  res.status(500).send({ message: "ROUTE NOT FOUND" });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....!");
});
