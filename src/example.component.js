import { Lesser, html, render, Literator } from "../lesser.renderer";
import { logo_transparent } from "./assets/logo_transparent.png";
import htmlContent from "./example.component.html";

export class Main extends Lesser.Component{
    constructor(){
        super();
        const root = Lesser.root(this, 1);
        var mainDiv = document.createElement("div");
        mainDiv.id = "main";        

        const proj = {
            name: this.props("proj-name") || "Hello World",
            version: this.props("version") || "1.0.0",
            props: this.getProps( { as: "array" } ),
            custom: this.props("custom") || " ",
            logo: logo_transparent
        };
        content = Literator(htmlContent);
        let mainComponent = render(proj, () => html(content, proj));
        mainDiv.innerHTML = mainComponent;

        root.appendChild(mainDiv);
        }
}

Lesser.define("example-component", Main);