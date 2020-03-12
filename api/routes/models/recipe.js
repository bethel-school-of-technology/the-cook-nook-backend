const mongoose = require('mongoose');
//const {mongooseAssociation} = require('mongoose-association'); 
//mongooseAssociation(mongoose);

const recipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: { type: String, required: true},
    type: { type: String, required: true},
    desc: { type: String, required: true},
    time: { type: String, required: true},
    ing: {type: String, required: true},
    toolsNeeded: {type: String, required: true},
    instructs: {type: String, required: true}
});

//recipeSchema.hasOne('User') //possible association code

module.exports = mongoose.model('Recipe', recipeSchema)