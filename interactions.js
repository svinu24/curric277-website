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
