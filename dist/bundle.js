"use strict";

class VDom {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
//
function createElement(type, props, ...children) {
  return new VDom(type, props, children);
}
class ReactComponent {
  mountComponent() {
    throw "you must override this method!";
  }
  updateComponent() {
    throw "you must override this method!";
  }
}
// todo: diff
/**
 *
 * @param element
 * @param container
 */
function render(element, container) {
  if (typeof element !== "object") {
    const child = document.createTextNode(element.toString());
    return container.appendChild(child);
  } else if (typeof element.type === "string") {
    const child = document.createElement(element.type);
    element.children.forEach(ele => {
      render(ele, child);
    });
    return container.appendChild(child);
  }
}
const React = {
  ReactComponent,
  createElement,
  // todo: the render should be the same with above render function
  render(element, container) {
    // todo: diff
    container.innerHTML = "";
    render(element, container);
  }
};

module.exports = React;
//# sourceMappingURL=bundle.js.map
