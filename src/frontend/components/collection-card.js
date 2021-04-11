import { LitElement, html, customElement, property, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

/**
 * @class RecipeCard
 * @classdesc Custom Element that displays a preview to a recipe
 */
export class CollectionCard extends LitElement {
  // PUT CSS STUPP BELOW-------------------------------------------------------------------------------------------

  // the CSS for this custom element
  static get styles() {
    return css`
      .box {
        width: 100%;
        height: 100%;
        position: relative;
        // border-width: 5px;
        // border-color: red;
        border: 4px solid var(--button-color);
      }
      .title{
        font-size: 30px;
      }

      .description{
        font-size: 15;
      }

      .tags{
        font-size: 12;
      }
      .image{
        width: 100%;
        length: 100%;
        height: auto;
      }
      // .parentclass{
      //     z-index: 3;
      //     position: absolute;
      // }
    `; 
  }

  // CSS ABOVE----------------------------------------------------------------------------------------------------

  static get properties() {
    return {
      description: { type: String },
      title: { type: String },
      tags: { type: Array },
      imgsrc: { type: String },
      collectionID: {type: String, attribute: 'collection-id'}
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
    this.addEventListener("click", (e) => {
      window.location.href = "/collections/" + this.collectionID
      //window.redirect();
    })
  }

  //HTML BLOW---------------------------------------------------------------------------------------------------------

  render() {
    return html`
      <!-- HERE-->
        <div class="box">
          <div class="parentclass"> 
            <h5 class="title">${this.title}</h5>
            <p class="description">${this.description}</p>
            <p class="tags">${this.tags}</p>
          </div>
          <img src="${this.imgsrc}" class="image">
        </div>
      
    `;
  }
}

// HTML ABOVE----------------------------------------------------------------------------------------------------------------

customElements.define("collection-card", CollectionCard);

