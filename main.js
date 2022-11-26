// TODO
// 1. Tooltip ease animation with lerp()
// 2. Change color on grid lines based on fill color

priceCalculator();

function priceCalculator() {
  const wrapper = document.querySelector(".price-calculator__wrapper");
  const range = wrapper.querySelector(".price-range");

  gridLines();
  range.addEventListener("input", calculate);
  window.addEventListener("resize", gridLines);

  function calculate() {
    fillRange(this, this.min, this.max, this.value);
    tooltip(this.min, this.max, this.value);
    hideEdges(this.min, this.max, this.value);
    price();
  }

  function price() {}

  function fillRange(el, min, max, val) {
    const style = getComputedStyle(el);
    const defaultColor = style.getPropertyValue("--bg-default-range");
    const fillColor = style.getPropertyValue("--bg-fill-range");
    const move = ((val - min) / (max - min)) * 99;

    el.style.background = `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${move}%, ${defaultColor} ${move}%, ${defaultColor} 100%)`;
  }

  function tooltip(min, max, val) {
    const tooltip = wrapper.querySelector(".price-tooltip");
    const tooltipText = tooltip.querySelector(".price-tooltip__text");

    tooltipText.textContent = val + ",000 visitors/month";
    tooltip.style.setProperty("--left-position-tooltip", left() + "px");

    function left() {
      const wrapperWidth = wrapper.getBoundingClientRect().width.toFixed(2);
      const tooltipWidth = tooltip.getBoundingClientRect().width.toFixed(2);
      const thumbSize = 24;

      // Normalize Thumb Position between actual First and Last Thumb Position
      let left =
        ((val - min) / (max - min)) *
          (wrapperWidth - thumbSize / 2 - thumbSize / 2) +
        thumbSize / 2;

      if (val > max / 2) left -= 2;
      else left += 2;

      console.log(left);

      return left.toFixed(2) - tooltipWidth / 2;
    }
  }

  function gridLines() {
    const firstLine = document.querySelector(".grid-line--first");
    const middleLine = document.querySelector(".grid-line--middle");
    const lastLine = document.querySelector(".grid-line--last");
    const wrapperWidth = wrapper.getBoundingClientRect().width.toFixed(2);
    const thumbPosition = (value) => {
      const thumbSize = 24;
      return (
        ((value - range.min) / (range.max - range.min)) *
          (wrapperWidth - thumbSize / 2 - thumbSize / 2) +
        thumbSize / 2
      );
    };

    firstLine.style.setProperty(
      "--position-line-first",
      thumbPosition(range.min) + "px"
    );
    middleLine.style.setProperty(
      "--position-line-middle",
      thumbPosition(33) + "px"
    );
    lastLine.style.setProperty(
      "--position-line-last",
      thumbPosition(range.max) + "px"
    );
  }

  function hideEdges(min, max, val) {
    if (val !== min || val !== max) {
      wrapper.style.setProperty("--display-right-edge", "inline-block");
      wrapper.style.setProperty("--display-left-edge", "inline-block");
    }
    if (val === min) wrapper.style.setProperty("--display-left-edge", "none");
    if (val === max) wrapper.style.setProperty("--display-right-edge", "none");
  }
}
