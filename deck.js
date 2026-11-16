/* ==========================================================================
   Tiny slide engine — no dependencies.
   → / space : next slide     ← : previous slide     Home / End : first / last
   N : speaker notes          F : fullscreen
   index.html?print lays every slide out for printing to PDF.
   ========================================================================== */

(() => {
  const deck = document.getElementById("deck");
  const slides = Array.from(deck.querySelectorAll(".slide"));
  const progress = document.getElementById("progress");
  const counter = document.getElementById("counter");
  let index = 0;

  /* ---------- Print / PDF mode ---------- */

  if (new URLSearchParams(location.search).has("print")) {
    document.body.classList.add("print");
    slides.forEach((slide) => slide.classList.add("active"));
    return;
  }

  /* ---------- Scale the 1600×900 stage to the window ---------- */

  function fit() {
    const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    deck.style.transform = `scale(${scale})`;
  }
  window.addEventListener("resize", fit);
  fit();

  /* ---------- Speaker notes ---------- */

  const notesPanel = document.createElement("div");
  notesPanel.className = "notes-panel";
  document.body.appendChild(notesPanel);

  function renderNotes() {
    const notes = slides[index].querySelector(".notes");
    notesPanel.innerHTML = `<span class="notes-label">Speaker notes · ${index + 1}</span>` +
      (notes ? notes.innerHTML : "No notes for this slide.");
  }

  /* ---------- Navigation ---------- */

  function go(to) {
    to = Math.max(0, Math.min(slides.length - 1, to));
    slides[index].classList.remove("active");
    index = to;
    slides[index].classList.add("active");

    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    counter.textContent = `${index + 1} / ${slides.length}`;
    document.title = `${slides[index].dataset.title || "Slide"} · Expertise`;
    if (location.hash !== `#${index + 1}`) history.replaceState(null, "", `#${index + 1}`);
    renderNotes();
  }

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ": case "Enter":
        e.preventDefault(); next(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": case "Backspace":
        e.preventDefault(); prev(); break;
      case "Home": go(0); break;
      case "End": go(slides.length - 1); break;
      case "n": case "N": document.body.classList.toggle("show-notes"); break;
      case "f": case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
        break;
    }
  });

  document.getElementById("next").addEventListener("click", (e) => { e.currentTarget.blur(); next(); });
  document.getElementById("prev").addEventListener("click", (e) => { e.currentTarget.blur(); prev(); });

  // Swipe on touch screens.
  let touchX = null;
  deck.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  deck.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX = null;
  });

  const fromHash = () => (parseInt(location.hash.slice(1), 10) || 1) - 1;
  window.addEventListener("hashchange", () => go(fromHash()));
  go(fromHash());

  window.Deck = { go, next, prev, slides, get index() { return index; } };
})();
