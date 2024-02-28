var mysql = require('mysql2');

require('dotenv').config();
console.log(process.env.DATABASE_HOST)
var connection = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

connection.connect((err => {
    if(err) throw err;
    console.log('MySQL Connected');
}));

exports.databaseConnection = connection;