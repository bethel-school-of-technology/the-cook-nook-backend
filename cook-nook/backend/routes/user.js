const express = require('express'); 
const router = express.Router();
let Recipes = require('../models/recipes.model'); 

router.get('/', async (req, res) => {
    try{
        const recipes = await Recipes.findAll(); 
        res.json(recipes);
    }catch (err) {
        res.json({ message: err}); 
    }
});


module.exports = router;