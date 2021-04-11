const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const recipes = new FileSync(__dirname+'/../../db/lowdb.json')

const db = low(recipes)

db.defaults({ recipes: [], collections: [] })
  .write()




module.exports = {db}