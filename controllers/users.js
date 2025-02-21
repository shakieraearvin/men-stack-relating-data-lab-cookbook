const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


//app.use('/users', usersRouter);

router.get('/', async (req, res) => {
    try {
      const allUsers = await User.find();
  
      res.render('users/index.ejs', {
        users: allUsers,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });












module.exports = router;