const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({extened: true}));
app.use(bodyParser.json()); 

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise; 

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database.');

}).catch(err => {
    console.log("Could not connect to the database. Exiting now."); 
    process.exit();
})

require('./app/routes/users.routes.js/index.js')(app);




app.listen(8080, () => {
    console.log("Server is listening in on port 8080");
});