import React, { componentFunction } from "../src/index";

export default componentFunction(function Clock(props, child) {
  console.log("clock instance", this);

  // setInterval(() => {
  //   console.log("update time!", Date());
  // }, 1000);

  return (
    <>
      <h3>time</h3>
      {Date()}
    </>
  );
});
