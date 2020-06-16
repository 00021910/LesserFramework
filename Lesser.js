export let Version = "1.0.0";

export const Lesser = {
  Component: class extends HTMLElement {
    constructor() {
      super();
    }

    get props() {
      return this.attributes;
    }

    openShadow() {
      this.attachShadow({mode: "open"});
    }
    closedShadow() {
      this.attachShadow({mode: "closed"});
    }
    registerAs(tagname = "") {
      Lesser.define(this, tagname)
    }
    connected() {}
    disconnected() {}

    connectedCallback() {
      this.connected();
    }

    disconnectedCallback() {
      this.disconnected();
    }

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
  Define: (tagName, className) => {
    if(tagName.includes("-")) window.customElements.define(tagName, className);
    else window.customElements.define(`l-${tagName}`, className); 
    bindGlobally(document.querySelector(tagName), className);
  }
};

export function html(literals, ...vars) {
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
export function css(literals, ...vars) {
  let raw = literals.raw, result = '', i = 1, len = arguments.length, str, variable;
  // TODO: Sanitize before transfering the data
  while (i < len) {
    str = raw[i - 1];    
    variable = vars[i -1];
    result += str + variable;
    i++;
  }
  result += raw[raw.length - 1];
  let styleElem = document.createElement("style");
  styleElem.textContent = result;
  return styleElem;
}

export function $Elements(markup) {
  /*if (typeof document.body.insertAdjacentHTML === "function") {
    let template = document.createElement("template");
    template.insertAdjacentHTML("beforeend", markup);
    return template.childNodes;
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
      return doc.body.childNodes;
//   }
    }
    
  const temp = document.createElement('div');
  temp.innerHTML = markup;
  return temp.childNodes;
}

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

export let bindGlobally = (elem, scope = window) => {
  let rootPoint;
  if (elem.shadowRoot) rootPoint = elem.shadowRoot;
  else rootPoint = elem;
  rootPoint.querySelectorAll("[bind]").forEach(binder => {
    let varName = binder.getAttribute("bind");
    if (binder.tagName.toLowerCase() == "input" || binder.tagName.toLowerCase() == "textarea") {
      binder.value = window[varName]; 
      binder.oninput = () => {
        window[varName] = binder.value;
        console.log(`Val: ${binder.value}`);
        rootPoint.querySelectorAll("[bind]").forEach(_binded => {
          if (_binded.tagName.toLowerCase() == "input" || _binded.tagName.toLowerCase() == "textarea") {
            _binded.value = window[varName];
          } else {
            _binded.innerHTML = window[varName];
          }
        });
      }
    } else {
      binder.innerHTML = window[varName];
    }
  })
}

bindGlobally(document);
