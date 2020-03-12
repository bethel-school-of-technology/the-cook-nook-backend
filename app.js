const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require('./api/routes/recipe');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://dbuser:'
+ process.env.MONGO_ATLAS_PW +
'@clusterlnsql-c8qfp.mongodb.net/test?retryWrites=true&w=majority', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true

});

//shows in command terminal when you use app
app.use(morgan('dev'));
//extracts json and url data and makes it easier to read for us
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Handles CORS errors
app.use(cors());

//Routes which should handle requests
app.use('/api', userRoutes);
app.use('/api/logged', recipeRoutes);

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

app.listen(3000)

module.exports = app;