document.addEventListener("DOMContentLoaded", function () {
  let hideStart = document.querySelector(".hide-start-screen");
  let hideGame = document.querySelector(".hide-game");
  let hideEnd = document.querySelector(".hide-end-screen");

  hideStart.addEventListener("click", function () {
    document.querySelector("start-screen").classList.toggle("hide");
    console.log("toggle Start");
  });

  hideGame.addEventListener("click", function () {
    document.querySelector("game").classList.toggle("hide");
    console.log("toggle Game");
  });

  hideEnd.addEventListener("click", function () {
    document.querySelector("end-screen").classList.toggle("hide");
    console.log("toggle End");
  });
});