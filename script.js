(() => {
  // 6월 30일 24:00은 7월 1일 00:00 KST입니다.
  const target = new Date("2026-07-01T00:00:00+09:00").getTime();

  const setDigit = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    const next = String(value).padStart(2, "0");
    if (el.textContent !== next) {
      el.textContent = next;
      el.classList.remove("digit-roll");
      void el.offsetWidth; // CSS 애니메이션을 매초 다시 시작합니다.
      el.classList.add("digit-roll");
    }
  };

  const updateClock = () => {
    const wrap = document.querySelector(".countdown");
    const remaining = target - Date.now();

    if (remaining <= 0) {
      wrap.innerHTML = '<div style="padding:30px;width:100%;text-align:center;font-size:20px;font-weight:800;">답장 마감 시간이 지났습니다.</div>';
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    setDigit("days", Math.floor(totalSeconds / 86400));
    setDigit("hours", Math.floor((totalSeconds % 86400) / 3600));
    setDigit("minutes", Math.floor((totalSeconds % 3600) / 60));
    setDigit("seconds", totalSeconds % 60);
  };

  updateClock();
  window.setInterval(updateClock, 1000);
})();
