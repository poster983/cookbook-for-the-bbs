var express = require('express')
var router = express.Router()

const collections = require("../../src/backend/collections.js")


//create a collection ( /apiV1/collection)
router.post("/", (req, res, next) => {
  
  console.log(req.body);
  
  collections.create(req.body)
    .then((transaction) => {
      console.log(transaction)
      res.status(201);
      res.json(transaction)
    }).catch((e) => {
    res.status(400);
    res.send(e.toString())
  })
});

//filters collections using query (/apiV1/recipes?id=sdiuerui&userID=4883)
router.get("/", (req, res, next) => {
  
  collections.filter(req.query)
    .then((recipe) => {
      res.json(recipe)
    })
    .catch((e) => {
    res.status(500)
    res.send(e)
  })
});

router.put("/:collectionID/recipes/:recipeID", (req, res, next) => {
  
  console.log(req.body);
  
  collections.addRecipe(req.params.collectionID, req.params.recipeID)
    .then((transaction) => {
      console.log(transaction)
      res.json(transaction)
    }).catch((e) => {
    res.status(400);
    res.send(e.toString())
  })
});


//gets a collection by id 
router.get("/:id", (req, res, next) => {
  
  
  
  collections.filter({id: req.params.id})
    .then((recipe) => {
      res.json(recipe[0])
    })
    .catch((e) => {
    res.status(500)
    res.send(e)
  })
});








module.exports = router