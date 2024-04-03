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


// create review
async function createRates(req) { 
    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        const query = 'INSERT INTO ratingsRates (star_count, description, rate_author_id, rate_recipient_id, rate_date) VALUES (?, ?, ?, ?, ?)';
        const values = [req.star_count, req.description, req.rate_author_id, req.rate_recipient_id, req.rate_date];

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

//Unused due to changes
// //GET AVERAGE RATING OF ALL USERS
async function getAverages() {
    console.log('get average'); 
    return new Promise((resolve, reject) => {
        connection.query('USE pokeswap');
        connection.query('SELECT AVG(star_count) AS avg FROM ratingsRates', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}


//GET AVERAGE RATING FILTERING WITH INEQUALITY
async function getAverageInequalityNested(req) {
    console.log('get average'); 
    return new Promise((resolve, reject) => {
        connection.query('USE pokeswap');
        connection.query('SELECT rate_recipient_id AS "User ID", AVG(star_count) AS "Average Rating out of 5" FROM ratingsRates GROUP BY rate_recipient_id HAVING AVG(star_count) ' + req.headers.inequality + ' (SELECT AVG(star_count) FROM ratingsRates)', function (err, results) {
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
    getRates,
    createRates,
    getAverages,
    getAverageInequalityNested
};
