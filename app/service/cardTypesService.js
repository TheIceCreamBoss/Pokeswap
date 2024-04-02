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

module.exports = {
    getAllCards,
    getEnergyCards,
    getEnergyCardDescriptions,
    getPokemonCards,
    getPokemonCardsTypes,
    getTrainerCardDescriptions,
    getTrainerCards
}