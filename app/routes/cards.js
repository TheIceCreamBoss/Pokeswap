var express = require('express');
var router = express.Router();
const cardsService = require('../service/cardsService');
router.use(express.json());

// View all Cards
router.get('/', async (req, res, next) => {
    try {
       
        const results = await cardsService.getAllCards();
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

// Create card
router.post('/', async (req, res, next) => {
    try {
        console.log("attempting to upload card");
        const results = await cardsService.uploadCard(req.body);
        if (results.affectedRows > 0) {
        res.send(results);
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
        res.send(results);
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
        res.send(results);
        } else {
        res.status(404).send('Missing specified card to delete');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting card');
    }
})

//view card
//filters based off different criteria ANDed together
router.get('/a', async (req, res, next) => {
    try {
        console.log("attempting to view card(s) with attriutes ANDed together");
        const results = await cardsService.viewCardAND(req);
        
        if (results.length === 0) {
            console.log("card search returned empty")
            res.status(404).send('Card with specified parameter(s) not found');
        } else if (results) {
        res.send(results);
        } else {
        res.status(404).send('Missing specified card to view');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while viewing card');
    }
})

//view card
//filters based off different criteria ORed together
router.get('/o', async (req, res, next) => {
    try {
        console.log("attempting to view card(s) with attributes ORed together");
        const results = await cardsService.viewCardOR(req);
        
        if (results.length === 0) {
            console.log("card search returned empty")
            res.status(404).send('Card with specified parameter(s) not found');
        } else if (results) {
        res.send(results);
        } else {
        res.status(404).send('Missing specified card to view');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while viewing card');
    }
})

//wojdowjdow
router.get('/i', async (req, res, next) => {
    const user_id = JSON.stringify(req.headers.user_id);

    if (!user_id) {
        return res.status(404).send('Specified user_id is missing');
    }
    
    try {
        const result = await cardsService.getAllUserCards(req);
        if (result.length === 0) {
            console.log("user search returned empty")
            res.send(result);
        } else if (result) {
            res.send(result);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while specified user');
    }
})

module.exports = router;