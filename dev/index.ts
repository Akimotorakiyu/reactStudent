import React from "../src/index";
import { reder } from "./tsx";

console.log("hello world!");
console.log(React.render);
console.log(reder.toString());

React.render("hello world", document.querySelector("#root"));
