/**
 * 만세력(사주) 기준 오행 비중 계산
 * - 천간 4개 + 지장간(藏干) 가중치 합산
 */
(function (global) {
  const ELEMENT_KEYS = ["wood", "fire", "soil", "metal", "water"];
  const WX_TO_KEY = { 木: "wood", 火: "fire", 土: "soil", 金: "metal", 水: "water" };
  const HIDE_WEIGHTS = [0.6, 0.3, 0.1];

  function emptyCounts() {
    return { wood: 0, fire: 0, soil: 0, metal: 0, water: 0 };
  }

  function elementOfGan(gan) {
    const wx = global.LunarUtil.WU_XING_GAN[gan];
    return wx ? WX_TO_KEY[wx] : null;
  }

  function addGanScore(counts, gan, weight) {
    const key = elementOfGan(gan);
    if (key) counts[key] += weight;
  }

  function addHideGanScore(counts, hideGans) {
    if (!hideGans || !hideGans.length) return;

    hideGans.forEach((gan, index) => {
      let weight;
      if (hideGans.length === 1) {
        weight = 1;
      } else if (hideGans.length === 2) {
        weight = index === 0 ? 0.7 : 0.3;
      } else {
        weight = HIDE_WEIGHTS[index] ?? 0.1;
      }
      addGanScore(counts, gan, weight);
    });
  }

  function toPercentages(counts) {
    const total = ELEMENT_KEYS.reduce((sum, key) => sum + counts[key], 0);
    if (!total) {
      return ELEMENT_KEYS.reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {});
    }

    const raw = ELEMENT_KEYS.map((key) => ({
      key,
      value: (counts[key] / total) * 100
    }));

    const rounded = raw.map(({ key, value }) => ({
      key,
      pct: Math.round(value)
    }));

    let diff = 100 - rounded.reduce((sum, item) => sum + item.pct, 0);
    if (diff !== 0) {
      const adjustIndex = raw.reduce((maxIdx, item, idx, arr) =>
        item.value > arr[maxIdx].value ? idx : maxIdx
      , 0);
      rounded[adjustIndex].pct += diff;
    }

    return rounded.reduce((acc, { key, pct }) => {
      acc[key] = pct;
      return acc;
    }, {});
  }

  function findMinimumElements(counts) {
    const minValue = Math.min(...ELEMENT_KEYS.map((key) => counts[key]));
    return ELEMENT_KEYS.filter((key) => counts[key] === minValue);
  }

  function calculateElementBalance(year, month, day, hour, minute) {
    const solar = global.Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const eightChar = solar.getLunar().getEightChar();
    const counts = emptyCounts();

    addGanScore(counts, eightChar.getYearGan(), 1);
    addGanScore(counts, eightChar.getMonthGan(), 1);
    addGanScore(counts, eightChar.getDayGan(), 1);
    addGanScore(counts, eightChar.getTimeGan(), 1);

    addHideGanScore(counts, eightChar.getYearHideGan());
    addHideGanScore(counts, eightChar.getMonthHideGan());
    addHideGanScore(counts, eightChar.getDayHideGan());
    addHideGanScore(counts, eightChar.getTimeHideGan());

    const percentages = toPercentages(counts);
    const weakest = findMinimumElements(counts);

    return {
      counts,
      percentages,
      weakest,
      pillars: {
        year: eightChar.getYear(),
        month: eightChar.getMonth(),
        day: eightChar.getDay(),
        time: eightChar.getTime()
      }
    };
  }

  global.calculateElementBalance = calculateElementBalance;
})(typeof window !== "undefined" ? window : globalThis);
