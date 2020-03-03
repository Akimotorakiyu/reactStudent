import React, { VDom } from "../src/index";

const title: VDom = (
  <div>
    <h1>reactStudent </h1>
    <p>hello world!</p>
  </div>
);
export default title;

function redner() {
  const vdom = (
    <div>
      <h2>reactStudent </h2>
      <p>hello world!</p>
    </div>
  );

  return vdom;
}
