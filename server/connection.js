require('dotenv').config()
const mysql = require('mysql');
var sqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    multipleStatements: true
});

sqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected"); 
    }else{
        console.log("Connection Failed");
    }
})

module.exports = sqlConnection;