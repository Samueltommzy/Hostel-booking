const { Pool } = require("pg");
let {db} = require("../config/config");
const pgtools = require("pgtools")
const dotenv = require("dotenv");
dotenv.config();

let conn = db.devDbCred?db.devDbCred:db.testDbCred;
let dbName = db.devDbCred?"hosteldb":"testdb";

const createDb= async()=>{
    const conf={
        user:conn.user,
        host:conn.host,
        password:conn.password,
        port:conn.port
    }
    const res =  await pgtools.createdb(conf,dbName);  
}


let pool = new Pool({
    user:conn.user,
    host:conn.host,
    database:conn.database,
    password:conn.password,
    port:conn.port
});

pool.on("connect", ()=>{
    console.log("Connected to database")
})

/**
 * This function creates table in database
 */
const createRoomTable = async ()=>{
   createDb().then(()=>{
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
   }).catch((err)=>{
       console.log(error)
   })
}

pool.on("remove", ()=>{
    console.log("client has been removed");
    // process.exit(0);
});


module.exports = {createRoomTable,pool};
require("make-runnable");