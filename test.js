const buttons = document.querySelectorAll(".element-select button");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const recommendText = document.getElementById("recommendText");
const goProduct = document.getElementById("goProduct");
const rows = document.querySelectorAll(".graph-row");

const elementData = {
  wood: {
    name: "Wood",
    link: "spray_wood.html",
    text: "목 OUN이 부족한 상태예요. 일상 속에서 생장과 회복의 에너지를 채워보세요."
  },
  fire: {
    name: "Fire",
    link: "spray_fire.html",
    text: "화 OUN이 부족한 상태예요. 따뜻한 활력과 감각의 에너지를 채워보세요."
  },
  soil: {
    name: "Earth",
    link: "spray_soil.html",
    text: "토 OUN이 부족한 상태예요. 안정감과 중심의 에너지를 채워보세요."
  },
  metal: {
    name: "Metal",
    link: "spray_metal.html",
    text: "금 OUN이 부족한 상태예요. 정리와 균형의 에너지를 채워보세요."
  },
  water: {
    name: "Water",
    link: "spray_water.html",
    text: "수 OUN이 부족한 상태예요. 흐름과 휴식의 에너지를 채워보세요."
  }
};

let selectedLink = "spray.html";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.element;
    const data = elementData[selected];

    buttons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");

    result.classList.add("show");

    resultTitle.innerText = `Your missing OUN is ${data.name}`;
    recommendText.innerText = data.text;
    selectedLink = data.link;

    rows.forEach((row) => {
      const rowElement = row.dataset.element;

      row.classList.remove("active", "wood", "fire", "soil", "metal", "water");
      row.classList.add(rowElement);

      if(rowElement === selected){
        row.classList.add("active");
      }
    });
  });
});

goProduct.addEventListener("click", () => {
  window.location.href = selectedLink;
});