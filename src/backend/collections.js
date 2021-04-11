let {db} = require("./db.js")

const { v4: uuidv4 } = require('uuid');

const _ = require('lodash');

const recipes = require("./recipes.js")


/**
* Adds a new collection to the database
* @param {Object} doc
* @param {String} doc.name - Name of the collection
* @param {String} doc.description - a short description of this collection
* @param {String} doc.imgsrc - a url to an image
* @param {UUID} doc.userID - ID of thr user that created this
* @param {String[]} doc.tags - Tags that define this collection
* 
*/
async function create({name, description, imgsrc, userID, tags}) {
  if(!name) {
    throw new TypeError("name: String")
  }
  if(!userID) {
    throw new TypeError("userID: String")
  }
  if(!description) {
    throw new TypeError("description: String")
  }
  if(!tags || !(tags && Array.isArray(tags))) {
    throw new TypeError("tags: String[]")
  }
  
  let doc = { id: uuidv4(), 
             name: name,
             description: description,
             userID: userID, 
             imgsrc: imgsrc,
             tags:tags, 
             _recipes: []
             };
  try {
    
     db.get('collections')
      .push(doc)
      .write()
  /*let resp = await db.recipes.insert(
  {
    name: name,
    userID: userID, 
    ingredients: ingredients,
    tags:tags, 
    setupSteps: setupSteps,
    cookingSteps:cookingSteps}
  )*/
  console.log("Inserted: ", doc)
  return doc
  } catch(E) {
    throw E;
  }
  
}

/**
* Adds a recipe to a collection
* @param {UUID} collectionID - the collection id to add this recipe to
* @param {UUID} recipeID - THe id of the recipe to add to the database
* 
*/
async function addRecipe(collectionID, recipeID) {
  if(!collectionID) {
    throw new TypeError("collectionID: UUID")
  }
  if(!recipeID) {
    throw new TypeError("recipeID: UUID")
  }
  
  let collectionExists = db.get('collections')
    .find({ id: collectionID })
    .size()
    .value()
  
  let recipeExists = db.get('recipes')
    .find({ id: recipeID })
    .size()
    .value()
  
  if(collectionExists == 0) {
    throw new Error("Collection not found at " + collectionID);
  }
  
  if(recipeExists == 0) {
    throw new Error("Recipe not found at " + recipeID);
  }
  
  //add recipe to collection ID
  try {
    db.get('collections')
      .find({ id: collectionID })
      .get("_recipes")
      .push(recipeID)
      .write()
  //add collection ID to recipe entry 
    db.get('recipes')
      .find({ id: recipeID })
      .get("_collections")
      .push(collectionID)
      .write()
    return true;
  } catch (e) {
    throw e;
  }
  
}

/**
* @param {Object} query - filter 
* @param {Bool} joinRecipe - If true will try and join the recipiesto the output
*/
async function filter(query, joinRecipe) {
  try {

    let q = db.get('collections')
    if(query && !_.isEmpty(query)) {
      /*let filter = {}
      if(query.id) {filter.id = query.id}
       if(query.id) {filter.id = query.id}*/
      q = q.filter(query)
    }
      
    let resp = q.value()
    
    /*if(joinRecipe) { // join the recipe ids to the record
      resp = await Promise.all(resp.map( async (col) => {
        if(col._recipes.length > 0) {
          col.recipes = [];
          //let promiceArray = [];
          col._recipes.forEach((recipeID) => { //loop through each ID 
            recipes.filter({id: recipeID}) 
              .then((recipeObj) => {
                if(recipeObj.length > 0) {
                  col.recipes.push(recipeObj[0])
                }
              });
          })
        }
        return col;
      }))
    }
    console.log(resp)*/
    
    //join 
    /*if (resp.length > 0 && joinRecipe) {
      resp.map((col) => { //loop through each collection
          
        if(col._recipes.length > 0 && joinRecipe) {//try and join the recipies
          col.recipes = [];
          let promiceList = [];
          resp._recipes.forEach((recipeID) => { //loop through each ID 
            recipes.filter({id: recipeID}) 
              .then((recipeObj) => {
                if(recipeObj.length > 0) {
                  resp.recipes.push(recipeObj[0])
                }
              });
          })
        }
        
        
        
      })
      
    }*/
    
    
    
    
    //console.log(resp)
    /*let resp = await db.recipes.find({_id: id, userID: userID });
    return resp;*/
    return resp;
  } catch(e) {
    throw e;
  }
}



module.exports = {create, addRecipe, filter}