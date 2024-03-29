var express = require('express');
var router = express.Router();
const postService = require('../service/postService');

/* GET all posts. */
router.get('/', async function(req, res, next) {
  try {
    const results = await postService.getPosts();
    
    if (results) {
      res.send(results);
    } else {
      res.status(404).send('No posts found');
    }

  } catch (error) {
    res.status(500).send('An error occurred while fetching posts');
  }
});

module.exports = router;
