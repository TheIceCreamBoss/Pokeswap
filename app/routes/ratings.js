var express = require('express');
var router = express.Router();
const ratingService = require('../service/ratingService');


// View all users
router.get('/', async (req, res, next) => {
  try {
    const results = await ratingService.getRatings();

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