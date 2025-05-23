const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
});

pool.getConnection((err)=>{
    if(err){
        console.log("Error connecting to DB:", err.stack)
        return;
    }

    console.log('Successfully connected to DB')
})

module.exports=pool.promise();
