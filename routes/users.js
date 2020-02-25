var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../config/auth.js');


//home/register form page
router.get('/register', function(req, res, next) {
  res.render('register');
}); 

//make new user
router.post('/register', function(req, res, next) {
  const hashPassword = auth.hashPassword(req.body.password);
  models.Users.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if(user) {
      res.send('This user is already cooking!')
    } else{
      models.Users
      .create({
        username: req.body.username,
        password: hashPassword
      }) 
      .then(createdUser => {
        const isMatch = createdUser.comparePassword(req.body.password);
        if(isMatch) {
          const UserId = createdUser.UserId;
          const token = auth.singUser(createdUser); 
          res.cookie('jwt', token);
          res.redirect('/logged/:' + UserId);
        }else{
           console.log('failed to match')
        }
      })  
    }
  })
});

//view all recipes
router.get('/logged/:UserId', auth.verifyUser, function(req, res, next){
  if(req.params.id !== String(req.Users.UserId)){
    res.send("Not your data!")
  }else{
    res.render('logged', {
      username: req.Users.username
    });
  }
})



module.exports = router;
