import React, { VDom, Fragment } from "../src/index";

export const ObjectComponent: VDom = (
  <div>
    <h1>reactStudent</h1>
    <p>hello world!</p>
    {Date()}
  </div>
);

export const ClassComponent = new VDom("div", { key: "" }, [
  new VDom("h1", { key: "" }, ["reactStudent"]),
  new VDom("p", { key: "" }, ["hello world!"]),
  Date()
]);

export function FunctionComponent(props) {
  const vdom = (
    <div>
      <h2 title={props?.title}>reactStudent</h2>
      <p>hello world!</p>
      {Date()}
    </div>
  );

  return vdom;
}

export function NestComponent(props, slots) {
  const vdom = (
    <Fragment>
      Nesting...
      {slots}
    </Fragment>
  );
  return vdom;
}
