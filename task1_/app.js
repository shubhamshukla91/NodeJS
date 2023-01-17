const express = require("express");
const Data = require("./models");
const app = express();

app.use(express.json());

//getAllData
app.get("/getAllData", async (req, res) => {
  let data = await Data.find(req);
  res.send(data);
})

//Get data with id
app.get("/getData/:_id", async (req, res) => {
  // return new Promise((resolve, reject) => {
  //     let data = res.send(Data.find(req.params));
  //   if (data) {
  //     resolve(data);
  //   } else {
  //     reject(`Data with id ${id} not found`);
  //   }
  // });
//   try {
// 	let data = await Data.find(req.params);
// 	  res.send(data);
// } catch (error) {
//   console.log(error)
// }
try{
  const data=await Data.find(req.params)
  res.status(201).json(data)
}catch(error){
  res.status(500).json({msg:error})
}
});

//Post
app.post("/add", async (req, res) => {
  let data = new Data(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
});

//delete
app.delete("/delete/:_id", async (req, res) => {
  console.log(req.params);
  let data = await Data.deleteOne(req.params);
  res.send(data);
});

//put the data
app.put("/update/:_id", async (req, res) => {
  console.log(req.params);
  let data = await Data.updateOne(req.params, { $set: req.body });
  res.send(data);
});

//patch the data
app.patch("/update/:_id", async (req, res) => {
  console.log(req.params);
  let data = await Data.findByIdAndUpdate(req.params, { $set: req.body });
  res.send(data);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....!");
});