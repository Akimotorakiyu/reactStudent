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
  $el?: VDom | HTMLElement | DocumentFragment | ChildNode[];
  $parent?: VDom | HTMLElement | DocumentFragment;
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
  $el?: VDom | HTMLElement | DocumentFragment | ChildNode[];
  $parent?: VDom | HTMLElement | DocumentFragment;
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
  // console.log("createElement", type, props, children);
  return new VDom(type, props, children);
}

// todo: diff
/**
 *
 * @param element
 * @param container
 */
function render(
  element: RenderElementType | RenderElementType[],
  container: HTMLElement | DocumentFragment,
  parent: VDom
): void {
  // value
  if (typeof element !== "object" && typeof element !== "function") {
    const $elDomTextElement = document.createTextNode(element.toString());
    container.appendChild($elDomTextElement);
  }
  // node list
  else if (Array.isArray(element)) {
    const fragment = document.createDocumentFragment();
    element.forEach(ele => {
      render(ele, fragment, parent);
    });

    container.appendChild(fragment);
  } else if (typeof element.type === "string") {
    const isFragment = element.type === "Fragment" || element.type == "";

    const $elDomElement = isFragment
      ? document.createDocumentFragment()
      : document.createElement(element.type);

    Object.assign($elDomElement, element.props);

    element.children.forEach(ele => {
      render(ele, $elDomElement, parent);
    });

    if (isFragment) {
      const childNodes = Array.from($elDomElement.childNodes);

      element.$el = childNodes;
      container.appendChild($elDomElement);
    } else {
      element.$el = $elDomElement;
      container.appendChild($elDomElement);
    }
  }
  // VDOM instance function component
  else if (typeof element.type === "function") {
    const $elVdomElement = element.type(element.props, element.children);
    element.$el = $elVdomElement;
    element.$parent = parent;
    render($elVdomElement, container, element);
  }
}

const React = {
  createElement,
  // todo: the render should be the same with above render function
  render(
    element: ElementType,
    container: HTMLElement | DocumentFragment,
    parent: VDom = null
  ) {
    // todo: diff

    // Array.from(container.childNodes).forEach(ele => {
    //   container.removeChild(ele);
    // });

    render(element, container, parent);
  }
};

export default React;
