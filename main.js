const luckButton = document.querySelector(".luck-button-wrap");
const talismanCard = document.querySelector(".talisman-card");
const sprayBox = document.querySelector(".spray-box");
const elementEffects = document.querySelector(".element-effects");
const roomColor = document.querySelector(".room-color");
const effectImages = [
  ["effect_wood_1.svg", "effect_wood_2.svg"],
  ["effect_fire_1.svg", "effect_fire_2.svg"],
  ["effect_soil_1.svg", "effect_soil_2.svg"],
  ["effect_metal_1.svg", "effect_metal_2.svg"],
  ["effect_water_1.svg", "effect_water_2.svg"]
];

let colorIndex = 0;
let sprayAnimating = false;
let clickTimer = null;

// 테스트 버튼 클릭
luckButton.addEventListener("click", () => {
  window.location.href = "test_loading.html";
});

// 부적 클릭
talismanCard.addEventListener("click", () => {
  window.location.href = "talisman.html";
});

// 룸스프레이 한 번 클릭: 회전 + 오행 그래픽
sprayBox.addEventListener("click", () => {
  clearTimeout(clickTimer);

  clickTimer = setTimeout(() => {
    if (sprayAnimating) return;

    sprayAnimating = true;

    const currentIndex = colorIndex;

    sprayBox.classList.add("rotate");

    setTimeout(() => {

      // 방 색상
      const colors = [
        "#7bc9c8",
        "#ee8db4",
        "#f8e748",
        "#dce3e9",
        "#6ca1ee"
      ];

      roomColor.classList.remove("spray");
      roomColor.style.background = `radial-gradient(circle at 100% 0%, ${colors[currentIndex]} 0%, ${colors[currentIndex]} 30%, transparent 75%)`;
      void roomColor.offsetWidth;
      roomColor.classList.add("spray");

      // 오행 그래픽
      showElementEffects(effectImages[currentIndex]);

    }, 600);

    colorIndex = (colorIndex + 1) % effectImages.length;

    setTimeout(() => {
      sprayBox.classList.remove("rotate");

      roomColor.classList.remove("spray");
      roomColor.style.background = "transparent";

      elementEffects.innerHTML = "";
      sprayAnimating = false;

    }, 2200);

  }, 220);
});

// 룸스프레이 더블클릭: 상세페이지 이동
sprayBox.addEventListener("dblclick", () => {
  clearTimeout(clickTimer);
  window.location.href = "spray.html";
});

// 방 위에 오행 그래픽 띄우기
function showElementEffects(imageList){
  elementEffects.innerHTML = "";

  const positions = [
    { left:"18%", top:"18%" },
    { left:"48%", top:"32%" },
    { left:"75%", top:"20%" },
    { left:"28%", top:"55%" },
    { left:"68%", top:"62%" },
    { left:"15%", top:"75%" }
  ];

  positions.forEach((pos, index) => {
    const img = document.createElement("img");

    img.src = imageList[index % imageList.length];
    img.className = "effect-icon";

    img.style.left = pos.left;
    img.style.top = pos.top;
    img.style.animationDelay = `${index * 0.12}s`;

    elementEffects.appendChild(img);
  });
}

// 포스텔러 갔다온 상태 표시
if(sessionStorage.getItem("visitedTest")){
  const popup = document.getElementById("returnPopup");

  setTimeout(() => {
    popup.classList.add("show");
  }, 500);

  sessionStorage.removeItem("visitedTest");
}

// 팝업 버튼
document.getElementById("goSpray").addEventListener("click", () => {
  window.location.href = "spray.html";
});

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("returnPopup").classList.remove("show");
});