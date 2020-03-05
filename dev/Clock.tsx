import React, { componentFunction } from "../src/index";

export default componentFunction(function(props, child) {
  console.log(this);

  const a = <h1>jjj</h1>;

  return <>time: {Date()}</>;
});
