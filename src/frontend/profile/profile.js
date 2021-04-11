import "../commonstyle.css"
import "./styles.css"

import "../components/recipe-card.js"
import "../components/youssef-button.js"
import "../components/youssef-nav-button.js"
import "@material/mwc-top-app-bar"
import "@material/mwc-button"
import "@material/mwc-icon-button"


console.log("hello world");
console.log("hi there");

let recipeCard = document.getElementById("card");
console.log(recipeCard)
recipeCard.tags = ["fun and easy", "childish", "cheese"]