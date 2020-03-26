module.exports = ()=>{
    const express = require("express");
    const api = express.Router();
    const rooms = require("./rooms");
    const bookings = require("./bookings");

    api.use("/",rooms);
    api.use("/",bookings);

    return api;
}