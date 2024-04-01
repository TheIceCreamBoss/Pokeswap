var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});



//VIEW ALL TRADES
async function getDB() {
    console.log('getDB'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM tradeOfferTradesWith', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

//CREATE TRADE
async function createTrade(req) { 
    console.log('createTrade'); 
    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        //console.log(req);
        //Sanitization, ? handles escaping of special characters
        const query = 'INSERT INTO tradeOfferTradesWith (trade_date, trade_author_id, trade_recipient_id) VALUES (?, ?, ?)';
        const values = [req.trade_date, req.trade_author_id, req.trade_recipient_id];
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

//DELETE TRADE
async function deleteTrade(req) {
    console.log('deleteTrade'); 
    return new Promise((resolve, reject) => {
       
        //obtain trade_id from req body
        const trade_id = req.body.trade_id;

        connection.query('USE pokeswap');
        connection.query('DELETE FROM tradeOfferTradesWith WHERE trade_id = ?', trade_id, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

//VIEW TRADE
async function viewTrade(req) {
    console.log('viewTrade'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM tradeOfferTradesWith WHERE trade_id = ?', req.body.trade_id, function (err, results) {
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
    createTrade,
    deleteTrade,
    viewTrade
}