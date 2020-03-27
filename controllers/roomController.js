"use strict"
const {pool} = require("../database/db");
/**
 * Create a room
 * @param {Object} req 
 * @param {Object} res 
 * @return {Promise} Room object
 */
const createRoom = async(req,res)=>{
    const createQuery = `INSERT INTO 
    rooms(room_type,room_config_id,number_of_beds,price_per_bed,booked_beds,available_beds)
    VALUES($1,$2,$3,$4,$5,$6)
    returning *`;
    const values = [
        req.body.room_type,
        req.body.room_config_id,
        req.body.number_of_beds,
        req.body.price_per_bed,
        req.body.booked_beds,
        req.body.available_beds
    ];

    try{
        const {rows} = await pool.query(createQuery,values);
        return res.status(201).send({
            status:201,
            message: "Room successfully created",
            data: rows
        });
    }
    catch (error) {
        res.status(400).send({
            status:"Unable to create room",
            message: error
        })
    }
    
}
/**
 * Returns all rooms in the database
 * @param {object} req 
 * @param {object} res 
 */
const getAllRooms = async(req,res)=>{
    const queryText = `SELECT * FROM rooms`;
    try {
       const {rows,rowCount} = await pool.query(queryText);
       if(rows.length==0){
        res.status(404).send({
            status:404,
            message:"No rooms"
        });
        return false;
    }
       return res.status(200).send({
                status:200,
                message:"All rooms loaded successfully",
                totalRowCount:rowCount,
                data:rows
            });
    }
    catch(error) {
        res.status(400).send({
            status:400,
            message: error
        })
    }
}
/**
 * Returns all available rooms from the database
 * @param {object} req 
 * @param {object} res 
 */
const getAllAvailableRooms = async(req,res)=>{
    const queryText = `SELECT * FROM rooms WHERE is_room_available=true`;
    try {
        const {rows,rowCount} = await pool.query(queryText);
        if(rows.length==0){
            res.status(404).send({
                status:404,
                message:"No available rooms"
            });
            return false;
        }
        return res.status(200).send({
            status:200,
            message:"All available rooms loaded",
            totalRowCount:rowCount,
            data:rows
        });
    }
    catch (error) {
        res.status(400).send({
            status:400,
            message:error
        });
    }
}
/**
 * Get a room by its id
 * @param {object} req 
 * @param {object} res 
 */
const getRoomById = async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const queryText = `SELECT * FROM rooms WHERE id=${id}`;
    try {
        const {rows} = await pool.query(queryText);
        if (rows.length==0) {
            return res.status(404).send({
                status:404,
                message:"No rooms with the specified id"
            });
        }
        return res.status(200).send({
            status:200,
            message: "Room loaded",
            data:rows
        });
    }
    catch(error){
      return  res.status(400).send({
            status:400,
            message:error
        })
    }
}
/**
 * Returns all the room types with the provided config id
 * @param {object} req 
 * @param {object} res 
 */
const getRoomsByType = async(req,res)=>{
    const room_config_id = req.params.config_id;
    const queryText = `SELECT * FROM rooms WHERE room_config_id=${room_config_id}`;
    try {
        const {rows,rowCount} = await pool.query(queryText);
        if (rows.length==0){
            res.status(404).send({
                status:404,
                message:"No room type with the supplied id"
            });
            return false;
        }
        return res.status(200).send({
            status:200,
            message:"All room type with the id loaded",
            totalRowCount:rowCount,
            data:rows
        });
    }
    catch(error){
        return res.status(400).send({
            status:400,
            message:error
        })
    }
}
/**
 * Deletes a room 
 * @param {object} req 
 * @param {object} res 
 */
const deleteRoom = async(req,res)=>{
    const id = req.params.id;
    const queryText = `DELETE FROM rooms WHERE id=${id}`
    try {
        const {rows,rowCount} = await pool.query(queryText);
        // if (!rows[0]) {
        //     res.status(404).send({
        //         status:404,
        //         message:"room not found"
        //     });
        //     return false;
        // }
        return res.status(200).send({
            status:200,
            message:"Room deleted",
            rowAffected:rowCount
        });
    }
    catch(error){
        res.status(400).send({
            status:400,
            message:error
        })
    }
}


module.exports = {
    createRoom,
    getAllRooms,
    getAllAvailableRooms,
    getRoomById,
    getRoomsByType,
    deleteRoom
};
