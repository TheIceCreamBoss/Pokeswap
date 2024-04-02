var express = require('express');
var router = express.Router();
const cardTypesService = require('../service/cardTypesService');
router.use(express.json());

// View pokemon cards
router.get('/p', async (req, res, next) => {
    try {
       
        const results = await cardTypesService.getPokemonCards();
        if (results) {
        res.send(results);
        } else {
        res.status(404).send('No cards found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching cards');
    }
})

// View trainer cards
router.get('/t', async (req, res, next) => {
    try {
       
        const results = await cardTypesService.getTrainerCards();
        if (results) {
        res.send(results);
        } else {
        res.status(404).send('No cards found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching cards');
    }
})

// View energy cards
router.get('/e', async (req, res, next) => {
    try {
       
        const results = await cardTypesService.getEnergyCards();
        if (results) {
        res.send(results);
        } else {
        res.status(404).send('No cards found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching cards');
    }
})

// pokemon types
router.get('/p2', async (req, res, next) => {
    try {
       
        const results = await cardTypesService.getPokemonCardsTypes();
        if (results) {
        res.send(results);
        } else {
        res.status(404).send('No cards found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching cards');
    }
})

// View trainer desc
router.get('/t2', async (req, res, next) => {
    try {
       
        const results = await cardTypesService.getTrainerCardDescriptions();
        if (results) {
        res.send(results);
        } else {
        res.status(404).send('No cards found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching cards');
    }
})

// View energy desc
router.get('/e2', async (req, res, next) => {
    try {
       
        const results = await cardTypesService.getEnergyCardDescriptions();
        if (results) {
        res.send(results);
        } else {
        res.status(404).send('No cards found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching cards');
    }
})

module.exports = router;
