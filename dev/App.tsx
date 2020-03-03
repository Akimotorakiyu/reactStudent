import React, { VDom, Fragment } from "../src/index";

import {
  FunctionComponent,
  ObjectComponent,
  ClassComponent,
  NestComponent
} from "./TestComponents";

export default function(): VDom {
  return (
    <Fragment>
      <h1>Component</h1>
      <FunctionComponent title="标题"></FunctionComponent>
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

      <h1>nest</h1>
      <NestComponent>
        <NestComponent></NestComponent>
      </NestComponent>
    </Fragment>
  );
}
