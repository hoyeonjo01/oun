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

    }, 4200);

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
    { left:"10%", top:"14%" },
    { left:"50%", top:"16%" },
  
    { left:"22%", top:"36%" },
    { left:"58%", top:"42%" },
  
    { left:"12%", top:"62%" },
    { left:"48%", top:"66%" }
  ];

  // 배치 순서 섞기
  const layoutOrder = [
    imageList[0], // _1
    imageList[1], // _2
    imageList[1], // _2
    imageList[0], // _1
    imageList[1], // _2
    imageList[1]  // _2
  ];

  layoutOrder.forEach((src, index) => {

    const pos = positions[index];

    const img = document.createElement("img");

    const imageIndex = src.includes("_1") ? 0 : 1;

    img.src = src;
    img.className = `effect-icon effect-${imageIndex}`;

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