const mongoose = require('mongoose'); 
//const {mongooseAssociation} = require('mongoose-association'); 
//mongooseAssociation(mongoose);

const userSchema = mongoose.Schema({
    
    id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String, 
        require: true, 
        unique: true},
    password: {type: String, require: true},
    recipes: [{
        type: [String], 
        ref: "Recipe"
    }]
}); 

//userSchema.belongsTo('Recipe', {as: 'owner'}); //possible association code

module.exports = mongoose.model('User', userSchema);
