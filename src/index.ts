import { genId } from "./key";
type vDomProps = {
  key?: string;
  id?: string;
  [prop: string]: string;
};

type ValueOrFunction<T, U> = T | U;

declare global {
  namespace JSX {
    interface Element {
      type: ValueOrFunction<string, (...args: any[]) => any>;
      props: {
        [prop: string]: any;
      };
      children: any[];
    }
  }
}

export interface VueElement extends JSX.Element {
  type: VDOMType;
  props: vDomProps;
  children: RenderElementType[];
}

export interface vFun {
  (props?: vDomProps, children?: RenderElementType[]): ElementType;
}

export function componentFunction(fn: vFun) {
  return fn;
}

type ElementType = VDom | VueElement;

type RenderElementType = string | number | bigint | boolean | ElementType;

type VDOMType = string | vFun;

export class VDom implements VueElement {
  type: VDOMType;
  props: vDomProps;
  children: RenderElementType[];

  constructor(
    type: VDOMType,
    props: vDomProps = {},
    children: RenderElementType[] = []
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
export function createElement(
  type: string | VDOMType = "",
  props: vDomProps = {},
  ...children: VDom[]
) {
  console.log("createElement", type, props, children);
  return new VDom(type, props, children);
}

// todo: diff
/**
 *
 * @param element
 * @param container
 */
function render(
  element: RenderElementType,
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
  // else if (typeof element == "function") {
  //   console.log("element function", element);
  //   const newElement = element();
  //   render(newElement, container);
  // }
  // VDOM instance tag component
  else if (typeof element.type === "string") {
    console.log("element", element);
    const child =
      element.type === "Fragment" || element.type == ""
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
    render(newElement as VDom, container);
  }
}

const React = {
  createElement,
  // todo: the render should be the same with above render function
  render(element: ElementType, container: HTMLElement) {
    // todo: diff
    container.innerHTML = "";
    render(element, container);
  }
};

export default React;
