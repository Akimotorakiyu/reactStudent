import React, { VDom } from "../src/index";

import {
  FunctionComponent,
  ObjectComponent,
  ClassComponent
} from "./TestComponents";

export default function(): VDom {
  return (
    <div>
      <h1>Component</h1>
      <FunctionComponent></FunctionComponent>
      <h1>StaticObject</h1>
      {ObjectComponent}
      <h1>ClassBasic-StaticObject</h1>
      {ClassComponent}
      <h1>StaticObject-List</h1>
      <ul>{[ObjectComponent, ObjectComponent, ObjectComponent]}</ul>
      <h1>Component-List</h1>
      <ul>
        {Array.from(Array(3)).map(e => (
          <li>
            <FunctionComponent></FunctionComponent>
          </li>
        ))}
      </ul>
    </div>
  );
}
