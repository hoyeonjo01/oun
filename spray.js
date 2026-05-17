const sprayItems = document.querySelectorAll(".spray-item");

sprayItems.forEach((item) => {
  item.addEventListener("click", () => {
    const link = item.dataset.link;

    // hover 상태 강제로 초기화
    item.classList.add("reset");

    // 살짝 딜레이 후 이동
    setTimeout(() => {
      window.location.href = link;
    }, 200);
  });
});