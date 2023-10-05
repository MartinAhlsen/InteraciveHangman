let hideStart = document.querySelector(".hide-start-screen");
let hideGame = document.querySelector(".hide-game");
let hideEnd = document.querySelector(".hide-end-screen");
let hideAll = document.querySelector(".hide-all");

hideStart.addEventListener("click", function () {
  document.querySelector(".start-screen").classList.toggle("hide");
  console.log("toggle Start");
});

hideGame.addEventListener("click", function () {
  document.querySelector(".game-screen").classList.toggle("hide");
  console.log("toggle Game");
});

const endScreenClickHandler = () => {
  document.querySelector(".end-screen").classList.toggle("hide");
  console.log("toggle End");
};
hideEnd.addEventListener("click", endScreenClickHandler);

hideAll.addEventListener("click", () => {
  hideGameScreens();
  console.log("Hide all");
});
