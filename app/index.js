const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://himanshu_rana:jTGOv04ToNI38y04@cluster0.d9eqp.mongodb.net/form?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected"));

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const FormBuilder = new Schema({
  author: String,
  body: String,
  date: Date,
});

const FormModel = mongoose.model("ModelName", FormBuilder);

app.get("/", async (req, res) => {
  console.log(req.query.id);
  const data = await FormModel.findById(req.query.id);
  console.log(data);
  res.send({ data });
});

app.post("/api/createForm", async (req, res) => {
  try {
    console.log(req.body);
    const data = await FormModel.insertMany(req.body);

    res.send(data);
  } catch (error) {}
});

app.listen("8000", (req, res) => {
  console.log("server started");
});
