var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

//view all cards in DB
async function getAllCards() {
    console.log('getAllCards'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM cardOwnsDescribedAs', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

//upload a card
async function uploadCard(req) { 
    console.log('createUser'); 
    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        //console.log(req);
        //Sanitization, ? handles escaping of special characters
        const query = 'INSERT INTO cardOwnsDescribedAs (psa_rating, date_uploaded, user_id, date_aquired, info_id, collection) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [req.psa_rating, req.date_uploaded, req.user_id, req.date_aquired, req.info_id, req.collection];
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

//update a specific card
async function updateCard(req) {
    console.log('updateCard'); 
     // Parse req.body for userID and updateData
    const { card_id: card_id, ...updateData } = req;
    

    // !!!Nothing on the backend is checking if phonenum is valid, email is valid, etc. Do on frontend!!!
    //not sure if this is the way we want to go about it, if a attribute is empty, set it to null.
     Object.keys(updateData).forEach(key => {
        if (updateData[key] === "") {
            updateData[key] = null;
        }
    });

         // build connection query
         const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
                //Sanitization, ? handles escaping of special characters
         const query = `UPDATE cardOwnsDescribedAs SET ${fields} WHERE card_id = ?`;
     
         // extract values from updateData
         const values = Object.values(updateData);

         // Add card_id to the end of the values array to match order of query
         values.push(card_id);

    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        //console.log(req);

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

// delete a specific card
async function deleteCard(req) {
    console.log('deleteCard'); 
    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        //Sanitization, ? handles escaping of special characters
        const query = 'DELETE FROM cardOwnsDescribedAs WHERE card_id = ?';
        const values = [req.card_id];
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

//View card(s) based off ANDed criteria
async function viewCardAND(req) {
    console.log('viewCard'); 
    const searchData = req.body;

    const fields = [];
    const values = [];

    Object.entries(searchData).forEach(([key, value]) => {
        if (value === null) {
            // If the value is null, use IS NULL in the query
            fields.push(`${key} IS NULL`);
        } else {
            // If the value is not null, use the given attribute
            fields.push(`${key} = ?`);
            values.push(value);
        }
    });

    const queryCondition = fields.join(' AND ');
    const query = `SELECT * FROM cardOwnsDescribedAs WHERE ${queryCondition}`;

    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        console.log(fields);
        console.log(query);
        console.log(values);
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


//View card(s) based off criteria ORed together
async function viewCardOR(req) {
    console.log('viewCard'); 

    const searchData = req.body;
    const fields = [];
    const values = [];
    Object.entries(searchData).forEach(([key, value]) => {
        if (value === null) {
            // If the value is null, use IS NULL in the query
            fields.push(`${key} IS NULL`);
        } else {
            // If the value is not null, use the given attribute
            fields.push(`${key} = ?`);
            values.push(value);
        }
    });

    const queryCondition = fields.join(' OR ');
    const query = `SELECT * FROM cardOwnsDescribedAs WHERE ${queryCondition}`;

    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        console.log(fields);
        console.log(query);
        console.log(values);
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

// delete a specific card
async function deleteCard(req) {
    console.log('deleteCard'); 
    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        //Sanitization, ? handles escaping of special characters
        const query = 'DELETE FROM cardOwnsDescribedAs WHERE card_id = ?';
        const values = [req.card_id];
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
   getAllCards,
   uploadCard,
   updateCard,
   deleteCard,
   viewCardAND,
   viewCardOR
}