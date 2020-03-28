"use strict"
const dotenv = require("dotenv");
dotenv.config();

const devDbCred = {
    user:"sammy",
    host:"localhost",
    database:"hosteldb",
    password:"sammy",
    port:5432
} 

const testDbCred = {
    user:"sammy",
    host:"localhost",
    database:"testdb",
    password:"sammy",
    port:5432
}
module.exports ={
    db:process.env.NODE_ENV=="development"?{devDbCred}:{testDbCred}
} 
