const { Router } = require("express");
const controllers = require("../controllers/roomController");

const router = Router();
router.get('/',(req,res)=> res.status(200).send({status:200,message:"This is a test route"}));
router.post('/rooms',controllers.createRoom);
router.get('/allrooms',controllers.getAllRooms);
router.get('/rooms',controllers.getAllAvailableRooms);
router.get('/rooms/:id',controllers.getRoomById);
router.get('/rooms/type/:config_id',controllers.getRoomsByType);
router.delete('/rooms/:id',controllers.deleteRoom);
module.exports =router;
