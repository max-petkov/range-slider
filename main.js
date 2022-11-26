// TODO
// 1. Tooltip ease animation with lerp()
priceCalculator();

function priceCalculator() {
  const wrapper = document.querySelector(".price-calculator__wrapper");
  const range = wrapper.querySelector(".price-range");

  range.addEventListener("input", calculate);

  function calculate() {
    fillRange(this, this.min, this.max, this.value);
    tooltip(this.min, this.max, this.value);
  }

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

      return left.toFixed(2) - tooltipWidth / 2;
    }
  }
}
