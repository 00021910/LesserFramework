import { Lesser, html, css, $Element } from "../Lesser";

export class ExElem extends Lesser.Component {
    constructor() {
        super();
        this.openShadow();
        
        this.shadowRoot.appendChild(
            $Element(
                html`
                <h1> Wassup </h1>
                `
            )
        )

        this.appendChild($Element(html`<h1>Hey</h1>`));
    }
}

Lesser.Define("example-tag", ExElem);