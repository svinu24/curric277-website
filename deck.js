/* ==========================================================================
   Tiny slide engine — no dependencies.
   → / space / click arrows : next step or slide      ← : back
   N : speaker notes   F : fullscreen   H : hide UI   Home/End : first/last
   Elements with .frag (hidden) or .step (state change) reveal one per press.
   Slides fire "slide:enter" / "slide:leave" events for their own animations.
   ========================================================================== */

(() => {
  const deck = document.getElementById("deck");
  const slides = Array.from(deck.querySelectorAll(".slide"));
  const progress = document.getElementById("progress");
  const counter = document.getElementById("counter");

  let index = 0;

  /* ---------- Print / PDF mode: index.html?print ---------- */

  if (new URLSearchParams(location.search).has("print")) {
    document.body.classList.add("print");
    slides.forEach((slide) => {
      slide.classList.add("active");
      slide.querySelectorAll(".frag, .step").forEach((el) => el.classList.add("shown"));
    });
    window.Deck = { print: true, slides };
    return;
  }

  /* ---------- Scale the 1600×900 stage to the window ---------- */

  function fit() {
    const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    deck.style.transform = `scale(${scale})`;
  }
  window.addEventListener("resize", fit);
  fit();

  /* ---------- Fragments ---------- */

  // DOM order by default; data-order="-1" (etc.) lets a step jump the queue.
  const stepsOf = (slide) => Array.from(slide.querySelectorAll(".frag, .step"))
    .sort((a, b) => (Number(a.dataset.order) || 0) - (Number(b.dataset.order) || 0));
  const shownCount = (slide) => stepsOf(slide).filter((el) => el.classList.contains("shown")).length;

  function setSteps(slide, count) {
    stepsOf(slide).forEach((el, i) => {
      const on = i < count;
      if (on !== el.classList.contains("shown")) {
        el.classList.toggle("shown", on);
        el.dispatchEvent(new CustomEvent(on ? "step:show" : "step:hide", { bubbles: true }));
      }
    });
  }

  /* ---------- Navigation ---------- */

  function go(to, { stepsShown = 0 } = {}) {
    to = Math.max(0, Math.min(slides.length - 1, to));
    const from = slides[index];
    const changed = to !== index;

    if (changed) {
      from.classList.remove("active");
      from.dispatchEvent(new CustomEvent("slide:leave"));
    }

    index = to;
    const slide = slides[index];
    setSteps(slide, stepsShown);
    slide.classList.add("active");
    if (changed || !slide.dataset.entered) {
      slide.dataset.entered = "1";
      slide.dispatchEvent(new CustomEvent("slide:enter"));
    }

    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    counter.textContent = `${index + 1} / ${slides.length}`;
    if (location.hash !== `#${index + 1}`) history.replaceState(null, "", `#${index + 1}`);
    document.title = `${slide.dataset.title || "Slide"} · Leet Noobs`;
    renderNotes();
  }

  function next() {
    const slide = slides[index];
    const total = stepsOf(slide).length;
    const shown = shownCount(slide);
    if (shown < total) setSteps(slide, shown + 1);
    else if (index < slides.length - 1) go(index + 1);
  }

  function prev() {
    const slide = slides[index];
    const shown = shownCount(slide);
    if (shown > 0) setSteps(slide, shown - 1);
    else if (index > 0) go(index - 1, { stepsShown: stepsOf(slides[index - 1]).length });
  }

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    return Number.isFinite(n) ? n - 1 : 0;
  }

  /* ---------- Speaker notes ---------- */

  const notesPanel = document.createElement("div");
  notesPanel.className = "notes-panel";
  notesPanel.setAttribute("aria-live", "polite");
  document.body.appendChild(notesPanel);

  function renderNotes() {
    const notes = slides[index].querySelector(".notes");
    notesPanel.innerHTML = `<span class="notes-label">Speaker notes · ${index + 1}</span>` +
      (notes ? notes.innerHTML : "<em>No notes for this slide.</em>");
  }

  /* ---------- Input ---------- */

  document.addEventListener("keydown", (e) => {
    if (e.target.closest?.("input, textarea, [contenteditable]")) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ": case "Enter":
        e.preventDefault(); next(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": case "Backspace":
        e.preventDefault(); prev(); break;
      case "Home": go(0); break;
      case "End": go(slides.length - 1); break;
      case "n": case "N": document.body.classList.toggle("show-notes"); break;
      case "h": case "H": document.body.classList.toggle("clean-mode"); break;
      case "f": case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
        break;
    }
  });

  // Buttons shouldn't keep focus, or space/enter would re-click them.
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (btn) btn.blur();
  });

  document.getElementById("next").addEventListener("click", next);
  document.getElementById("prev").addEventListener("click", prev);

  let touchX = null;
  deck.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  deck.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX = null;
  });

  window.addEventListener("hashchange", () => {
    const target = fromHash();
    if (target !== index) go(target);
  });

  go(fromHash());

  // Expose for slide-specific scripts.
  window.Deck = { next, prev, go, get index() { return index; }, slides };
})();
