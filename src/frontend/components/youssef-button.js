import { LitElement, html, customElement, property, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

/**
 * @class RecipeCard
 * @classdesc Custom Element that displays a preview to a recipe
 */
export class YoussefButton extends LitElement {
  // the CSS for this custom element
  static get styles() {
    return css`
    button{
  width: 200px;
  padding: 15px 0;
  text-align: center;
  margin: 20px 10px;
  border-radius: 25px;
  font-weight: bold;
  border: 2px solid var(--button-color);
  background: transparent;
  color: var(--button-text-color);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.5s;
}

/* for the button case to make it look better */
span{
  background: var(--button-color);
  height: 100%;
  width: 0;
  border-radius: 25px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
  transition: 0.5s;
}

/* to make the button hover */
button:hover span{
  width: 100%;
}

button:hover{
  border-color: #00000000
}

    `;
  }
  //define attrbutes
  static get properties() {
    return {

      onclick: { type: String},
      label: { type: String },

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

  //the html template
  render() {
    return html`
      <button type="button"><a onclick= "${this.onclick}"><span></span><slot>${this.label}</slot></a></button>
    `;
  }
}

customElements.define("youssef-button", YoussefButton);
