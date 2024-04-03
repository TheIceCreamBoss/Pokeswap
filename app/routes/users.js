var express = require('express');
var router = express.Router();
const userService = require('../service/userService');
router.use(express.json());

// View all users
router.get('/', async (req, res, next) => {
  try {
    const results = await userService.getDB();

    if (results) {
      res.send(results);
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
  if (!req.body.email || (req.body.profile_visibility == null)) {
    return res.status(400).send('Missing required user details');
  }
  if (req.body.name == "") req.body.name = null;
  if (req.body.phone_num == "") req.body.phone_num = null;
  try {
    const result = await userService.createUser(req.body);

    if (result) {
      console.log(result);
      res.send({ message: 'User updated successfully', success: true });
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
    console.log("attempting to update user with id " + req.body.user_id);
    const result = await userService.updateUser(req);
    
    //Affected rows will determine if result is successful
    if (result.affectedRows > 0) {
      res.send({ message: 'User updated successfully' });
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
    console.log("attempting to delete user with id " + req.body.user_id);
    const result = await userService.deleteUser(req);
   
    //Affected rows will determine if result is successful
    if (result.affectedRows > 0) {
      res.send({ message: 'User deleted Successfully', success: true });
    } else {
      res.status(404).send('User not found');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while specified user');
  }
})

//View User(s) based off criteria
//Needs to be able to filter based off different criteria
router.get('/i/', async (req, res, next) => {
  const email = JSON.stringify(req.headers.email);
  //Check if json is missing ID
  if (!email) {
    return res.status(404).send('Specified email is missing');
  }

  try {
    console.log("attempting to view user with email " + email);
    const result = await userService.viewUser(req);
    
    //Check if results is empty
    if (result.length === 0) {
      console.log("user search returned empty")
      res.status(404).send('User with specified email is not found');
    } else if (result) {
      res.send(result);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while specified user');
  }
})

router.get('/groupByPSA/', async (req, res, next) => {
  //Check if json is missing ID
  if (!req.body.user_id) {
    return res.status(404).send('Specified ID is missing');
  }

  try {
    console.log("attempting to find count of cards owned sorted by psa_rating user with id " + req.body.user_id);
    const result = await userService.groupByPSA(req);
    //Check if results is empty
    if (result.length === 0) {
      console.log("user search returned empty")
      res.status(404).send('Cards associated with specified ID is not found');
    } else if (result) {
      res.send(result);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while specified user');
  }
})


router.get('/groupByPSAHaving/', async (req, res, next) => {
  //Check if json is missing ID
  if (!req.body.user_id) {
    return res.status(404).send('Specified ID is missing');
  }

  try {
    console.log("attempting to find count of cards owned sorted by psa_rating user with id " + req.body.user_id + " with HAVING constraint");
    const result = await userService.groupByPSAHaving(req);
    //Check if results is empty
    if (result.length === 0) {
      console.log("card search returned empty")
      res.status(404).send('Cards associated with specified ID with HAVING constraint is not found');
    } else if (result) {
      res.send(result);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while specified user');
  }
})


router.get('/getSuperUsers', async (req, res, next) => {
  //Check if json is missing ID
  // if (req.headers.collection) {
  //   return res.status(404).send('Specified collection is missing');
  // }

  try {
    console.log("attempting to find superusers (users who own all cards in a 'set')");
    const result = await userService.getSuperUsers(req);
    //Check if results is empty
    if (result.length === 0) {
      console.log("no superusers exist for such set")
      res.status(404).send('no superusers found');
    } else if (result) {
      res.send(result);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while specified user');
  }
})



module.exports = router;
