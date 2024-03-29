var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

async function getDB() {
    console.log('getDB'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM user', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

async function createUser(req) { 
    console.log('createUser'); 

    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        console.log(req);
        const query = 'INSERT INTO user (email, name, phone_num, profile_visibility) VALUES (?, ?, ?, ?)';
        const values = [req.email, req.name, req.phone_num, req.profile_visibility];
         connection.query(query, values, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

module.exports = {
    getDB,
    createUser
}