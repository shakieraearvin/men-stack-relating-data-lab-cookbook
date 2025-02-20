// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
//
router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    // applications as data in the context object.
    res.render('foods/index.ejs', {
      foods: currentUser.foods,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error, 'There are no items in this pantry.');
    res.redirect('/');
  }
});
  
  router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
  });

  // controllers/applications.js`

router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    currentUser.foods.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

  

module.exports = router;
