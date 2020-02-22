import { $routes } from "./src/main.app.js";
import { html } from "./lesser.renderer";

    let contentDiv = document.querySelector("#spa");

    export const route = function(pathName) {
        window.history.pushState({}, pathName, window.location.origin + pathName);
        contentDiv.innerHTML = $routes[pathName];
    };
    
    window.onpopstate = () => {
        contentDiv.innerHTML = $routes[window.location.pathname];
    };

    document.body.innerHTML = html`${document.body.innerHTML}`;
    document.head.innerHTML = html`${document.head.innerHTML}`;