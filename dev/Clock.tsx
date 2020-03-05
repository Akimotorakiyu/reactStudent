import React, { componentFunction, createElement } from "../src/index";

export default componentFunction(function Clock(props, child) {
  console.log("clock instance", this);

  Reflect.set(window, "updateClock", () => {
    console.log("update time!", Date());
    console.log("this", this);
    console.log("old dom", this.$el.$el);
    console.log("old this.$parent", this.$parent.$el.$el.childNodes.length);

    const temp = document.createDocumentFragment();
    React.render(createElement(this.type), temp, this.$parent);

    console.log(temp);

    console.log(
      "after render this.$parent",
      this.$parent.$el.$el.childNodes.length
    );

    if (this.$el.$el instanceof DocumentFragment) {
      Array.from((this.$el.$el as HTMLElement).childNodes).forEach(
        (ele, index) => {
          console.log("working... ...");

          if (index === 0) {
            (this.$parent.$el.$el as HTMLElement).replaceChild(temp, ele);
          } else {
            (this.$parent.$el.$el as HTMLElement).removeChild(ele);
          }
        }
      );
    } else {
      (this.$el.$el as HTMLElement).replaceWith(temp);
    }

    console.log("updated this.$parent", this.$parent.$el.$el.childNodes.length);
  });

  return (
    <div>
      <h3>time</h3>
      {Date()}
    </div>
  );
});
