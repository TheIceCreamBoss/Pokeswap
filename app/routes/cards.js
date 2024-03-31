var express = require('express');
var router = express.Router();
const cardsService = require('../service/cardsService');
router.use(express.json());

// View all Cards
router.get('/', async (req, res, next) => {
    try {
       
        const results = await cardsService.getAllCards();
        if (results) {
        res.render('cardsView', { results: results });
        } else {
        res.status(404).send('No cards found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching cards');
    }
})

// Create card
router.post('/', async (req, res, next) => {
    try {
        console.log("attempting to upload card");
        const results = await cardsService.uploadCard(req.body);
        if (results.affectedRows > 0) {
        res.render('cardsView', { results: results });
        } else {
        res.status(404).send('No card information found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while uploading card');
    }
})


//Update Card 
router.patch('/', async (req, res, next) => {
    try {
        console.log("attempting to update card with id " + req.body.card_id);
        const results = await cardsService.updateCard(req.body);
        if (results.affectedRows > 0) {
        res.render('cardsView', { results: results });
        } else {
        res.status(404).send('Missing specified card to update');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating card');
    }
})

//Delete Card
router.delete('/', async (req, res, next) => {
    try {
        console.log("attempting to delete card with id " + req.body.card_id);
        const results = await cardsService.deleteCard(req.body);
        if (results.affectedRows > 0) {
        res.render('cardsView', { results: results });
        } else {
        res.status(404).send('Missing specified card to delete');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting card');
    }
})

//view card
// !!! Needs to be able to filter based off different criteria
router.get('/i/', async (req, res, next) => {
    try {
        console.log("attempting to view card with id " + req.body.card_id);
        const results = await cardsService.viewCard(req.body);
        if (results) {
        res.render('cardsView', { results: results });
        } else {
        res.status(404).send('Missing specified card to view');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while viewing card');
    }
})
module.exports = router;
