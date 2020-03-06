import React from "../src/index";

import { FunctionComponent, NestComponent } from "./TestComponents";

export default function App() {
  return (
    <>
      <h1 id="myid" title="一级标题">
        Component
      </h1>
      <FunctionComponent title="标题"></FunctionComponent>
      <h1>Component-List</h1>
      <ul>
        {Array.from(Array(3)).map(e => (
          <li>
            <FunctionComponent title="标题"></FunctionComponent>
          </li>
        ))}
      </ul>

      <h1>Slot</h1>
      <NestComponent>
        <NestComponent></NestComponent>
      </NestComponent>
    </>
  );
}
