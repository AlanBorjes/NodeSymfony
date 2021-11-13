const mysql = require('mysql');

const { promisify } = require('util');
const { database } = require('./keys.js');

const pool = mysql.createPool(database);

pool.getConnection((err, conn) => {
    if(err){
        if(err.code === ' PROTOCOL_CONNECTION-LOST'){
            console.log("DATABASE WAS CLOSED");
        }
        if(err.code === 'ER-CON-COUNT-ERROR'){
            console.log("DATABASE HAS TO MAY CONNECTIONS")
        }
    }
    if(conn) conn.release();
    console.log("DATABSE IS CONNECTED");
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;
