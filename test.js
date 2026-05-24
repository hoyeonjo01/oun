const birthForm = document.getElementById("birthForm");
const testMain = document.getElementById("testMain");
const showResultBtn = document.getElementById("showResultBtn");
const formError = document.getElementById("formError");
const userNameInput = document.getElementById("userName");
const birthDateInput = document.getElementById("birthDate");
const birthTimeInput = document.getElementById("birthTime");
const birthTimeUnknown = document.getElementById("birthTimeUnknown");

const MIN_YEAR = 1950;
const MAX_YEAR = 2026;
const resultGuide = document.getElementById("resultGuide");
const pillarsText = document.getElementById("pillarsText");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const recommendText = document.getElementById("recommendText");
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

function showFormError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function clearFormError() {
  formError.textContent = "";
  formError.hidden = true;
}

function setBirthDateInvalid(invalid) {
  birthDateInput.classList.toggle("input-invalid", invalid);
}

function clearFieldErrors() {
  setBirthDateInvalid(false);
}

function parseBirthInputs() {
  const name = userNameInput.value.trim();
  const dateValue = birthDateInput.value;
  const timeUnknown = birthTimeUnknown.checked;
  const timeValue = timeUnknown ? "00:00" : birthTimeInput.value;

  clearFieldErrors();

  if (!name) {
    showFormError("이름을 입력해 주세요.");
    return null;
  }

  if (!dateValue) {
    showFormError("생년월일을 입력해 주세요.");
    return null;
  }

  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) {
    showFormError("생년월일 형식을 확인해 주세요.");
    return null;
  }

  if (year < MIN_YEAR || year > MAX_YEAR) {
    setBirthDateInvalid(true);
    showFormError("생년월일을 정확하게 입력해 주세요. (1900~2026년)");
    return null;
  }

  if (!timeUnknown && !birthTimeInput.value) {
    showFormError("태어난 시각을 입력하거나 '태어난 시각 모름'을 선택해 주세요.");
    return null;
  }

  const [hour, minute] = timeValue.split(":").map(Number);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    showFormError("태어난 시각 형식을 확인해 주세요.");
    return null;
  }

  clearFormError();
  return { name, year, month, day, hour, minute, timeUnknown };
}

birthTimeUnknown.addEventListener("change", () => {
  if (birthTimeUnknown.checked) {
    birthTimeInput.value = "00:00";
    birthTimeInput.disabled = true;
  } else {
    birthTimeInput.disabled = false;
    birthTimeInput.value = "";
  }
});

birthDateInput.addEventListener("input", () => {
  setBirthDateInvalid(false);
  clearFormError();
});

function renderElementResult(balance, name) {
  const { percentages, weakest, pillars } = balance;
  const primaryWeak = weakest[0];
  const data = elementData[primaryWeak];
  const rows = document.querySelectorAll(".graph-row");
  

  selectedLink = data.link;
  resultGuide.textContent = `${name}님의 만세력(사주) 기준 오행 비중이에요.`;
  pillarsText.textContent = `년주 ${pillars.year} · 월주 ${pillars.month} · 일주 ${pillars.day} · 시주 ${pillars.time}`;

  if (weakest.length === 1) {
    if (resultTitle) {
      resultTitle.textContent = "";
    }
  
    recommendText.textContent = data.text;
  
  } else {
  
    if (resultTitle) {
      resultTitle.textContent = "";
    }
  
    const names = weakest.map((key) => elementData[key].name).join(", ");
  
    recommendText.textContent =
      `${names} OUN이 상대적으로 부족해요. 부족한 오행의 에너지를 채워보세요.`;
  }

  rows.forEach((row) => {
    const element = row.dataset.element;
    const bar = row.querySelector(".fill");
    const pct = percentages[element] ?? 0;
    const isWeak = weakest.includes(element);

    row.classList.remove("active", "wood", "fire", "soil", "metal", "water");
    row.classList.add(element);
    row.classList.toggle("active", isWeak);

    bar.style.width = `${pct}%`;

    const pctLabel = row.querySelector(".pct");
    if (pctLabel) {
      pctLabel.textContent = `${pct}%`;
    }
  });
  const visualMap = {
    wood: "wood_result.svg",
    fire: "fire_result.svg",
    soil: "earth_result.svg",
    metal: "metal_result.svg",
    water: "water_result.svg"
  };
  
  const missingVisuals = document.getElementById("missingVisuals");
  if (missingVisuals) {
    missingVisuals.innerHTML = "";
  
    weakest.forEach((key) => {
      const img = document.createElement("img");
      img.src = visualMap[key];
      img.alt = elementData[key].name;
      missingVisuals.appendChild(img);
    });
  }
}


showResultBtn.addEventListener("click", () => {
  const birth = parseBirthInputs();
  if (!birth) return;

  if (typeof calculateElementBalance !== "function") {
    showFormError("만세력 계산 모듈을 불러오지 못했어요. 새로고침 후 다시 시도해 주세요.");
    return;
  }

  const balance = calculateElementBalance(
    birth.year,
    birth.month,
    birth.day,
    birth.hour,
    birth.minute
  );
  

  birthForm.classList.add("hide");
  testMain.classList.add("show");
  result.classList.add("show");

  renderElementResult(balance, birth.name);
}); 