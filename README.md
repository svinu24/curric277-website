# Leet Noobs · Discussion Lead

A web-based slide deck for the Curric 277 discussion lead on Mark Chen's
*Leet Noobs: The Life and Death of an Expert Player Group in World of Warcraft* (2012).

No build step or install needed. Open `index.html` in a browser, or host the folder on GitHub Pages.

## Controls

| Key | Action |
| --- | --- |
| `→` `Space` `Enter` | Next step / next slide |
| `←` | Back |
| `N` | Toggle speaker notes |
| `F` | Fullscreen |
| `H` | Hide the on-screen hints and counter |
| `Home` / `End` | First / last slide |

Swipe works on touch screens. Each slide has its own URL (`index.html#7`), so you can jump straight to it.

**PDF / handout:** open `index.html?print` and print to PDF. Every slide becomes one page with all reveals shown.

## Run of show (~12 min summary + discussion)

| # | Slide | Time |
| --- | --- | --- |
| 1–2 | Title, prologue hook + show of hands | 1.5 min |
| 3–5 | The study, WoW primer, big idea (expertise & capital) | 3 min |
| 6–8 | Ch. 1 leet noobs, Ch. 2 a night in Molten Core, **loot vote** | 3 min |
| 9–10 | Ch. 3 threat meter, epilogue victory chat replay | 2 min |
| 11–14 | Ch. 4 death of a raid, why it died, takeaways, beyond WoW | 2.5 min |
| 15–18 | Think-pair-share format + 3 discussion questions (built-in timers) | ~20 min |
| 19 | Wrap-up / one-sentence exit | 2 min |

## Interactive bits

- **Loot vote (slide 8):** click a card to add a vote, shift-click to remove one. The leader glows. The next step reveals what Chen's raid actually chose.
- **Threat meter (slide 9):** the first step "installs" the add-on, and the bars animate in.
- **Victory log (slide 10):** replays the real Ragnaros-kill chat from the book's epilogue. Click *Replay log* to run it again.
- **Timers (slides 16–18):** Think 1:00 / Pair 2:00 / Share 5:00. Click the running phase to pause it.

## Editing

- Presenter names: the title slide in `index.html` (search for `Your Names Here`).
- Speaker notes: the `<aside class="notes">` inside each slide.
- Styles live in `styles.css`, navigation in `deck.js`, and slide interactions in `interactions.js`.
