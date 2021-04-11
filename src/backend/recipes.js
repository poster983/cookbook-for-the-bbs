let {db} = require("./db.js")

const { v4: uuidv4 } = require('uuid');

const common = require("./common")

const _ = require('lodash');


/**
* @typedef Steps
* 
* @property {String} description - Description of the step
* @property {Number}  - Time in seconds 
* @property {String} title
*
*/

/**
* Adds a new recipe to the database
* @param {Object} doc
* @param {String} doc.name - Name of the recipe
* @param {String} doc.description
* @param {UUID} doc.userID - ID of thr user that created this
* @param {String[]} doc.tags - Tags that define this recipe
* @param {String[]} doc.ingredients - A list of ingredients
* @param {Steps[]} doc.setupSteps
* @param {Steps[]} doc.cookingSteps
* 
*/
async function create({name, description, userID, ingredients, imgsrc, tags, setupSteps, cookingSteps}) {
    if(!validateSteps(setupSteps)) {
      throw new TypeError("setupSteps: description: String, time: Number, title: String")
    }
    if(!validateSteps(cookingSteps)) {
      throw new TypeError("cookingSteps: description: String, time: Number, title: String")
    }
  
  if(!name) {
    throw new TypeError("name: String")
  }
  if(!description) {
    throw new TypeError("description: String")
  }
  if(!userID) {
    throw new TypeError("userID: String")
  }
  if(!ingredients || !(ingredients && Array.isArray(ingredients))) {
    throw new TypeError("ingredients: String[]")
  }
  if(!tags || !(tags && Array.isArray(tags))) {
    throw new TypeError("tags: String[]")
  }
  let doc = { id: uuidv4(), 
             name: name,
             imgsrc: imgsrc,
             description: description,
             userID: userID, 
             ingredients: ingredients,
             tags:tags, 
             setupSteps: setupSteps,
             cookingSteps:cookingSteps,
             _collections: []
            };
  try {
    
     db.get('recipes')
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


function validateSteps(steps) {
  if(!steps) {
    return false;
  }
  return steps.every((step) => {
    //console.log(typeof step.time, (step && step.description && (typeof step.time == "number" || step.time == null) && step.title))
    if(!(step && step.description && (typeof step.time == "number" || step.time == null)  && step.title)) {
      return false;
    }
    return true
  });
  
  //return true;
}


/**
* Gets and filters the recipe database
* @param {Object} query
*  @param {UUID} query.userID
*  @param {UUID} query.id
*/

async function filter(query) {
  try {
    console.log(query.userID)
    console.log(query != {})
    let q = db.get('recipes')
    if(query && !_.isEmpty(query)) {
      /*let filter = {}
      if(query.id) {filter.id = query.id}
       if(query.id) {filter.id = query.id}*/
      q = q.filter(query)
    }
      
    let resp = q.value()
    //console.log(resp)
    /*let resp = await db.recipes.find({_id: id, userID: userID });
    return resp;*/
    return resp;
  } catch(e) {
    throw e;
  }
}



/*export default async (datastore) => {
  
  return {
    
  }
  
  
}*/

module.exports = {create, filter}