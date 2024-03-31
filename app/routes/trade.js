var express = require('express');
var router = express.Router();
const tradeService = require('../service/tradeService');
router.use(express.json());


// View all trade listings
router.get('/', async (req, res, next) => {
  try {
    const results = await tradeService.getDB();

    if (results) {
      res.render('trade', { results: results });
    } else {
      res.status(404).send('No trades found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching trades');
  }
})

//Create Trade
router.post('/', async (req, res, next) => {
  //Check if required fields are present
  if (!req.body.trade_author_id || !req.body.trade_recipient_id) {
    return res.status(400).send('Missing required trade details');
  }

  try {
    const result = await tradeService.createTrade(req.body);

    if (result.affectedRows > 0) {
      console.log(result);
      res.render('trade', { results: result });
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
      res.render('trade', { results: 'Success' });
    } else {
      res.status(404).send('Error deleting trade');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting trade');
  }
})

// view trade based on criteria !!! Currently only trade_id
router.get('/i', async (req, res, next) => {
  try {
    const results = await tradeService.viewTrade(req);

    if (results) {
      res.render('trade', { results: results });
    } else {
      res.status(404).send('No trade found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching trade');
  }
})

module.exports = router;
