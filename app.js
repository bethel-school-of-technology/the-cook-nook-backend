const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const recipeRoutes = require('./api/routes/recipe');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://dbuser:'
+ process.env.MONGO_ATLAS_PW +
'@clusterlnsql-c8qfp.mongodb.net/test?retryWrites=true&w=majority', 
{
    useMongoClient: true
});

//shows in command terminal when you use app
app.use(morgan('dev'));
//extracts json and url data and makes it easier to read for us
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Handles CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/home', userRoutes);
app.use('/home/logged', recipeRoutes);

//error handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;