/* const User = require('../models/user.model.js'); 

exports.create = (req,req) => {
    //Missing any information
    if(!req.body.content){
        return res.status(400).send({
            message: "Please enter new user information."
        });
    }
    const user = new User ({
        //userId: autogenerated
        username: req.body.username, 
        password: req.body.password, 
        email: req.body.email
    }); 

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error saving new user."
        });
    });

};

//Retrieve and return all recipes for given user
exports.findAll = (req,res) => {
    var recipes = User.recipes.findAll()

    for(i=0; i < recipes.length; i++) {
        return 
    }
    /* .then(recipes => {
        res.send(recipes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Could not retrieve user " +userId +" recipe book."
        });
    }); */
/* }; */ 