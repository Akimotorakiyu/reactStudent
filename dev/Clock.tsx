import React, { componentFunction, createElement } from "../src/index";

export default componentFunction(function Clock(props, child) {
  // console.log("clock instance", this);

  const update = () => {
    const temp = document.createDocumentFragment();
    React.render(createElement(this.type), temp, this.$parent);

    if (Array.isArray(this.$el.$el)) {
      this.$el.$el.forEach((ele, index) => {
        if (index === 0) {
          (this.$parent.$el.$el as HTMLElement).replaceChild(temp, ele);
        } else {
          (this.$parent.$el.$el as HTMLElement).removeChild(ele);
        }
      });
    } else {
      (this.$el.$el as HTMLElement).replaceWith(temp);
    }
  };

  setTimeout(update, 1000);

  return (
    <>
      <h3>time</h3>
      {Date()}
    </>
  );
});
