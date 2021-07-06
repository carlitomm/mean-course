const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const mongoose = require('mongoose');

mongoose.connect(
  process.env.DATABASE_MONGO_CLUSTER0_MEAN_COURSE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('connected to database');
  }).catch(err => {
    console.log(err)
  });

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use( "/api/post" ,postsRoutes);
app.use( "/api/user" ,userRoutes);

module.exports = app;
