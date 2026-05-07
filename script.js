const icons = document.querySelector(".icons");
const korean = document.querySelector(".korean");
const english = document.querySelector(".english");
const loadingScreen = document.querySelector(".loading-screen");

setTimeout(() => {
  icons.classList.add("hide");
}, 1600);

setTimeout(() => {
  korean.classList.add("show");
}, 2100);

setTimeout(() => {
  korean.classList.add("hide");
}, 3300);

setTimeout(() => {
  english.classList.add("show");
}, 3700);

setTimeout(() => {
  loadingScreen.classList.add("fade-out");
}, 5200);

setTimeout(() => {
  window.location.href = "main.html";
}, 6200);