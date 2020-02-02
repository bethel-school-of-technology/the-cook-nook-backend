module.exports = (app) => {
    const users = require('../controllers/user.controllers.js'); 
    //Create new user on the homepage
    app.post('/', users.create);
    //authenticate user 
    app.post('/login', passport.authenticate('local', { successRedirect: '/:userId/recipes',
    failureRedirect: '/login' }));
    //add a recipe
    app.post('/:userId/recipes/add', users.create);
    //displays all recipes
    app.get('/:userId/recipes', users.findAll);
    //I really think we do not need 3 seperate edit pages
    app.put('/:userId/recipes/edit', users.update);
    //delete recipes
    app.delete('/:userId/recipes/:recipeId', users.delete);


    
}