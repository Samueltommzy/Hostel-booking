const { Pool } = require("pg");
const config = require("../config/config");
const dotenv = require("dotenv");
dotenv.config();


const pool = new Pool({
    user:config.user,
    host:config.host,
    database:config.database,
    password:config.password,
    port:config.port
});
// pool.connect();
// global.db = pool;

pool.on("connect", ()=>{
    console.log("Connected to database")
})

/**
 * This function creates table in database
 */
const createRoomTable = ()=>{
    const queryText = `CREATE TABLE IF NOT EXISTS 
    rooms(
        id SERIAL NOT NULL PRIMARY KEY,
        room_type VARCHAR(128) NOT NULL,
        room_config_id INTEGER NOT NULL,
        number_of_beds INTEGER NOT NULL,
        price_per_bed DECIMAL NOT NULL,
        booked_beds INTEGER [],
        available_beds INTEGER [],
        is_room_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    
    pool.query(queryText).then((res)=>{
        console.log("Got  res here")
        console.log(res);
        pool.end();
    }).
    catch((err)=>{
        console.log("Got here")
        console.log(err);
        pool.end();
    });
}

pool.on("remove", ()=>{
    console.log("client has been removed");
    process.exit(0);
});


module.exports = {createRoomTable,pool};
require("make-runnable");