// TODO
// 1. Tooltip ease animation with lerp()
// 2. Change color on grid lines based on fill color

priceCalculator();

function priceCalculator() {
  const wrapper = document.querySelector(".price-calculator__wrapper");
  const range = wrapper.querySelector(".price-range");

  gridLines();
  price(range.value, range.min);

  range.addEventListener("input", calculate);
  window.addEventListener("resize", gridLines);

  function calculate() {
    fillRange(this, this.min, this.max, this.value);
    tooltip(this.min, this.max, this.value);
    price(this.value, this.min);
  }

  function price(val, min) {
    const rangeValue = val - min; // Start range from 0 
    let price = 0;
    const renderPrice = () => {
      const text = document.querySelector(".price-value");
      text.textContent = "$" + price;
    };

    if (val < 33) {
      price = rangeValue * 10; // Add 10 for every 1k views in Pro Plan
    } else {
      const proPrice = 270;
      price = (rangeValue - 27) * 5 + proPrice; // Add 5 for every 1k views in Business Plan
    }

    renderPrice();
  }

  function fillRange(el, min, max, val) {
    const style = getComputedStyle(el);
    const defaultColor = style.getPropertyValue("--bg-default-range");
    const fillColor = style.getPropertyValue("--bg-fill-range");
    const move = ((val - min) / (max - min)) * 99;

    hideRangeEdges();
    el.style.background = `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${move}%, ${defaultColor} ${move}%, ${defaultColor} 100%)`;

    function hideRangeEdges() {
      if (val !== min || val !== max) {
        wrapper.style.setProperty("--display-right-edge", "inline-block");
        wrapper.style.setProperty("--display-left-edge", "inline-block");
      }
      if (val === min) wrapper.style.setProperty("--display-left-edge", "none");
      if (val === max)
        wrapper.style.setProperty("--display-right-edge", "none");
    }
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

  function gridLines() {
    const firstLine = document.querySelector(".grid-line--first");
    const middleLine = document.querySelector(".grid-line--middle");
    const lastLine = document.querySelector(".grid-line--last");
    const wrapperWidth = wrapper.getBoundingClientRect().width.toFixed(2);
    const businessPlan = document.querySelector(".price-plan--business");
    const proPlan = document.querySelector(".price-plan--pro");
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

    const getPosition = (el) => {
      const element = el.getBoundingClientRect();

      return {
        top: element.top + window.scrollY,
        left: element.left + window.scrollX,
      };
    };
    const positionProPlan =
      (getPosition(middleLine).left - getPosition(firstLine).left) / 2;
    const positionBusPlan =
      (getPosition(lastLine).left - getPosition(middleLine).left - 32) / 2;

    proPlan.style.setProperty("--left-position-pro", positionProPlan + "px");
    businessPlan.style.setProperty(
      "--right-position-business",
      positionBusPlan + "px"
    );
  }
}
