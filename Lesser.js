/** MADE BY MASHARIBOV AZIZBEK */

export let _Version = "1.0.0";

export const Lesser = {
  Component: class extends HTMLElement {
    constructor() {
      super();
    }

    // Useless, but why not.
    get attrs() {
      return this.attributes;
    }

    // Special methods to change the attachShadow mode to open/closed (more fucking useless code)
    openShadow() {
      this.attachShadow({mode: "open"});
    }
    closedShadow() {
      this.attachShadow({mode: "closed"});
    }
    // TODO: IT IS NOT WORKING, MAKE IT WORK, CUNT!
    registerAs(tagname = "") {
      Lesser.define(this, tagname)
    }

    // Some basic stuff
    OnInit() {}
    OnDestroy() {}

    // What the hell am I doing...
    Kill() {
      this.remove();
    }

    // Using built in shadow DOM callbacks and making it look like its framework's magic using OnInit and OnDestroy methods... I am a horrible human being.
    connectedCallback() {
      this.OnInit();
    }
    disconnectedCallback() {
      this.OnDestroy();
    }

    // These two funcs are designed to add html and css literals to the shadow root (component's root).
    // Well, I knew why I wrote that $Element function and why I put it here, but now, only god knows.
    // So, it stays, because it is still working.
    addHTML(htmlLIT) {
      this.shadowRoot.appendChild(
        $Element(htmlLIT)
      );
    }
    addCSS(cssLIT) {
      this.shadowRoot.appendChild(
        cssLIT
      )
    }
  },

  // Registering the Component Class as a Custom Web Component. But it should include dash ("-"), so I made this bloody awful method 
  Define: (tagName, className) => {
    if (tagName.includes("-")) window.customElements.define(tagName, className);
    else window.customElements.define(`l-${tagName}`, className); 
    // YAAAY "UNDEFINED" THINGY IS GONE NOW!
    BindScan(document.querySelector(tagName), GlobalBinds.variables);
  },

  Router: {
    rootElement: (elem=new HTMLElement()) => {

    }
  },
  Route: class {
    constructor(path="/", content, hashRoutes=[]) {
      this.path = path;
      this.content = content;
      this.hashRoutes = hashRoutes;
    }
    static newHashRoute(hashpath, content) {
      if (hashpath[0] == "#") R_hashpath = hashpath;
      else R_hashpath = `#${hashpath}`;
      return {R_hashpath: content}      
    }
  },

  // Scope for binded variables; I mean, we can't just keep it in window scope forever. So I made this shitty object
  BINDED_VARIABLES: {},
  Utils: {
    typ: (_) => {
      return typeof _;
    },
    comptyp: (_, type) => {
      return typeof _ == type;
    },
    isNumeric: (_=0) => Lesser.Utils.comptyp(_, "number"),
    isString: (_="String") => Lesser.Utils.comptyp(_, "string"),
    isChar: (_="_") => Lesser.Utils.comptyp(_, "symbol"),
    isObj: (_={}) => Lesser.Utils.comptyp(_, "object"),
    isBool: (_=true) => Lesser.Utils.comptyp(_, "boolean"),
    isUndef: (_=undefined) => Lesser.Utils.comptyp(_, "undefined"),
    isBig: (_=new BigInt()) => Lesser.Utils.comptyp(_, "bigint"),
    isFunc: (_=function(){}) => Lesser.Utils.comptyp(_, "function"),
    __show_warnings_RandomC__: true,
    Random: class {
      static suppressWarnings() {
        Lesser.Utils.__show_warnings_RandomC__ = false;
        return this;
      }
      static showWarnings() {
        Lesser.Utils.__show_warnings_RandomC__ = true;
        return this;
      }
      static $seed(min=0, max=1, seed=null) {
        if (seed != null && (Lesser.Utils.isNumeric(seed) || Lesser.Utils.isString(seed))) {
          console.log("Seed found...");
          if (Lesser.Utils.isString(seed)) seed = parseInt(seed); 
          let s = ( seed * 9301 + 49297 ) % 233280;
          let r = s / 233280;
          let d = Math.abs( Math.sin(seed));
          r = (r + d) - Math.floor((r + d));
          return Math.floor(min + r * (max - min + 1));
        } else{
          console.log("Seed not found");
          if (Lesser.Utils.__show_warnings_RandomC__ && true) console.alert("Could not initialize seeding in getRnd method [Lesser.Utils.Random.getRnd()], using built-in function to return random...");
          return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        }
      }
    }
  }
};

function makeLit(literals, ...vars) {
  let raw = literals.raw, result = '', i = 1, len = arguments.length, str, variable;
  // TODO: Sanitize before transfering the data
  while (i < len) {
    str = raw[i - 1];    
    variable = vars[i -1];
    result += str + variable;
    i++;
  }
  result += raw[raw.length - 1];
  return result;
}

export function html(literals, ...vars) {
  return makeLit(literals, ...vars);
}
export function css(literals, ...vars) {
  let styleElem = document.createElement("style");
  styleElem.textContent = makeLit(literals, ...vars);
  return styleElem;
}

// WTH DOES THAT DO? CHANGE SOME MARKUP STRING INTO HTML ELEMENT INSIDE A FRAGMENT OBJECT? HELL NO... But it is not working without these functions, so they will stay
export function $Elements(markup) {
 /* if (typeof document.body.insertAdjacentHTML === "function") {
    let template = document.createElement("template");
    template.insertAdjacentHTML("beforeend", markup);
    return template.childNodes;
  } else { */
    let supported = (function () {
      if (!window.DOMParser) return false;
      var parser = new DOMParser();
      try {
        parser.parseFromString('x', 'text/html');
      } catch(err) {
        return false;
      }
      return true;
    })();
    
    if (supported) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(markup, 'text/html');
      return doc.body.childNodes;
 // }
}
    
  const temp = document.createElement('div');
  temp.innerHTML = markup;
  return temp.childNodes;
}
// Another amusing chunk of amateur work. Bravo, past me. (And, keeping "unneccesary" code in comments... Brilliant. Goddamn brilliant.)
export function $Element(markup) {
  /*if (typeof document.body.insertAdjacentHTML === "function") {
    let fragment = document.createDocumentFragment();
    let template = document.createElement("template");
    template.insertAdjacentHTML("beforeend", markup);
    fragment = template.content;
    return fragment;
  } else {*/
  let supported = (function () {
    if (!window.DOMParser) return false;
    var parser = new DOMParser();
    try {
      parser.parseFromString('x', 'text/html');
    } catch(err) {
      return false;
    }
    return true;
  })();

  if (supported) {
    var parser = new DOMParser();
		var doc = parser.parseFromString(markup, 'text/html');
    const frag = document.createDocumentFragment();
    const children = Array.prototype.slice.apply(doc.body.childNodes);
    children.map(el => frag.appendChild(el));
    return frag;
// }
  }

  const temp = document.createElement('div');
  temp.innerHTML = markup;
  const frag = document.createDocumentFragment();
  const children = Array.prototype.slice.apply(temp.childNodes);
  children.map(el => frag.appendChild(el));
  return frag;
}

// Idk what am I doing.
export class BindingManager {
  constructor(){
    this.localBinds = {};
  }

  newBinding(id, value) {
    Lesser.BINDED_VARIABLES[id] = value;
    this.localBinds[id] = value;
  }

  get variables() {
    return Lesser.BINDED_VARIABLES;
  }

  get locals() {
    return this.localBinds;
  }

  logBindings() {
    console.log(this.variables);
  }

  logLocalBindings() {
    console.log(this.localBinds);
  }

  logAllBindings() {
    console.log({GLOBALLY: this.variables, LOCALLY: this.localBinds});
  }
}

export const GlobalBinds = new BindingManager();

let cachedBinds = {}

class CachedBind {
  constructor(options = {bindKey: "", bindValue: null, randomizedAddress: 0}) {
    this._bk = options.bindKey;
    this._bv = options.bindValue;
    this._rdadd = options.randomizedAddress;
  }
}

let cachedBindValues = {}

let execBindTag = (binder, scope, varName) => {
  let tmp = binder.innerText.trimLeft().trimRight();
  if (binder.tagName.toLowerCase() == "bind" && binder.innerText.trim() != "") {
    if (binder.hasAttribute("addressaftercaching")) {
      let _sckey = cachedBinds[binder.getAttribute("addressaftercaching")]._bk;
      binder.innerHTML = scope[_sckey];
      return
    } 
    if (tmp in cachedBindValues) {
      binder.setAttribute("addressaftercaching", cachedBindValues[tmp]);
      let _sckey = cachedBinds[binder.getAttribute("addressaftercaching")]._bk;
      binder.innerHTML = scope[_sckey];
      return
    }
    let randomizedAddress = Lesser.Utils.Random.showWarnings().$seed(0, 999999, Math.random());
    binder.setAttribute("addressaftercaching", randomizedAddress);
    cachedBinds[randomizedAddress] = new CachedBind({bindKey: tmp, bindValue: scope[tmp], randomizedAddress: randomizedAddress});
    cachedBindValues[tmp] = randomizedAddress;
    let _sckey = cachedBinds[binder.getAttribute("addressaftercaching")]._bk;
    binder.innerHTML = scope[_sckey]
  } else {
    binder.innerHTML = scope[varName];
  }
}

// !__EXPERIMENTAL__! (Did I fuck up?? Probably. At least, it is working...)
export let BindScan = (elem, scope = window /** WINDOW? WTF? THAT IS TERRIBLE! Too bad..! */) => {
  let rootPoint;
  console.log(scope);
  if (elem.shadowRoot) rootPoint = elem.shadowRoot;
  else rootPoint = elem;
  let _SelectableElements = [
    ...rootPoint.querySelectorAll("[bind]"),
    ...rootPoint.querySelectorAll("bind"),
  ];
  _SelectableElements.forEach(binder => {
    let varName = binder.getAttribute("bind");
    if (binder.tagName.toLowerCase() == "input" || binder.tagName.toLowerCase() == "textarea") {
      binder.value = scope[varName]; 
      binder.oninput = () => {
        scope[varName] = binder.value;
       _SelectableElements.forEach(_binded => {
          if (_binded.tagName.toLowerCase() == "input" || _binded.tagName.toLowerCase() == "textarea") {
            _binded.value = scope[varName];
            console.log(_binded.value);
            GlobalBinds.logAllBindings();
          } else {
           execBindTag(_binded, scope, varName);
          }
        });
      }
    } else {
      execBindTag(binder, scope, varName);
    }
  })
}

// Now we have to set up and place variable values between some bloody curvy scopes... I hate my life.
export let parseHtmlFile = rhtml => {
  // NOT FUCKING NOW, BITCH. IT IS #TODO, AND HAVE TO WAIT UNTIL WE FIX OTHER BUGS AND MAKE ACTUAL WORKING DEMO!
}