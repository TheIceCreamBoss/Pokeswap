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



// Get average of each users rating
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
router.get('/averageRatings/inequality', async (req, res, next) => {
  try {
    const results = await ratesService.getAverageInequality(req);
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