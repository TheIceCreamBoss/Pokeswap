var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});



//VIEW ALL TRADES
async function getTrades() {
    console.log('getTrades'); 
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
         connection.query(query, values, async function (err, results) {
            if (err) {
                reject(err);
            } else {
                const out = results;
                const trade_id = results.insertId;
                console.log(trade_id);
                //loop through all included cardIds and add them to the trade using addCardsToTrade, throw error if given card does not belong to any id listed
                const includedCardIds = req.included_card_ids;
                const promises = includedCardIds.map(cardId => verifyOwnership(cardId, req.trade_author_id, req.trade_recipient_id));
                try {
                    const results = await Promise.all(promises);
                    console.log("passed all promises");
                    const validCardIds = includedCardIds.filter((cardId, index) => results[index]);
                    const addCardPromises = validCardIds.map(cardId => addCardToTrade(trade_id, cardId));
                    await Promise.all(addCardPromises);
                    console.log('Cards added to trade successfully');
                    console.log(out);
                    resolve(out);
                } catch (error) {
                    reject(error);
                }
                
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


//helper for adding cards to trade
function addCardToTrade(trade_id, card_id) {
    return new Promise((resolve, reject) => {
        connection.query('USE pokeswap');
        connection.query('INSERT INTO includedCards (trade_id, card_id) VALUES (?, ?)', [trade_id, card_id], function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

//helper for trade creation to verify ownership of cards
function verifyOwnership(card_id, trade_author_id, trade_recipient_id) {
    return new Promise((resolve, reject) => {
        connection.query('USE pokeswap');
        console.log('verifying ownership');
        connection.query('SELECT 1 FROM cardOwnsDescribedAs WHERE card_id = ? AND user_id IN (?, ?)', [card_id, trade_author_id, trade_recipient_id], function (err, results) {
            if (err) {
                console.log("fail");
            reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results);
                } else {
                    reject(new Error('Ownership verification failed for card_id: ' + card_id));
                }
            }
        });
    });
}

//Included Cards


//GET ALL INCLUDED CARDS

async function getIncludedCards() {
    console.log('includedCards'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM includedCards ORDER BY trade_id, card_id', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

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
    getTrades,
    createTrade,
    deleteTrade,
    viewTrade,
    getIncludedCards,
    viewIncludedCards,
}