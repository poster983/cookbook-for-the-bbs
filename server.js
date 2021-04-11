// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");

const mustacheExpress = require("mustache-express");

const B2 = require("backblaze-b2");

const recipes = require("./src/backend/recipes.js");
const collections = require("./src/backend/collections.js");

const app = express();

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(bodyParser.json());

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("homepage");
});

app.use("/apiV1", require("./routes/apiV1/api.js"));

app.get("/collections", (req, res) => {
  collections.filter()
    .then((collections) => {
      res.render("collections", { collections: collections });
    })
    .catch((e) => {
    res.status(500)
    res.send(e.message)
  })
  
});

app.get("/collections/:id", (req, res) => {
  collections.filter({id: req.params.id}, true)
    .then((collections) => {
      if(collections.length == 0) {
        res.status(404)
        res.send("NOT FOUND")
        return;
      }
      res.render("singleCollection", { collection: collections[0] });
    })
    .catch((e) => {
    res.status(500)
    res.send(e.message)
  })
  
});

/**
 * Get all recipes
 */
app.get("/recipes/new", (req, res, next) => { 
  res.render("newrecipe");
});

/**
 * Get all recipes
 */
app.get("/recipes", (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

app.get("/profile/", (req, res, next) => { //redirect to my profile by id TODO
  res.render("profile");
});

app.get("/profile/:id", (req, res, next) => { // Gets anothers profile by ID
  res.render("profile");
});

/**
 * Get a single recipe
 */
app.get("/recipes/:id", (req, res, next) => {
  //console.log(req.params.id)
  recipes
    .filter({ id: req.params.id }) //
    .then(recipe => {
      console.log(recipe);
      res.render("recipe", { recipe: recipe[0] });
    })
    .catch(e => {
      res.status(400);
      res.send(e.message);
    });
});

/**
 * Export a recipe to PDF
 */
app.get("/recipes/:id/pdf", (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
