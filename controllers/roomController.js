"use strict"
const {pool} = require("../database/db")
/**
 * Create a room
 * @param {object} req 
 * @param {object} res 
 * @return {object} Room object
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

    console.log(values);

    try{
        const rows = await pool.query(createQuery,values);
        return res.status(201).send({
            status:201,
            message: "Room successfully created",
            data: rows.rows
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
 * @param {*=object} res 
 */
const getAllRooms = async(req,res)=>{
    const queryText = `SELECT * FROM rooms`;
    try {
        const rows = await pool.query(queryText);
       return res.status(200).send({
                status:200,
                message:"All rooms loaded successfully",
                totalRowCount: rows.rowCount,
                data:rows.rows
            });
    }
    catch(error) {
        res.status(400).send({
            status:400,
            message: error
        })
    }
}


module.exports = {createRoom,getAllRooms};
