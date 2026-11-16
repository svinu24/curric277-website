/* ==========================================================================
   Slide-specific interactions: loot vote, threat meter, chat replay, timers.
   ========================================================================== */

/* ---------- Loot vote tally ---------- */

(() => {
  const cards = Array.from(document.querySelectorAll(".loot"));
  if (!cards.length) return;
  const slide = cards[0].closest(".slide");

  function markLeader() {
    const counts = cards.map((c) => Number(c.querySelector(".votes").textContent));
    const max = Math.max(...counts);
    cards.forEach((c, i) => c.classList.toggle("leader", max > 0 && counts[i] === max));
  }

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const votes = card.querySelector(".votes");
      const n = Math.max(0, Number(votes.textContent) + (e.shiftKey ? -1 : 1));
      votes.textContent = n;
      card.classList.remove("bump");
      void card.offsetWidth; // restart the animation
      card.classList.add("bump");
      markLeader();
    });
  });

  const reveal = slide.querySelector(".reveal");
  reveal.addEventListener("step:show", () => slide.classList.add("revealed"));
  reveal.addEventListener("step:hide", () => slide.classList.remove("revealed"));
})();

/* ---------- Victory chat replay ---------- */

(() => {
  const chat = document.querySelector(".chat");
  if (!chat) return;
  const slide = chat.closest(".slide");
  const lines = Array.from(chat.children);
  let timers = [];

  function stop() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function play() {
    stop();
    lines.forEach((li) => li.classList.add("pending"));
    let t = 400;
    lines.forEach((li, i) => {
      // Slow down for the tense finish, speed up for the celebration.
      t += i < 4 ? 650 : i < 15 ? 520 : 330;
      timers.push(setTimeout(() => {
        li.classList.remove("pending");
        li.classList.add("pop");
      }, t));
    });
  }

  slide.addEventListener("slide:enter", play);
  slide.addEventListener("slide:leave", stop);
  slide.querySelector(".replay").addEventListener("click", play);
  if (slide.classList.contains("active")) play(); // page opened directly on this slide
})();

/* ---------- Think / Pair / Share timers ---------- */

(() => {
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  document.querySelectorAll("[data-timer]").forEach((timer) => {
    const phaseEl = timer.querySelector(".timer-phase");
    const timeEl = timer.querySelector(".timer-time");
    const bar = timer.querySelector(".timer-bar i");
    const buttons = Array.from(timer.querySelectorAll("button[data-seconds]"));
    let total = 0, left = 0, tick = null, active = null;

    function render() {
      timeEl.textContent = fmt(left);
      bar.style.width = total ? `${((total - left) / total) * 100}%` : "0";
    }

    function stop() { clearInterval(tick); tick = null; }

    function reset() {
      stop();
      total = left = 0;
      active = null;
      phaseEl.textContent = "Ready";
      timer.classList.remove("paused", "done");
      buttons.forEach((b) => b.classList.remove("on"));
      render();
    }

    function run() {
      stop();
      timer.classList.remove("paused");
      tick = setInterval(() => {
        left -= 1;
        render();
        if (left <= 0) {
          stop();
          phaseEl.textContent = `${active.dataset.phase} · time!`;
          timer.classList.add("done");
        }
      }, 1000);
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Clicking the running phase pauses / resumes it.
        if (active === btn && left > 0) {
          if (tick) { stop(); timer.classList.add("paused"); }
          else run();
          return;
        }
        active = btn;
        total = left = Number(btn.dataset.seconds);
        phaseEl.textContent = btn.dataset.phase;
        timer.classList.remove("done");
        buttons.forEach((b) => b.classList.toggle("on", b === btn));
        render();
        run();
      });
    });

    timer.querySelector("[data-reset]").addEventListener("click", reset);
    render();
  });
})();
