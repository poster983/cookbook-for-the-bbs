import { LitElement, html, customElement, property, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

/**
 * @class YoussefNavButton
 * @classdesc Custom Element that displays a preview to a recipe
 */
export class YoussefNavButton extends LitElement {
  // the CSS for this custom element
  static get styles() {
    return css`
      li{
        list-style: none;
        display: inline-block;
        margin: 0 20px;
        position: relative;
        transform: translateY(-3%);
      }
        /* for the text (anchor) */ 
        li a{
          text-decoration: none;
          color: #fff; /* white text */
          text-transform: uppercase;
        }

        /* for the hover effect */
        li::after{
          content: '';
          height: 3px;
          width: 0;
          background: var(--button-color);
          position: absolute;
          left: 0;
          bottom: 0;
          transition: 0.5s;
        }

        li:hover::after{
          width: 100%;
        }

    `;
  }
  //define attrbutes
  static get properties() {
    return {

      href: { type: String },

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
      <li><a href="${this.href}"><slot></slot></a></li>
    `;
  }
}

customElements.define("youssef-nav-button", YoussefNavButton);
