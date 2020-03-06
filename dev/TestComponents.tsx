import React, { Fragment } from "../src/index";
import Clock from "./Clock";

export function FunctionComponent(props) {
  const vdom = (
    <div>
      <h2 title={props?.title}>reactStudent</h2>
      <p>hello world!</p>
      <Clock></Clock>
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
