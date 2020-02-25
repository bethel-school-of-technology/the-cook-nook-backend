const jwt = require('jsonwebtoken');
const models = require('../models/index.js');
const bcrypt = require('bcryptjs');

module.exports = {
    singUser: function(user) {
        const token = jwt.sign({
            username: user.username, 
            userid: user.userid
        },
        'secret',
        {expiresIn: '1hr'}
        );
        return token;
        
    }, 

    verifyUser: function(req, res, next) {
        try {
            let token = req.cookies.jwt;
            const decoded = jwt.verify(token, 'secret');
            req.userData = decoded;
            models.users
                .findOne({
                    where: {
                        userId: decoded.userId
                    }
                })
                .then(user => {
                    req.user = user;
                    next();
                });
        }catch (err){
            console.log(err);
            returnres.status(401).json({
                message: "Authentication has failed."
            });
        }
    }, 

    hashPassword: function(plainTextPassword) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    }
};