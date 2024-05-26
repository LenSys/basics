const textareaEl = document.querySelector(".textarea");
const numberCharactersEl = document.querySelector(".stat__number--characters");
const numberWordsEl = document.querySelector(".stat__number--words");
const numberTwitterCharactersEl = document.querySelector(
  ".stat__number--twitter"
);
const numberFacebookCharactersEl = document.querySelector(
  ".stat__number--facebook"
);

const inputHandler = () => {
  // input validation
  if (textareaEl.value.includes("<script>")) {
    textareaEl.value = textareaEl.value.replace("<script>", "");
  }

  const inputText = textareaEl.value;

  // determine new numbers
  const numberOfCharacters = inputText.length;
  let wordLength = inputText.split(" ").length;

  if (numberOfCharacters === 0) {
    // reset word length to zero if text length is zero
    wordLength = 0;
  }

  const remainingTwitterCharacterLength = 280 - numberOfCharacters;
  const remainingFacebookCharacterLength = 2200 - numberOfCharacters;

  // add visual indicator for twitter if limit is exceeded
  if (remainingTwitterCharacterLength < 0) {
    numberTwitterCharactersEl.classList.add("stat__number--limit");
  } else {
    numberTwitterCharactersEl.classList.remove("stat__number--limit");
  }

  // add visual indicator for twitter if limit is exceeded
  if (remainingFacebookCharacterLength < 0) {
    numberFacebookCharactersEl.classList.add("stat__number--limit");
  } else {
    numberFacebookCharactersEl.classList.remove("stat__number--limit");
  }

  // set new numbers
  numberCharactersEl.textContent = numberOfCharacters;
  numberWordsEl.textContent = wordLength;
  numberTwitterCharactersEl.textContent = remainingTwitterCharacterLength;
  numberFacebookCharactersEl.textContent = remainingFacebookCharacterLength;
};

textareaEl.addEventListener("input", inputHandler);
