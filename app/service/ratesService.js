var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

//VIEW ALL USERS
async function getRates() {
    console.log('get rates'); 
    return new Promise((resolve, reject) => {
        connection.query('USE pokeswap');

        connection.query('SELECT * FROM ratingsRates', function (err, results) {
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
    getRates
};