import React, { componentFunction, createElement } from "../src/index";

export default componentFunction(function Clock(props, child) {
  console.log("clock instance", this);

  Reflect.set(window, "updateClock", () => {
    console.log("update time!", Date());
    console.log(this);
    console.log(this.$el.$el);

    const temp = document.createDocumentFragment();
    React.render(createElement(this.type), temp);

    console.log(temp);

    // (this.$parent.$el.$el as HTMLElement).replaceChild();
    (this.$el.$el as HTMLElement).replaceWith(temp);
  });

  return (
    <div>
      <h3>time</h3>
      {Date()}
    </div>
  );
});
