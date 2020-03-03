type vDomProps = {
  key: string;
  [prop: string]: string;
};

class VDom {
  type: string | Function;

  props: vDomProps;
  children: VDom[];

  constructor(type: string | Function, props: vDomProps, children: VDom[]) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
//
function createElement(
  type: string | Function,
  props: vDomProps,
  ...children: VDom[]
) {
  return new VDom(type, props, children);
}

class ReactComponent {
  mountComponent(): string {
    throw "you must override this method!";
  }

  updateComponent() {
    throw "you must override this method!";
  }
}

class ReactDomComponent extends ReactComponent {
  vDom: VDom;
  constructor(element: VDom) {
    super();
    this.vDom = element;
  }

  mountComponent() {
    return "";
  }

  updateComponent() {}
}

class ReactCompositeComponent extends ReactComponent {
  vDom: VDom;
  constructor(element: VDom) {
    super();
    this.vDom = element;
  }

  mountComponent() {
    return "";
  }

  updateComponent() {}
}

class ReactTextComponent extends ReactComponent {
  vDom: string | number | bigint | boolean;

  constructor(element: string | number | bigint | boolean) {
    super();
    this.vDom = element;
  }

  mountComponent() {
    return `<span data-reactid="${new Date().valueOf()}-${Math.random().toString()}">${
      this.vDom
    }</span>`;
  }

  updateComponent() {}
}

// todo: diff
/**
 *
 * @param element
 * @param container
 */
function render(
  element: VDom | string | number | bigint | boolean,
  container: HTMLElement
) {
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
  render(
    element: VDom | string | number | bigint | boolean,
    container: HTMLElement
  ) {
    // todo: diff
    container.innerHTML = "";
    render(element, container);
  }
};

export default React;
