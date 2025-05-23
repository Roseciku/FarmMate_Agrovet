const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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
