import { $routes } from "./src/main.app.js";
import { html } from "./lesser.renderer";

// Main divided area for all that crap

let contentDiv = document.querySelector("#spa");

/*  ROUTING LEGACY -------------------------------------------------------------------------------- */

export class Router{
    constructor(routename, routeview){
        this.routename = routename, this.routeview = routeview;
        contentDiv.innerHTML = html`${routeview}`;
    }
}

function Routing() {
    var hash = window.location.hash.substr(1).replace(/\//ig, '/');
    // Default route is first registered route
    var route = $routes[0];
    // Find matching route
    for (var index = 0; index < $routes.length; index++) {
        var tempRoute = $routes[index];
        if (hash == tempRoute.url) {
            route = tempRoute;
        }
    }
    // Fire route
    route.callback();
}
// Listener
window.addEventListener('popstate', Routing);
// Initial call
setTimeout(Routing, 0);

/*  LEGACY ENDS -------------------------------------------------------------------------------- */