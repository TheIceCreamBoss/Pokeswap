var express = require('express');
var router = express.Router();
const userService = require('../service/userService');
router.use(express.json());

// View all users
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
})

// Create user
router.post('/', async (req, res, next) => {
//Check if required fields are present
  if (!req.body.email || !req.body.profile_visibility) {
    return res.status(400).send('Missing required user details');
  }
  //replace empty fields with placeholder
  req.body.name = req.body.name || "N/A";
  req.body.phone_num = req.body.phone_num || "n/a";

  try {
    const result = await userService.createUser(req.body);

    if (result) {
      console.log(result);
      res.render('user', { results: result });
    } else {
      res.status(404).send('Error inserting new user');
    }
    
  }
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating user');
  }
})

// Edit pre-existing users given user_id
router.patch('/', async (req, res, next) => {
  if (!req.body.user_id) {
    return res.status(404).send('Specified ID is missing');
  }
  try {
    const result = await userService.updateUser(req);
    //Affectedrows will determine if result is successful
    if (result.affectedRows > 0) {
      res.render('user', { results: 'Success' });
    } else {
      res.status(404).send('User not found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while specified user');
  }


  
})

//Delete User
router.delete('/', async (req, res, next) => {
  if (!req.body.user_id) {
    return res.status(404).send('Specified ID is missing');
  }
  try {
    const result = await userService.deleteUser(req);
    //Affectedrows will determine if result is successful
    if (result.affectedRows > 0) {
      res.render('index', { title: 'User deleted Successfully' });
    } else {
      res.status(404).send('User not found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while specified user');
  }
})

module.exports = router;
