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
      if(tagname.trim() != "") {
        if(tagname.includes("-")) window.customElements.define(tagname, this);
        else window.customElements.define(`l-${tagname}`, this); 
      }
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

export let $ = document.querySelectorAll;

export let Version = "1.0.0";

(() => {
  document.querySelectorAll("[bind]").forEach(binder => {
    if (binder.tagName.toLowerCase() == "input") {
      let varName = binder.getAttribute("bind");
      binder.value = window[varName]; 
      binder.oninput = () => {
        window[varName] = binder.value;
        console.log(`${window[binder.getAttribute("bind")]} = ${binder.value}`);
        $("[bind]").forEach(binded => {
          if (binded.tagName.toLowerCase() == "input") binded.value = binder.value;
          else binded.innerHTML = binder.value;
        })
      }
    } else {
      console.log("test");
    }
  });
})();

