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


router.post('/', async function(req, res, next) {
  if (!req.body || !req.body.image_link || !req.body.content || !req.body.post_date || !req.body.user_id) {
    return res.status(400).send('Missing post data in request body');
  }

  try { 
    const results = await postService.createPosts(req.body);

    if (results) {
      res.status(201).send(results);
    } else {
      res.status(400).send('Failed to create post');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating the post');
  }
});

router.patch('/', async function(req, res, next) {
  if (!req.body || !req.body.id || (!req.body.image_link && !req.body.content && !req.body.post_date && !req.body.user_id)) {
    return res.status(400).send('Missing post data in request body');
  }
  try {
    const results = await postService.updatePosts(req.body);

    if (results) {
      res.status(200).send(results);
    } else {
      res.status(400).send('Failed to update post');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the post');
  }
});

router.delete('/', async function(req, res, next) {
  if (!req.body || !req.body.id) {
    return res.status(400).send('Missing post ID in request body');
  }

  try {
    const results = await postService.deletePosts(req.body);

    if (results) {
      res.status(204).send();
    } else {
      res.status(400).send('Failed to delete post');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the post');
  }
});

module.exports = router;
