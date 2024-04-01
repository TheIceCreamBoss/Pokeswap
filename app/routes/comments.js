var express = require('express');
var router = express.Router();
const commentingService = require('../service/commentingService');


/* GET all posts. */
router.get('/', async function(req, res, next) {
  try {
    const results = await commentingService.getComments();
    
    if (results) {
      res.send(results);
    } else {
      res.status(404).send('No comments found');
    }

  } catch (error) {
    res.status(500).send('An error occurred while fetching comments');
  }
});


router.post('/', async function(req, res, next) {
  if (!req.body || !req.body.post_id || !req.body.user_id || !req.body.content || !req.body.comment_date) {
    return res.status(400).send('Missing comment data in request body');
  }

  try { 
    const results = await commentingService.createComment(req.body);

    if (results) {
      res.status(201).send(results);
    } else {
      res.status(400).send('Failed to create comment');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating the comment');
  }
});

// router.patch('/', async function(req, res, next) { 
//   if (!req.body || !req.body.id || (!req.body.image_link && !req.body.content && !req.body.post_date && !req.body.user_id)) {
//     return res.status(400).send('Missing post data in request body');
//   }
//   try {
//     const results = await commentingService.updateComment(req.body);

//     if (results) {
//       res.status(200).send(results);
//     } else {
//       res.status(400).send('Failed to update post');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while updating the post');
//   }
// });

router.delete('/', async function(req, res, next) {
  if (!req.body || !req.body.comment_id) {
    return res.status(400).send('Missing comment ID in request body');
  }

  try {
    const results = await commentingService.deleteComment(req.body);

    if (results) {
      res.status(204).send();
    } else {
      res.status(400).send('Failed to delete comment');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the post');
  }
});

module.exports = router;
