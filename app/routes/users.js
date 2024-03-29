var express = require('express');
var router = express.Router();
const userService = require('../service/userService');

router.get('/', async (req, res, next) => {
  try {
    const results = await userService.getDB();

    if (results) {
      res.render('user', { results: results });
    } else {
      res.status(404).send('No users found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching users');
  }
});

module.exports = router;
