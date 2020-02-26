const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('./middleware/check-auth'); //inserted into recipe routes so that only users can see their recipes still working on errors
const Recipe = require("./models/recipe");

//logged page see all recipes page//
router.get('/', checkAuth, (req, res, next) => {
    Recipe.find()
    .select('name type desc time ing toolsNeeded instructs _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            recipes: docs.map(doc => {
                return {
                    name: doc.name,
                    type: doc.type,
                    desc: doc.desc,
                    time: doc.time,
                    ing: doc.ing,
                    toolsNeeded: doc.toolsNeeded,
                    instructs: doc.instructs,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/home/logged/' + doc._id 
                    }
                }
            })
        };
       // console.log(docs);
       // if(docs.length >= 0) {
           res.status(200).json(response); 
       // } 
   //     else {
   //         res.status(404).json({
   //             message:"No entries found"
   //         });
   //     }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.post('/add', checkAuth, (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        desc: req.body.desc,
        time: req.body.time,
        ing: req.body.ing,
        toolsNeeded: req.body.toolsNeeded,
        instructs: req.body.instructs
    });
    recipe.save().then(result => {
        console.log(result); 
        res.status(201).json({
        name: "Created Recipe",
        createdRecipe: {
            name: result.name,
            type: result.type,
            desc: result.desc,
            time: result.time,
            ing: result.ing,
            toolsNeeded: result.toolsNeeded,
            instructs: result.instructs,
            _id: result._id,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/home/logged/' + result._id 
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
   
    })
})

router.get('/:recipeId', checkAuth, (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findById(id)
    .select('name type desc time ing toolsNeeded instructs _id')
    .exec()
    .then(doc => {
        console.log("From Database",doc);
        if (doc) {res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                description: 'GET ALL RECIPES',
                url: 'http://localhost:3000/home/logged'
            }
        })
        }
        else {
            res.status(404).json({message: "No valid entry found for provided ID"});
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

router.patch('/edit/:recipeId', checkAuth, (req, res, next) => {
    const id = req.params.recipeId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Recipe.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Recipe Updated!",
            request: {
                type: 'GET',
                url: "http://localhost:3000/home/logged/" + id            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});

router.delete('/:recipeId', checkAuth, (req, res, next) => {
   const id = req.params.recipeId;
   Recipe.remove({_id: id})
   .exec()
   .then(result => {
       res.status(200).json({
           message: "Recipe Deleted!" ,
           request: {
               type: 'POST',
               url: "http://localhost:3000/home/logged/add",
               body: {  name: 'String',
                        type: 'String',
                        desc: 'String',
                        time: 'String',
                        toolsNeeded: 'String',
                        ing: 'String',
                        instructs: 'String'}

           }
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       });
   });
    
});

module.exports = router;