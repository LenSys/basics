const counterEl = document.querySelector(".counter");
const counterTitleEl = document.querySelector(".counter__title");

const increaseButtonEl = document.querySelector(".counter__button--increase");
const decreaseButtonEl = document.querySelector(".counter__button--decrease");
const resetButtonEl = document.querySelector(".counter__reset-button");
const counterValueEl = document.querySelector(".counter__value");

const decrementCounter = () => {
  // get current value of counter
  const currentCounterValue = parseInt(counterValueEl.textContent);

  if (currentCounterValue > 0) {
    // set counter with new value by decrementing by 1
    counterValueEl.textContent = currentCounterValue - 1;
  }

  // unfocus (blur) decrease button
  decreaseButtonEl.blur();
};

const incrementCounter = () => {
  // get current value of counter
  const currentCounterValue = parseInt(counterValueEl.textContent);

  if (currentCounterValue >= 5) {
    // give visual indicator that limit has been reached
    counterEl.classList.add("counter--limit");

    // update counter title to say limit has been reached
    counterTitleEl.textContent = "Limit! Buy Pro for >5";

    // disable increase and decrease buttons
    increaseButtonEl.setAttribute("disabled", "disabled");
    decreaseButtonEl.setAttribute("disabled", "disabled");
  } else {
    // set counter with new value by incrementing by 1
    counterValueEl.textContent = currentCounterValue + 1;
  }

  // unfocus (blur) increase button
  increaseButtonEl.blur();
};

const resetCounter = () => {
  counterValueEl.textContent = "0";

  // remove visual indicator that limit has been reached
  counterEl.classList.remove("counter--limit");

  // update counter to default title
  counterTitleEl.textContent = "Fancy Counter";

  // enable increase and decrease buttons
  increaseButtonEl.removeAttribute("disabled");
  decreaseButtonEl.removeAttribute("disabled");

  // unfocus (blur) reset button
  resetButtonEl.blur();
};

increaseButtonEl.addEventListener("click", incrementCounter);

decreaseButtonEl.addEventListener("click", decrementCounter);

resetButtonEl.addEventListener("click", resetCounter);

// listen for keyboard events
document.addEventListener("keydown", () => {
  incrementCounter();
});
