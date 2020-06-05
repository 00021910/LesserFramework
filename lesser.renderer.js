// Be ready to be insulted by this shitcode:

export const Lesser = {
    Component: class extends HTMLElement{

        constructor() {
          super();
          this.$tagname = "";
        }

        static getTagname() {
          return this.$tagname;
        }
        
        props(prop) {
          // returns attribute
            return this.getAttribute(prop);
        }
        setProp(prop, default_node) {
          // sets attribute to the [default_node] argument
            this.setAttribute(prop, default_node);
        }
        getProps(object = { as: "object" }) {
          // Gets all attributes as object or array
            if(object.as.toLowerCase() == "object") {
                let atts = {};
                let obj;
                
                for (obj in this.attributes){
                    atts[obj] = this.attributes[obj];
                }
                
                return atts;
 
            } else if(object.as.toLowerCase() == "array") {
                
                for (var i = 0, atts = this.attributes, n = atts.length, arr = []; i < n; i++){
                    arr.push(atts[i].nodeName);
                }

                return arr;
            
            } else {
              return console.error(
                "Invalid way to get attributes. Please, use method correctly"
                );
              
            }
        };

    },
    root: function(elem, type = 0){
        return elem.attachShadow({mode: type == 1 ? "open" : type == 0 ? "closed" : null});
    },

    define: function(name, elemClass){
        this.$tagname = name;
        window["customElements"].define(name, elemClass);
    },

    didMount: function(name){window.customElements.whenDefined(name)},

};

// do not FUCKIN touch if you dont know what you are doing.
/* LEGACY METHODS ------------------------------------------------------------------------ */
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
  
  export function Elementor(markup) {
    const temp = document.createElement('div');
    temp.innerHTML = markup;
    const frag = document.createDocumentFragment();
    const children = Array.prototype.slice.apply(temp.childNodes);
    children.map(el => frag.appendChild(el));
    return frag;
  }
  // Gotta improve that crap code...
  export function Literator(_rawData) {
    return `
              \`${_rawData}\`
           `
  }

  export function insert(target, fragment, position) {
    if (!node) return;
    let el;
    if (typeof target === 'string') {
      el = document.querySelector(target);
    } else if (target.nodeName) {
      el = target;
    }
    if (!position || position === 'append') {
      el.appendChild(fragment);
    } else if (position === 'prepend') {
      el.insertBefore(fragment, el.firstChild)
    } else if (position === 'before') {
      el.parentNode.insertBefore(fragment, el);
    } else if (position === 'after') {
      el.parentNode.insertBefore(fragment, el.nextElementSibling);
    }
  }


  export function render(data, template, jointer="", statement = "") {
  //if(statement == null || eval(statement) == true){
    if (!template) throw new SyntaxError('Use template functions to render the view.') ;
    if (typeof data === 'string') {
      return template(data);
    } else if (typeof data === 'object' && !Array.isArray(data)) {
      return template(data);
    } else if (Array.isArray(data)) {
      return data.map(item => template(item)).join(jointer);
    }
  //}  
  }

  // GODDAMN FAILURE.
/*export function $ReadFile(filePath) {
     return fetch(filePath).then(res => {
      if (!res.ok) throw new Error(`"${filePath}" FILE NOT FOUND.`);
     });
  }
*/
  export function sanitize(data) {
    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '(': '%28',
      ')': '%29',
    }
    
    let str = JSON.stringify(data);
    const replaceTag = function(tag) {
      return tagsToReplace[tag] || tag
    }
    
    const safe_tags_replace = function(str) {
      return str.replace(/[&<>\(\)]/g, replaceTag)
    }
    str = safe_tags_replace(str)
    return JSON.parse(str)
  }

  export function update(el = this, node) {
    el.textContent = ''
    el.appendChild(node)
  }

/* METHODS END ---------------------------------------------------------------------------------- */