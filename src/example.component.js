import { Lesser, html, render } from "../lesser.renderer";
import { logo_transparent } from "./assets/logo_transparent.png";
import htmlContent from "./example.component.html";

export class Main extends Lesser.Component{
    constructor(){
        super();
        const root = Lesser.root(this, 1);
        var mainDiv = document.createElement("div");
        mainDiv.id = "main";        

        function exampleTemplate(obj){
            html(exampleComponent, obj)
        }

        const proj = {
            name: this.props("proj-name") || "Hello World",
            version: this.props("version") || "1.0.0",
            props: this.getProps( { as: "array" } ),
            custom: this.props("custom") || " ",
            logo: logo_transparent
        };

        let mainComponent = render(proj, exampleTemplate);

        console.log(mainComponent);
    
        mainDiv.innerHTML = mainComponent;

        root.appendChild(mainDiv);
        }
}

Lesser.define("example-component", Main);