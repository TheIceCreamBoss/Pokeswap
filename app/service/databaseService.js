var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

async function testMySQLConnection() {
    return new Promise((resolve, reject) => {
        connection.ping(function (err) {
            if (err) reject(err);
            resolve(true);
        });
    });
}

module.exports = {
    testMySQLConnection
}