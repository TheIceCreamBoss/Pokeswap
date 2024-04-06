var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

async function getAllCards() {
    console.log('getAllCards'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM cardType ORDER BY collection, length(info_id), info_id', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

async function getEnergyCards() {
    console.log('getEnergyCards'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM energyCard ORDER BY collection, length(info_id), info_id', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

async function getEnergyCardDescriptions() {
    console.log('getEnergyCardDescriptions'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM energyCardDescriptions', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}
async function getPokemonCards() {
    console.log('getPokemonCards'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM pokemonCard ORDER BY collection, length(info_id), info_id', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}
async function getPokemonCardsTypes() {
    console.log('getPokemonCardsTypes'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM pokemonTypes', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

async function getPokemonCardsJoined(req) {
    return new Promise((resolve, reject) => {
        var sqlStatement = "SELECT ";
        var sqlStatementEnd = "WHERE pokemonCard.pokemon = pokemonTypes.pokemon  "


        if (req.headers.info_id == 1) {
            sqlStatement += "info_id, ";
        }
        if (req.headers.collection == 1) {
            sqlStatement += "collection, ";
        }
        if (req.headers.pokemon == 1) {
            sqlStatement += "pokemonCard.pokemon, ";
        }
        if (req.headers.card_description == 1) {
            sqlStatement += "card_description, ";
        }
        if (req.headers.hp == 1) {
            sqlStatement += "hp, ";
        }
        if (req.headers.gxcard == 1) {
            sqlStatement += "gxcard, ";
        }
        if (req.headers.type == 1) {
            sqlStatement += "type, ";
        }

        if (sqlStatement == "SELECT ") {
            resolve(results);
        }


        if(req.headers.collectionid &&  req.headers.collectionid != 'null' && req.headers.pokemonname && req.headers.pokemonname != 'null') {
            sqlStatementEnd += "AND (pokemonCard.collection = '" + req.headers.collectionid + "' ";
            sqlStatementEnd += req.headers.operator + " ";
            sqlStatementEnd += "pokemonCard.pokemon = '" + req.headers.pokemonname + "' )";
            
        } else {
            if (req.headers.collectionid &&  req.headers.collectionid != 'null') {
                sqlStatementEnd += "AND pokemonCard.collection = '" + req.headers.collectionid + "' ";
            }
    
            if(req.headers.pokemonname && req.headers.pokemonname != 'null') {
                sqlStatementEnd += "AND pokemonCard.pokemon = '" + req.headers.pokemonname + "' ";
            }
        }
        
        

        console.log(sqlStatementEnd);


        console.log(sqlStatement);


        // Remove the trailing comma and space
        sqlStatement = sqlStatement.slice(0, -2);


        connection.query('USE pokeswap');
        connection.query(sqlStatement + ' FROM pokemonCard, pokemonTypes ' + sqlStatementEnd + 'ORDER BY collection, length(info_id), info_id', function (err, results) {
            if (err) {
                reject(err);
            } else {
                
                resolve(results);
            }
        });
    });
}


async function getTrainerCards() {
    console.log('getTrainerCards'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM trainerCard ORDER BY collection, length(info_id), info_id', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

async function getTrainerCardDescriptions() {
    console.log('getTrainerCardDescriptions'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM trainerCardDescriptions', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

async function getAllCollections() {
    console.log('getAllCollections'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT DISTINCT collection FROM cardType ORDER BY collection', function (err, results) {
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
    getEnergyCards,
    getEnergyCardDescriptions,
    getPokemonCards,
    getPokemonCardsTypes,
    getPokemonCardsJoined,
    getTrainerCardDescriptions,
    getTrainerCards,
    getAllCollections
}