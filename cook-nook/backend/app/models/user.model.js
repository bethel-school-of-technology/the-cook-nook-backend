const mongoose = require('mongoose'); 

const UserSchema = mongoose.Schema({ 
    username: String, 
    password: String,  
    recipes: [{
        bfast: [{
            name: String, 
            desc: String, 
            time: String, 
            ing: [],
            toolsNeeded: [],
            instructs: [{
                name: "Step" + (i + 1), //Maybe?
                subDesc: String
            }],     
        }], 
        lunch: [{
            name: String, 
            desc: String, 
            time: String, 
            ing: [],
            toolsNeeded: [],
            instructs: [{
                name: "Step" + (i + 1), //Maybe?
                subDesc: String
            }],     
        }], 
        dinner: [{
            name: String, 
            desc: String, 
            time: String, 
            ing: [],
            toolsNeeded: [],
            instructs: [{
                name: "Step" + (i + 1), //Maybe?
                subDesc: String
            }],     
        }], 
        dessert: [{
            name: String, 
            desc: String, 
            time: String, 
            ing: [],
            toolsNeeded: [],
            instructs: [{
                name: "Step" + (i + 1), //Maybe?
                subDesc: String
            }],     
        }], 
        bevs: [{
            name: String, 
            desc: String, 
            time: String, 
            ing: [],
            toolsNeeded: [],
            instructs: [{
                name: "Step" + (i + 1), //Maybe?
                subDesc: String
            }],     
        }]
    }]
})

module.exports = mongoose.model('User', UserSchema);
