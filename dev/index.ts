import React, { createElement } from "../src/index";
import App from "./App";

React.render(
  createElement(App),
  document.querySelector("#root") as HTMLElement
);
