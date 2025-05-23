const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`

const pool = mysql.createPool(urlDB);

pool.getConnection((err)=>{
    if(err){
        console.log("Error connecting to DB:", err.stack)
        return;
    }

    console.log('Successfully connected to DB')
})

module.exports=pool.promise();
