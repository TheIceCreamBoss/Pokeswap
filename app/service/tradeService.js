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


//Included Cards

//Returns cards IDs included in trades based on trade ID, this needs to be paired with who OWNS the card to find out which side of the trade the card belongs to
async function viewIncludedCards(req) {
    console.log('viewIncludedCards');
    return new Promise((resolve, reject) => {
        connection.query('USE pokeswap');

        connection.query('SELECT * FROM includedCards WHERE trade_id = ?', req.body.trade_id, async function (err,results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                try {
                    const cardOwnersPromises = results.map(result =>
                        findCardOwner({ card_id: result.card_id}));

                        const cardOwners = await Promise.all(cardOwnersPromises);
                        const cardsWithOwners = results.map((result, i) => ({
                            ...result, cardOwner: cardOwners[i]
                        }));
                        console.log(cardsWithOwners);
                        resolve(cardsWithOwners);
                } catch (error) {
                    reject(error);
                }

            }
        });
    })
}
//helper to find card owners within a trade
function findCardOwner(req) {
    return new Promise((resolve, reject) => {
 
        connection.query('SELECT user_id FROM cardOwnsDescribedAs WHERE card_id = ?', req.card_id, function (err, results) {
            if (err) {
                reject(err);
            } else {
                //Below prints out each user_id found
                //console.log(results);
                resolve(results.length > 0 ? results[0].user_id : null);
            }
        });
    });
}

module.exports = {
    getDB,
    createTrade,
    deleteTrade,
    viewTrade,
    //includedCard
    viewIncludedCards
}