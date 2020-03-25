const { Router } = require("express");
const controllers = require("../controllers/roomController");

const router = Router();
router.get('/',(req,res)=> res.status(200).send({status:200,message:"This is a test route"}));
router.post('/rooms',controllers.createRoom);
router.get('/rooms',controllers.getAllRooms);
module.exports =router;
