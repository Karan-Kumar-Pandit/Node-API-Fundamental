const express = require("express");
require("./config");
const usersData = require("./loginData");
const multer = require("multer");

const app = express();
app.use(express.json());

// --------------------------------------------------------

app.get("/getUsers", async (req, res) => {
  let data = await usersData.find();
  res.send(data);
});

// --------------------------------------------------------

app.post("/createUsers", async (req, res) => {
  // console.log(req.body);
  let data = new usersData(req.body);
  const result = await data.save();
  res.send(result);
});

// --------------------------------------------------------

app.put("/updateUsers/:_id", async (req, res) => {
  // console.log(req.params);
  let data = await usersData.updateOne(req.params, {
    $set: req.body,
  });
  res.send(data);
});

// --------------------------------------------------------

app.delete("/deleteUsers/:_id", async (req, res) => {
  // console.log(req.params);
  let data = await usersData.deleteOne(req.params);
  res.send(data);
});

// --------------------------------------------------------

app.get("/search/:key", async (req, res) => {
  console.log(req.params.key);
  let data = await usersData.find({
    $or: [
      { name: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});

// --------------------------------------------------------

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("file_name");

app.post("/uploadfile", upload, (req, resp) => {
  resp.send("file upload");
});

// app.post("/uploadfile", (req, res) => {
//   res.send("file uploaded");
// });

app.listen(4000);
