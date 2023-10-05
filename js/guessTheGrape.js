let grapeArray = [
  "Merlot",
  "Chardonnay",
  "Syrah",
  "Zinfandel",
  "Riesling",
  "Malbec",
  "Grenache",
  "Tempranillo",
  "Viognier",
  "Sangiovese",
  "Muscat",
  "Semillon",
  "Verdejo",
  "Marsanne",
  "Zweigelt",
  "Rondinella",
  "Corvina",
  "Sagrantino",
  "Glera",
  "Gammay",
];
let correctGuesses = [];
let targetRandomWord = "";
let targetRandomWordLowerCase = null;
let targetRandomWordUniqueLettersArray = null;
let numberOfGames = -1;
let numberOfVictories = 0;
let guessesLeft = 10;

const updateCounterText = () => {
  let gameCounter = document.querySelector(".number-of-games");
  let victoryCounter = document.querySelector(".number-of-victories");
  gameCounter.textContent = "Games " + numberOfGames;
  victoryCounter.textContent = "Victories " + numberOfVictories;
};

const switchToScreen = (screenName) => {
  hideGameScreens();
  document.querySelector(screenName).classList.remove("hide");
};

function hideGameScreens() {
  let allGameScreens = document.querySelectorAll(".game-wrapper");
  allGameScreens.forEach((element) => {
    element.classList.add("hide");
  });
}

// hideEnd.addEventListener("click", function () {
//   document.querySelector(".end-screen").classList.toggle("hide");
//   console.log("toggle End");
// });

const addNewEventListener = (target, eventType, callFunction) => {
  target.addEventListener(eventType, callFunction);
};

let startNewGameButtons = document.querySelectorAll(".start-button");

startNewGameButtons.forEach((element) => {
  addNewEventListener(element, "click", () => {
    startNewGame();
  });
});

switchToScreen(".start-screen");

const makeLetterBoxes = () => {
  let parentElement = document.createElement("div");
  parentElement.classList.add("letter-container");
  for (let i = 97; i <= 122; i++) {
    // alphabetArray.push(String.fromCharCode(i)); GÅR ATT TA BORT
    let letterDiv = document.createElement("div");
    parentElement.appendChild(letterDiv);
    letterDiv.classList.add("letters");
    letterDiv.classList.add(String.fromCharCode(i));
    letterDiv.textContent = String.fromCharCode(i).toLocaleUpperCase();
  }
  return parentElement;
};
const makeGuessesImageBoxes = (numberOfGuesses) => {
  let parentElement = document.createElement("div");
  parentElement.classList.add("guesses-image-container");
  for (let i = 0; i < numberOfGuesses; i++) {
    let imageDiv = document.createElement("div");
    parentElement.appendChild(imageDiv);
    imageDiv.classList.add("guesses-image");
  }
  return parentElement;
};

const generateTargetWordLetters = () => {
  let parentElement = document.querySelector(".target-word");
  Array.from(targetRandomWord.toLowerCase()).forEach((element) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("target-word-letters");
    // console.log(element);
    newDiv.classList.add(element.toUpperCase());
    newDiv.textContent = element.toUpperCase();
    parentElement.appendChild(newDiv);
  });
  return parentElement;
};

const replaceImageBoxes = () => {
  let imageWrapper = document.querySelector(".guesses-image-wrapper");
  imageWrapper.innerHTML(makeGuessesImageBoxes(guessesLeft));
};

const hideGuessesShowVictoryScreen = () => {
  let guessesWrapper = document.querySelector(".guesses-wrapper");
  guessesWrapper.classList.add("hide");
  let endSceren = document.querySelector(".end-screen");
  endSceren.classList.remove("hide");
};

const showGuessesHideVictoryScreen = () => {
  let guessesWrapper = document.querySelector(".guesses-wrapper");
  guessesWrapper.classList.remove("hide");
  let endSceren = document.querySelector(".end-screen");
  endSceren.classList.add("hide");
};

// const presentCorrectWord = () => {
//   let word = document.querySelector(".present-correct-word");
//   // word.textContent =  <<<<<< starta här och lyft ut random word >>>>>>>>>>>>>>>>
// };

let letterWrapper = document.querySelector(".letter-wrapper");
letterWrapper.appendChild(makeLetterBoxes());

const doesItMatch = (letter) => {
  // console.log(letter);
  if (targetRandomWord.toLowerCase().includes(letter)) {
    // console.log("Match!");
    return true;
  } else {
    // console.log("Doesn't match");
    return false;
  }
};

const makeTargetLetterVisible = (letter) => {
  let letterVariable = letter;
  let letterAsString = letterVariable.toString();
  let targetElement = document.querySelectorAll(
    ".target-word-letters" + "." + letterAsString.toUpperCase()
  );
  targetElement.forEach((element) => {
    element.classList.add("show-text");
  });
};

const updateGuessesImages = () => {
  imageContainer = document.querySelector(".guesses-image-container");
  imageContainer ? imageContainer.remove() : console.log("No element");
  let guessesImageContainer = document.querySelector(".guesses-image-wrapper");
  guessesImageContainer.appendChild(makeGuessesImageBoxes(guessesLeft));
};

const didIWin = () => {
  if (correctGuesses.length === targetRandomWordUniqueLettersArray.length) {
    return true;
  } else {
    return false;
  }
};

const endOfGame = (result) => {
  let showTargetWordLetters = document.querySelectorAll(".target-word-letters");
  showTargetWordLetters.forEach((element) => {
    if (!element.classList.contains("show-text")) {
      element.classList.add("red");
    }
    element.classList.add("show-text");
  });
  let gameEndMessageContainer = document.querySelector(".outcome-message");
  if (result) {
    gameEndMessageContainer.textContent = "You win!";
    numberOfVictories += 1;
    updateCounterText();
  } else {
    gameEndMessageContainer.textContent = "You loose!";
  }
  hideGuessesShowVictoryScreen();
};

const startNewGame = () => {
  const generateNewGrape = () => {
    targetRandomWord =
      grapeArray[Math.floor(Math.random() * grapeArray.length)];
  };
  const emptyTargetWord = () => {
    let targetLettersClassselector = document.querySelectorAll(
      ".target-word-letters"
    );
    targetLettersClassselector.forEach((element) => {
      element.remove();
    });
  };
  const resetLetters = () => {
    let lettersClassselector = document.querySelectorAll(".letters");
    lettersClassselector.forEach((element) => {
      element.classList.remove("true", "false");
    });
  };
  correctGuesses = [];
  numberOfGames += 1;
  guessesLeft = 10;

  updateCounterText();
  updateGuessesImages();
  generateNewGrape();
  targetRandomWordLowerCase = targetRandomWord.toLowerCase();
  targetRandomWordUniqueLettersArray = Array.from(
    new Set(targetRandomWordLowerCase)
  );
  emptyTargetWord();
  generateTargetWordLetters();
  resetLetters();
  showGuessesHideVictoryScreen();
  switchToScreen(".game-screen");
};

const gameLoop = (letter, targetElement) => {
  if (doesItMatch(letter)) {
    targetElement.classList.add("true");
    makeTargetLetterVisible(letter);
    if (!correctGuesses.includes(letter)) {
      correctGuesses.push(letter);
    }
    if (didIWin()) {
      endOfGame(didIWin());
    }
  } else {
    targetElement.classList.add("false");
    guessesLeft -= 1;
    updateGuessesImages();
    if (!guessesLeft > 0) {
      endOfGame(didIWin());
    }
  }
  console.log(targetRandomWord);
  console.log(targetRandomWordUniqueLettersArray.length);
  console.log(targetRandomWordUniqueLettersArray);
  console.log(correctGuesses.length);
  console.log(correctGuesses);
};

const lettersClickable = () => {
  for (let i = 97; i <= 122; i++) {
    let letter = String.fromCharCode(i);
    let targetElement = document.querySelector("." + letter);
    addNewEventListener(targetElement, "click", () => {
      gameLoop(letter, targetElement);
    });
  }
};

lettersClickable();

// const testFunction = () => {
//   let word = "bananaAAAABB";
//   let array1 = Array.from(word.toLowerCase());
//   let newArray = [];

//   array1.forEach((char) => {
//     console.log("newArray: " + newArray);
//     if (newArray.includes(char)) {
//       console.log("includes" + char);
//     } else {
//       newArray.push(char);
//       console.log("does nor include " + char);
//     }
//   });
//   console.log("newArray " + newArray);
// };
// const testFunction = () => {
//   // let testArray = ["a", "a", "a", "a", "a", "a", "a", "aa", "a", "a"];
//   targetRandomWordArray = [Array.from(targetRandomWord.toLowerCase())];
//   console.log("targetRandomWordArray " + targetRandomWordArray);
//   let uniqueArray = [];
//   console.log("uniqueArray before loop" + uniqueArray);
//   for (let i = 0; i < targetRandomWordArray.length; i++) {
//     console.log(i);
//     if (!uniqueArray.includes(targetRandomWordArray[i])) {
//       console.log("letter " + targetRandomWordArray[i]);
//       uniqueArray.push(targetRandomWordArray[i]);
//     }
//   }
//   console.log("targetRandomWordArray " + targetRandomWordArray);
//   console.log("uniqueArray after loop" + uniqueArray);

//   // console.log(testArray);
// };

// const testFunction = () => {
//   // let testArray = ["a", "a", "a", "a", "a", "a", "a", "aa", "a", "a"];
//   targetRandomWordArray = [Array.from(targetRandomWord.toLowerCase())];
//   console.log("targetRandomWordArray " + targetRandomWordArray);
//   let uniqueArray = [];
//   console.log("uniqueArray before loop" + uniqueArray);
//   for (let i = 0; i > targetRandomWordArray.length; i++) {
//     console.log(i);
//     if (uniqueArray.includes(targetRandomWordArray[i])) {
//       console.log("letter " + targetRandomWordArray[i]);
//       uniqueArray.push(targetRandomWordArray[i]);
//     }
//   }
//   console.log("targetRandomWordArray " + targetRandomWordArray);
//   console.log("uniqueArray after loop" + uniqueArray);
//   // console.log(testArray);
// };

// testFunction();
