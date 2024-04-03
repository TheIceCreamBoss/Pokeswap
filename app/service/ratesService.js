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

//Unused due to changes
// //GET AVERAGE RATING OF ALL USERS
// async function getAverages() {
//     console.log('get average'); 
//     return new Promise((resolve, reject) => {
//         connection.query('USE pokeswap');
//         connection.query('SELECT rate_recipient_id AS "User ID", AVG(star_count) AS "Average Rating out of 5" FROM ratingsRates GROUP BY rate_recipient_id', function (err, results) {
//             if (err) {
//                 reject(err);
//             } else {
//                 console.log(results);
//                 resolve(results);
//             }
//         });
//     });
// }


//GET AVERAGE RATING FILTERING WITH INEQUALITY
async function getAverageInequalityNested(req) {
    console.log('get average'); 
    return new Promise((resolve, reject) => {
        connection.query('USE pokeswap');
        connection.query('SELECT rate_recipient_id AS "User ID", AVG(star_count) AS "Average Rating out of 5" FROM ratingsRates GROUP BY rate_recipient_id HAVING AVG(star_count) ' + req.body.inequality + ' (SELECT AVG(star_count) FROM ratingsRates)', function (err, results) {
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
    getAverageInequalityNested,
    //getAverages
};
