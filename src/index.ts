import { genId } from "./key";
type vDomProps = {
  key?: string;
  id?: string;
  [prop: string]: string;
};

type ElementType = VDom | string | number | bigint | boolean;

export class VDom {
  type: string | Function;

  props: vDomProps;
  children: ElementType[];

  constructor(
    type: string | Function,
    props: vDomProps = {},
    children: ElementType[] = []
  ) {
    this.type = type;
    this.props = props || {};
    this.props.id = this.props.id || genId();
    this.children = children;
  }
}

export function Fragment(props, slots) {
  return createElement("Fragment", props, slots);
}

// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
//
function createElement(
  type: string | Function,
  props: vDomProps,
  ...children: VDom[]
) {
  // console.log("createElement", type, props, children)
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
  container: HTMLElement | DocumentFragment
): void {
  // value
  if (typeof element !== "object" && typeof element !== "function") {
    const child = document.createTextNode(element.toString());
    container.appendChild(child);
  }
  // node list
  else if (Array.isArray(element)) {
    const fragment = document.createDocumentFragment();
    element.forEach(ele => {
      render(ele, fragment);
    });

    container.appendChild(fragment);
  }
  // function component, run it and return a VDOM instance function component
  else if (typeof element == "function") {
    const newElement = element();
    render(newElement, container);
  }
  // VDOM instance tag component
  else if (typeof element.type === "string") {
    const child =
      element.type === "Fragment"
        ? document.createDocumentFragment()
        : document.createElement(element.type);
    console.log(element);
    Object.assign(child, element.props);
    element.children.forEach(ele => {
      render(ele, child);
    });
    container.appendChild(child);
  }
  // VDOM instance function component
  else if (typeof element.type === "function") {
    const newElement = element.type(element.props, element.children);
    render(newElement, container);
  }
}

const React = {
  ReactComponent,
  createElement,
  // todo: the render should be the same with above render function
  render(element: ElementType | vFun, container: HTMLElement) {
    // todo: diff
    container.innerHTML = "";
    render(element, container);
  }
};

export default React;
