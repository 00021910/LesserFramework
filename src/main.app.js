import { Greeting } from "./mycomponent.component.js";
import { Main } from "./example.component.js";

export const $routes = {
    "home": Greeting.getTagname(),
    "test": Main.getTagname()
};
