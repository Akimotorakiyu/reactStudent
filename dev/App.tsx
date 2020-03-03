import React, { VDom } from "../src/index";

import { FunctionComponent } from "./TestComponents";

export default function(): VDom {
  return (
    <div>
      <h1>Component</h1>
      <FunctionComponent></FunctionComponent>
    </div>
  );
}
