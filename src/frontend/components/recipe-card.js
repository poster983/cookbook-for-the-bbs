import { LitElement, html, customElement, property, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

/**
 * @class RecipeCard
 * @classdesc Custom Element that displays a preview to a recipe
 */
export class RecipeCard extends LitElement {
  // PUT CSS STUPP BELOW-------------------------------------------------------------------------------------------

  // the CSS for this custom element
  static get styles() {
    return css`
      *,
*::before,
*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html{
    font-family: 'Roboto', sans-serif;
    font-size: 10px
}

img{
    width:100%;
}

body{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    padding: 0 1.5rem;
}

.recipe-card{
    width: 10%;
    max-width: 98rem;
    padding: 5rem;
    background-color: #fff;
    box-shadow: 0 1.4rem 8rem rgba(0,0,0,0,.2);
    display: flex;
    align-items: center;
    border-radius: .8rem;
}

.recipe-card-img{
    min-width: 35rem;
    max-width: 35rem;
    height: 30rem;
    transform: translateX(-8rem);
    position: relative;
}
.recipe-card-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: .8rm;
}

.recipe-card-img::before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to right, rgba(79, 172, 254, .8),
                                            rgba(0, 242, 254, .8));
    box-shadow: .5rem .5rem 3rem 1px rgba(0,0,0,.5);
    border-radius: .8rem;
}

.recipe-card-tags span{
    display: block;
    color: rgba(0,0,0,.5);
    font-size: 1.6rem;
    font-weight: 600;
    margin: .5rem 0;
}

.recipe-card-title{
    font-size: 2.5rem;
    margin: 1.5rem 0 2rem;
    text-transform: uppercase;
    color: royalblue;
}

.recipe-card-text{
    margin-bottom:3rem;
    font-size: 1.4rem;
    color: royalblue;

}

.recipe-card-cta{
    display: inline-block;
    padding: 1.5rem 3rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 1.2rem;
    color: sandybrown;
    background-image: linear-gradient(to right, blue 0%, red 100%);
    border-radius: .8rem;
     text-decoration: none;
   
}

.recipe-card-cta:hover{
    background-image: linear-gradient((to right, red 0%, blue 100%));
}
    `;
  }

  // CSS ABOVE----------------------------------------------------------------------------------------------------

  static get properties() {
    return {
      description: { type: String },
      name: { type: String },
      tags: { type: Array },
      imgsrc: { type: String },
      recipeID: {type: String}
    };
  }
  constructor() {
    super();
    this._hasrendered = false;
  }

  //will be called when the element is loaded for the first time
  firstUpdated() {
    //let image = this.shadowRoot.querySelector("#image");
    this._hasrendered = true;
    /*let div = this.shadowRoot.querySelector("#test");
      div.innerHTML = "hi"*/
    console.log(this.tags);
  }

  //HTML BLOW---------------------------------------------------------------------------------------------------------

  render() {
    return html`
      <!-- HERE-->

      <div class="recipe-card">
        <!--Recipe card image-->
        <div class="recipe-card-img"><img src="${this.imgsrc}" /></div>

        <!--Recipe card info-->
        <div class="recipe-card-info">
          <div class="recipe-card-tags"></div>

          <h1 class="recipe-card-title">${this.name}</h1>
          <p class="recipe-card-txt">
            ${this.description}
          </p>
          ${this.recipeID?
          html`<a href="#" class="recipe-card-cta">Read more</a>`
          :html`<!--No Recipe ID -->`
          }
          
        </div>
      </div>
    `;
  }
}

// HTML ABOVE----------------------------------------------------------------------------------------------------------------

customElements.define("recipe-card", RecipeCard);
