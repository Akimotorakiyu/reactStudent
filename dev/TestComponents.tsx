import React, { VDom } from "../src/index";

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

export function FunctionComponent() {
  const vdom = (
    <div>
      <h2>reactStudent</h2>
      <p>hello world!</p>
      {Date()}
    </div>
  );

  return vdom;
}
