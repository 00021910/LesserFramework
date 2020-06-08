import { Lesser, html, css, $Element } from "../Lesser";

export class ExElem extends Lesser.Component {
    constructor() {
        super();
        this.openShadow();
        
        let varrr = "Hi bruh";

       this.addHTML(
        html`
            <h1> Aye, ${varrr} </h1>
            <input type="text" bind="varrr" />
            <input type="text" bind="varrr" />
            <p> ${varrr} </p>
        `
       );

       this.addCSS(
        css`
            h1 {
                color: blue;
            }
        `
       );
    }
}

Lesser.Define("example-tag", ExElem);