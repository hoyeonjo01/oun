const icons = document.querySelector(".icons");
const loadingScreen = document.querySelector(".loading-screen");
const video = document.querySelector(".loading-video");

setTimeout(() => {
  icons.classList.add("hide");
}, 1600);

setTimeout(() => {
  video.classList.add("show");
  video.currentTime = 0;
  video.play();
}, 1900);

video.addEventListener("ended", () => {
  window.location.href = "main.html";
});