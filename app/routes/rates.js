var express = require('express');
var router = express.Router();
const ratesService = require('../service/ratesService');
router.use(express.json());

// View all users
router.get('/', async (req, res, next) => {
  try {
    const results = await ratesService.getRates();

    if (results) {
      res.send(results);
    } else {
      res.status(404).send('No rating found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching rating');
  }
})


// create views
router.post('/', async (req, res, next) => {
  //Check if required fields are present
    if (!req.body.star_count || !req.body.rate_author_id || !req.body.rate_recipient_id) {
      return res.status(400).send('Missing required details');
    }
    if (req.body.description == "") req.body.description = null;
    req.body.rate_date = new Date();
    try {
      const result = await ratesService.createRates(req.body);
  
      if (result) {
        console.log(result);
        res.send({ message: 'Review updated successfully', success: true });
      } else {
        res.status(404).send('Error inserting new review');
      }
      
    }
    catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while creating review');
    }
  })
  


//Unused now due to changes
// // Get average of each users rating
router.get('/averageRatings', async (req, res, next) => {
  try {
    const results = await ratesService.getAverages();
    if (results) {
      res.send(results);
    } else {
      res.status(404).send('No rating found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching rating');
  }
})

// Get average of each users rating
router.get('/averageRatings/inequalityNested', async (req, res, next) => {
  try {
    const results = await ratesService.getAverageInequalityNested(req);
    if (results) {
      res.send(results);
    } else {
      res.status(404).send('No rating found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching rating');
  }
})

module.exports = router;