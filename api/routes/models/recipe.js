const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    type: { type: String, required: true},
    desc: { type: String, required: true},
    time: { type: String, required: true},
    ing: {type: String, required: true},
    toolsNeeded: {type: String, required: true},
    instructs: {type: String, required: true}
})

module.exports = mongoose.model('Recipe', recipeSchema)