"use strict"
const {pool} = require("../database/db");

/**
 * 
 * @param {object} req 
 * @param {object} res 
 */
const roomSearch = async(req,res)=>{
    const no_of_guests = req.query.no_of_guests;
    const queryText = `SELECT * FROM rooms WHERE array_length(available_beds,1)>=${no_of_guests}`;
    try {
        const {rows,rowCount} = await pool.query(queryText);
        if (rows.length==0){
            return res.status(204).send({
                    status:204
                });   
            }
        else{
            res.status(200).send({
                status:200,
                message:"Rooms loaded",
                totalRowCount:rowCount,
                data:rows
            });
       }
    }
    catch(error) {
        res.status(400).send({
            status:400,
            message:error
        });
    }

}
/**
 * Books a room
 * @param {object} req 
 * @param {object} res 
 */
const bookRoom = async(req,res)=>{
    const { room_id,no_of_guests,check_in_date,check_out_date,selected_beds} = req.body;
    let new_check_in = new Date(check_in_date);
    let new_check_out = new Date(check_out_date);
    let resp = {};
    try{
        const searchQuery=`SELECT * FROM rooms where id=${room_id}`; 
        const {rows} = await pool.query(searchQuery);
      
        if (!rows.length){
            res.status(404).send({
                status:404,
                message:"Room not found"
            });
            return false;
        }
        const data = rows[0];
        for (let i =0;i < selected_beds.length;i++){
            if (data["available_beds"].indexOf(selected_beds[i]) != -1) {
                data["booked_beds"].push(selected_beds[i]);
                data["available_beds"].splice(data["available_beds"].indexOf(selected_beds[i]),1);
            }
        }
        let is_room_available = data["available_beds"].length==0?false:true;
        let booked_beds = data["booked_beds"];
        let available_beds = data["available_beds"];
        try{
            const updateQuery = `UPDATE rooms SET available_beds=$1,booked_beds=$2,is_room_available=$3,updated_at=$4 WHERE id=$5 returning *`;
            const values = [
                available_beds,
                booked_beds,
                is_room_available,
                new Date(),
                room_id
            ];
            const { rows} = await pool.query(updateQuery,values);
            // To calculate the time difference of two dates 
            let Difference_In_Time = new_check_out.getTime() - new_check_in.getTime(); 
            // To calculate the no. of days between two dates 
            var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))==0?1:Math.round(Difference_In_Time / (1000 * 3600 * 24));
            const bill = rows[0]["price_per_bed"] * no_of_guests * Difference_In_Days;
            resp["totalBill"] = "$"+bill;
            resp["price_per_bed"] = rows[0]["price_per_bed"];
            resp["expected_checkin"] = check_in_date;
            resp["expected_checkout"] = check_out_date;
            resp["room_type"] = rows[0]["room_type"];
            resp["no_of_days"] = Difference_In_Days;

            res.status(200).send({
                status:200,
                message: "Your booking was successful",
                data: resp
            });
        }
       catch (error) {
        res.status(400).send({
            status:400,
            message:"Error updating",
            error:error
        });
       }

    }
    catch(error) {
        res.status(400).send({
            status:400,
            message:"Error ocurred",
            error: error
        })
    }
}

module.exports= {
    roomSearch,
    bookRoom
}