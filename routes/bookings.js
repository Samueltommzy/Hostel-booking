"use strict"

const controller = require("../controllers/bookingsController");
const {Router} = require("express");
const router = Router();

router.get('/room/search',controller.roomSearch);
router.post('/room/book',controller.bookRoom);
module.exports = router;
