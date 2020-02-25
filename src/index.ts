type childrenElementConfig = {
  type: string;
  props: vDomProps;
  children?: childrenElementConfig[];
};

type vDomProps = {
  key: string;
  [prop: string]: string;
};

class VDom {
  type: string | Function;

  props: vDomProps;
  children: childrenElementConfig[];

  constructor(
    type: string,
    props: vDomProps,
    children: childrenElementConfig[]
  ) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

function createElement(
  type: string,
  props: vDomProps,
  children: childrenElementConfig[]
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
    return `<span>${this.vDom}</span>`;
  }

  updateComponent() {}
}

function instantiateReactComponent(
  element: VDom | string | number | bigint | boolean
) {
  if (typeof element !== "object") {
    return new ReactTextComponent(element);
  } else if (typeof element.type === "string") {
    return new ReactDomComponent(element);
  } else {
    return new ReactCompositeComponent(element);
  }
}

const React = {
  ReactComponent,
  createElement,
  render(
    element: VDom | string | number | bigint | boolean,
    container: HTMLElement
  ) {
    const componentInstance = instantiateReactComponent(element);
    var markup = componentInstance.mountComponent();
    container.innerHTML = markup;
  }
};
