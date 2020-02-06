module.exports = (app) => {
    const passport = require('passport');
    const users = require('../controllers/user.controllers.js'); 
    
    //Create new user on the homepage
    app.post('/', users.create, {successRedirect: '/login'});
    
    //authenticate user 
    app.post('/login', passport.authenticate('local', {successRedirect: '/:userId/recipes',
    failureRedirect: '/login' }));
    
    //displays all recipes
    app.get('/:username/recipes', users.findAll);
    
    //displays bfast recipes
    app.get('/:username/recipes/breakfasts', users.findAll);

    //displays lunch recipes
    app.get('/:username/recipes/lunches', users.findAll);

    //displays dinner recipes
    app.get('/:username/recipes/dinners', users.findAll);

    //displays dessert recipes
    app.get('/:username/recipes/desserts', users.findAll);

    //displays beverage recipes
    app.get('/:username/recipes/beverages', users.findAll);

    //add a recipe
    app.post('/:username/recipes/add', users.create);
    
    //I really think we do not need 3 seperate edit pages
    app.put('/:username/recipes/edit', users.update);
    
    //delete recipes
    app.delete('/:username/recipes/:object', users.delete);

    //About/Contact page
    app.post('/username/contact', user.create);

    //add logout route here later
}