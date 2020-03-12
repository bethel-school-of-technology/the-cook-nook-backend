const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res, next) => {
    User.find({username: req.body.username})
        .exec()
        .then(user =>{
            if(user.length >= 1){
                return res.status(422).json({
                    message: 'Username taken'
                })
            } else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error:err
                        });
                    } else {
                        const user = new User({
            
                            id: new mongoose.Types.ObjectId(), 
                            username: req.body.username, 
                            password: hash, 
                            recipes: [String]
                        });
                        user
                        .save()
                        .then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: 'User created'
                            })            
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err               
                            })
                        })
                    }
                });
            }
        })
    
    
});

router.post('/login', (req, res, next) => {
    User.find({username: req.body.username})
        .exec()
        .then(user =>{
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        userId: user[0].id,
                        username: user[0].username, 
                    }, process.env.JWT_KEY, 
                    {
                        expiresIn: '1h'
                    });
                    res.status(200).json({
                        message: 'Auth success', 
                        token: token
                    });

                } else
                {res.status(401).json({
                    message: 'Auth failed'
                })};
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "User deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;