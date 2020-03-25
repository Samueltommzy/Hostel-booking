const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const endpoints = require("./routes/rooms");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/api/v1",endpoints);

module.exports = { app };
