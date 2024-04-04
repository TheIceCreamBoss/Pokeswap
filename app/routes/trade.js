var express = require('express');
var router = express.Router();
const tradeService = require('../service/tradeService');
router.use(express.json());


// View all trade listings
router.get('/', async (req, res, next) => {
  try {
    const results = await tradeService.getTrades();

    if (results) {
      res.send(results);
    } else {
      res.status(404).send('No trades found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching trades');
  }
})

//Create Trade with specified cards, checks if card_added belongs to either the author or recipient.
router.post('/', async (req, res, next) => {
  //Check if required fields are present
  if (!req.body.trade_author_id || !req.body.trade_recipient_id) {
    return res.status(400).send('Missing required trade details');
  }

  try {
    const result = await tradeService.createTrade(req.body);

    if (result.affectedRows > 0) {
      console.log(result);
      res.send(result);
    } else {
      res.status(404).send('Error inserting new trade');
    }
    
  }
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating trade');
  }
})

// Delete trade listing
router.delete('/', async (req, res, next) => {
  if (!req.body.trade_id) {
    return res.status(404).send('Specified ID is missing');
  }
  try {
    const result = await tradeService.deleteTrade(req);
    
    //Affected rows will determine if result is successful
    if (result.affectedRows > 0) {
      res.send({ message: 'Trade deleted Successfully' });
    } else {
      res.status(404).send('Error deleting trade');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting trade');
  }
})

// view trade based on trade id
router.get('/i', async (req, res, next) => {
  try {
    const results = await tradeService.viewTrade(req);

    if (results.length === 0) {
      console.log("trade search returned empty")
      res.status(404).send('Trade with specified ID is not found');
    } else if (results) {
      res.send(results);
    } else {
      res.status(404).send('No trade found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching trade');
  }
})



//Included Cards

//get all cards included

router.get('/c', async (req, res, next) => {
  try {
    const results = await tradeService.getIncludedCards();

    if (results) {
      res.send(results);
    } else {
      res.status(404).send('No trades found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching trades');
  }
})

//Returns cards IDs included in trades based on trade ID, this is paired with who OWNS the card to find out which side of the trade the card belongs to
router.get('/includedCardsA', async (req, res, next) => {
  try {
    const results = await tradeService.viewIncludedCardsA(req);

    if (results.length === 0) {
      console.log("trade search returned empty for author")
      res.status(404).send('Cards included with specified trade ID not found');
    } else if (results) {
      res.send(results);
    } else {
      res.status(404).send('Specified trade not found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching trade and related cards');
  }
})

//Returns cards IDs included in trades based on trade ID, this is paired with who OWNS the card to find out which side of the trade the card belongs to
router.get('/includedCardsR', async (req, res, next) => {
  try {
    const results = await tradeService.viewIncludedCardsR(req);

    if (results.length === 0) {
      console.log("trade search returned empty for recipient")
      res.status(404).send('Cards included with specified trade ID not found');
    } else if (results) {
      res.send(results);
    } else {
      res.status(404).send('Specified trade not found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching trade and related cards');
  }
})

//returns all trade ids
router.get('/getAllTradeID', async (req, res, next) => {
  try {
    const results = await tradeService.getAllTradeID();

    if (results.length === 0) {
      console.log("trade search returned empty")
      res.status(404).send('trade IDs not found');
    } else if (results) {
      res.send(results);
    } else {
      res.status(404).send('Specified trade not found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching trade and related cards');
  }
})

module.exports = router;
