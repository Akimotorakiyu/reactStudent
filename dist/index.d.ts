declare type vDomProps = {
  key: string;
  [prop: string]: string;
};
declare class VDom {
  type: string | Function;
  props: vDomProps;
  children: VDom[];
  constructor(type: string | Function, props: vDomProps, children: VDom[]);
}
declare function createElement(
  type: string | Function,
  props: vDomProps,
  ...children: VDom[]
): VDom;
declare class ReactComponent {
  mountComponent(): string;
  updateComponent(): void;
}
declare const React: {
  ReactComponent: typeof ReactComponent;
  createElement: typeof createElement;
  render(
    element: string | number | bigint | boolean | VDom,
    container: HTMLElement
  ): void;
};
export default React;
