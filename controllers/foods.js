// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
//
router.get('/', async (req, res) => {
  try {
    
    const currentUser = await User.findById(req.session.user._id);

    res.render('foods/index.ejs', {
      foods: currentUser.foods,
    });
  } catch (error) {
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
  
    const currentUser = await User.findById(req.session.user._id);
    currentUser.foods.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// controllers/applications.js

router.get('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.foods.id(req.params.foodId);
    
    res.render('foods/show.ejs', {
      food: food,
    });
  } catch (error) {

    console.log(error);
    res.redirect('/');
  }
});

// controllers/applications.js

router.delete('/:foodId', async (req, res) => {
  try {
    
    const currentUser = await User.findById(req.session.user._id);

    currentUser.foods.id(req.params.foodId).deleteOne();
   
    await currentUser.save();
 
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {

    console.log(error);
    res.redirect('/');
  }
});


  

module.exports = router;
