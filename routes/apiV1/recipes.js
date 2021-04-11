var express = require('express')
var router = express.Router()

const recipes = require("../../src/backend/recipes.js")


//create a recipe ( /apiV1/recipes)
router.post("/", (req, res, next) => {
  
  console.log(req.body);
  
  recipes.create(req.body)
    .then((transaction) => {
      console.log(transaction)
    res.status(201)
      res.json(transaction)
    }).catch((e) => {
    res.status(400);
    res.send(e.toString())
  })
});


//gets a recipe by id 
router.get("/:id", (req, res, next) => {
  
  
  
  recipes.filter({id: req.params.id})
    .then((recipe) => {
      res.json(recipe[0])
    })
    .catch((e) => {
    res.status(500)
    res.send(e)
  })
});


//filters recipes using query (/apiV1/recipes?id=sdiuerui&userID=4883)
router.get("/", (req, res, next) => {
  
  
  
  recipes.filter(req.query)
    .then((recipe) => {
      res.json(recipe)
    })
    .catch((e) => {
    res.status(500)
    res.send(e)
  })
});





module.exports = router