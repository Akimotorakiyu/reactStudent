type vDomProps = {
  key: string;
  [prop: string]: string;
};

type ElementType = VDom | string | number | bigint | boolean;

export class VDom {
  type: string | Function;

  props: vDomProps;
  children: ElementType[];

  constructor(
    type: string | Function,
    props: vDomProps,
    children: ElementType[]
  ) {
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

interface vFun {
  (): VDom;
}
// todo: diff
/**
 *
 * @param element
 * @param container
 */
function render(
  element: ElementType | vFun,
  container: HTMLElement
): ElementType | HTMLElement {
  console.log(element);
  if (typeof element !== "object" && typeof element !== "function") {
    const child = document.createTextNode(element.toString());
    container.appendChild(child);

    return element;
  } else if (Array.isArray(element)) {
    const child = document.createElement("template");
    element.forEach(ele => {
      render(ele, child);
    });

    [...child.childNodes].forEach(ele => {
      container.appendChild(ele);
    });

    return child;
  } else if (typeof element == "function") {
    // todo : wip
    const newElement = element();

    render(newElement, container);
    return newElement;
  } else if (typeof element.type === "string") {
    const child = document.createElement(element.type);
    element.children.forEach(ele => {
      render(ele, child);
    });
    container.appendChild(child);
    return element;
  } else if (typeof element.type === "function") {
    const newElement = element.type();
    render(newElement, container);
    return newElement;
  }
}

const React = {
  ReactComponent,
  createElement,
  // todo: the render should be the same with above render function
  render(
    element: ElementType | vFun,
    container: HTMLElement
  ): ElementType | HTMLElement {
    // todo: diff
    container.innerHTML = "";
    return render(element, container);
  }
};

export default React;
