import React, { componentFunction } from "../src/index";

export default componentFunction(function Clock(props, child) {
  console.log("clock instance", this);

  return (
    <>
      <h3>time</h3>
      {Date()}
    </>
  );
});
