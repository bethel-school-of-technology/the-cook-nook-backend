const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/users.model');

app.use(cors()); 
app.use(bodyParser.json()); 
/* app.use('/home', require('./routes/home'));
app.use('/user', require('./routes/user'));
 */

app.get('/', (req, res) => {
    res.send("Yep it's working");
})

app.post('/', (req, res, next) => {
    console.log("Test1");
    const user = new User({
        username: req.body.username, 
        password: req.body.password, 
        email: req.body.email, 
        phone: req.body.phone
    })
    console.log("Test2");
    user.save(); 
    console.log(user);
})

mongoose.connect(
    "mongodb+srv://JanineParham:Buttrfly1!@cluster1-rhl99.mongodb.net/test?retryWrites=true&w=majority",
    {useNewUrlParser: true}, {useUnifiedTypology: true}, 
() =>console.log('Connected to DB')
);

app.listen(8080);