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

function addItem() {
      var ul = document.getElementById("dynamic-list");
      var candidate = document.getElementById("candidate");
      var li = document.createElement("li");
      li.setAttribute('id', candidate.value);
      li.appendChild(document.createTextNode(candidate.value));
      ul.appendChild(li);
  }
  
  
  function removeItem() {
      var ul = document.getElementById("dynamic-list");
      var candidate = document.getElementById("candidate");
      var item = document.getElementById(candidate.value);
      ul.removeChild(item);
  }
