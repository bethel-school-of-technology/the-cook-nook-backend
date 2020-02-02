const express = require('express');
const router = express.Router(); 
const User = require('../models/users.model'); 
const passport = require('passport');

//Registering new User

/* router.post('/', async (req, res) => {
    try{
        const user = await User.find(); 
        if(!user){ //Should I use user === empty/null?
            const newUser = new User({
                username: req.body.username, 
                password: req.body.password, 
                email: req.body.email, 
                phone: req.body.phone
            })
            newUser.save()
            .then(data =>{
                res.json(data);
            })
        }else{
            alert("Please enter unique user information!")
        }
    }catch(err){
        res.json({ message: err});
    }
}); 

//Basic login authentication for now

router.post('/login', passport.authenticate('local'), (res,req) => {
    res.redirect('/users' + req.user.username);
}); */


module.exports = router; 

