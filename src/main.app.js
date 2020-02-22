import { Greeting } from "./mycomponent.component.js";
import { Main } from "./example.component.js";
import homePage from "./home.html"

export const $imported_Modules = [
    Greeting,
    Main
];

export const $routes = {
    "home/": homePage
}

console.log(homePage)
