const icons = document.querySelector(".icons");
const loadingScreen = document.querySelector(".loading-screen");
const video = document.querySelector(".loading-video");

setTimeout(() => {
  icons.classList.add("hide");
}, 2600);

setTimeout(() => {
  video.classList.add("show");
  video.currentTime = 0;
  video.play();
}, 1900);

let moved = false;

function goToMain() {
  if (moved) return;
  moved = true;
  window.location.href = "main.html";
}

video.addEventListener("ended", goToMain);

// 5초 후 무조건 이동
setTimeout(goToMain, 5000);