# Expertise · Leet Noobs Discussion Lead

A web-based slide deck for the Curric 277 discussion lead, built around one word: **expertise**.
It traces how Mark Chen redefines the word in *Leet Noobs: The Life and Death of an Expert Player Group in World of Warcraft* (2012).

No build step or install needed. Open `index.html` in a browser, or host the folder on GitHub Pages.

## The through-line

The deck starts with the everyday definition (expertise is individual skill or knowledge) and the class's own words from a warm-up. It then rebuilds the definition one sense at a time, each from a different part of the reading:

| Sense | Expertise is… | From the reading |
| --- | --- | --- |
| 1 | **social** | Intro & Ch. 1: communities of practice, new literacy studies |
| 2 | **earned** | Social & cultural capital, access, credentials vs. expertise |
| 3 | **situated** | Ch. 1: two stages of play, "leet noobs," adaptive expertise |
| 4 | **collective** | Ch. 2: distributed cognition, raid chat, failure, trust |
| 5 | **sociomaterial** | Ch. 3: the KLH Threat Meter, people + tools |
| 6 | **contested** | Ch. 4: the raid's death and competing definitions of a "good raider" |

A tracker in the top-right corner lights up each sense as you reach it. Slide 14 puts the full rebuilt definition next to the class's warm-up words.

## Controls

| Key | Action |
| --- | --- |
| `→` `Space` `Enter` | Next step / next slide |
| `←` | Back |
| `N` | Toggle speaker notes |
| `F` | Fullscreen |
| `H` | Hide the on-screen hints and counter |
| `Esc` | Leave the warm-up text box and go back to navigating |
| `Home` / `End` | First / last slide |

Swipe works on touch screens. Each slide has its own URL (`index.html#7`).

**PDF / handout:** open `index.html?print` and print to PDF. Every slide becomes one page with all reveals shown.

## Run of show (~12 min summary + discussion)

| # | Slide | Time |
| --- | --- | --- |
| 1–3 | Title, warm-up ("An expert is someone who…"), two definitions | 2.5 min |
| 4–5 | The reading, the game (WoW raiding primer) | 1.5 min |
| 6–9 | Senses 1–4: social, earned, situated, collective | 4 min |
| 10 | **Activity:** loot vote, "Who has earned the epic?" | 1.5 min |
| 11–13 | Sense 5 (threat meter), victory chat replay, sense 6 | 2.5 min |
| 14 | The rebuilt definition vs. our warm-up words | 1 min |
| 15–18 | Think-pair-share format + 3 discussion questions (built-in timers) | ~20 min |
| 19 | Wrap-up: "Expertise is ___." | 2 min |

## Interactive bits

- **Warm-up (slide 2):** click the box, type each word the class calls out, and press Enter. Words are saved in the browser and reappear on slide 14. *Clear* resets them.
- **Loot vote (slide 10):** click a card to add a vote, shift-click to remove one. The next step reveals what Chen's raid chose.
- **Threat meter (slide 11):** the first step "installs" the add-on and the bars animate in.
- **Victory log (slide 12):** replays the real Ragnaros-kill chat from the book's epilogue.
- **Timers (slides 16–18):** Think 1:00 / Pair 2:00 / Share 5:00. Click the running phase to pause it.

## Editing

- Presenter names: the title slide in `index.html` (search for `Your Names Here`).
- Speaker notes: the `<aside class="notes">` inside each slide.
- Styles live in `styles.css`, navigation in `deck.js`, and slide interactions in `interactions.js`.
