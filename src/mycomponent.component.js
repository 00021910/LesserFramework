// ------- Import Lesser Component Renderer ------------- //
import { Lesser } from "../lesser.renderer";

// ------- Creating the class ------- //

export class Greeting extends Lesser.Component{
    constructor(){
        super();
        const root = Lesser.root(this, 1);
        var span = document.createElement("span");
        if( !this.props("name") ){
          this.setProp("name", "Anonymous");
        }
        
        span.textContent = `Hello, ${this.props("name")}!`;
        root.appendChild(span);

      }
}


/*

Below, you can see, there is creating new HTML Element using Lesser.define() method.
--- How to use ---
1-argument is for tag's name. NODE: this must include " - " sign.
------------------
2-argument is for Class of that tag. You can use class that created on the top.
------------------

*/

Lesser.define("greet-me", Greeting);
