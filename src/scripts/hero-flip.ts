import gsap from 'gsap';

/**
 * Split a phrase into words → letters, preserving order.
 * `splitIntoLetters(p).map(w => w.join('')).join(' ')` reconstructs `p`
 * (for phrases with single spaces, which is all we feed it).
 * Returns [] for the empty string so the caller can guard cleanly.
 */
export function splitIntoLetters(phrase: string): string[][] {
  if (phrase.length === 0) return [];
  return phrase.split(' ').map((word) => word.split(''));
}

// Motion constants — mirror the Aceternity FlipWords component.
const ENTER_DUR = 0.25; // seconds, per letter
const WORD_STAGGER = 0.3; // seconds added per word index
const LETTER_STAGGER = 0.05; // seconds added per letter index within a word
const DWELL_MS = 3000; // hold a phrase fully visible before it exits
const EXIT_DUR = 0.4; // seconds, whole-phrase exit
const START_DELAY_MS = 200; // let the static prefix line settle first

interface LetterHandle {
  el: HTMLElement;
  delay: number; // absolute start time on the enter timeline
}

/** Copy the font-affecting computed styles from `from` onto `to` (for measuring). */
function copyFont(from: CSSStyleDeclaration, to: HTMLElement): void {
  to.style.fontFamily = from.fontFamily;
  to.style.fontSize = from.fontSize;
  to.style.fontWeight = from.fontWeight;
  to.style.fontStyle = from.fontStyle;
  to.style.lineHeight = from.lineHeight;
  to.style.letterSpacing = from.letterSpacing;
}

/**
 * Reserve the slot's height to the tallest phrase (measured at the slot's live
 * width) so phrases that wrap to more lines don't shift the sub-copy / actions /
 * wall below. Measured once, after fonts load.
 */
function reserveHeight(slot: HTMLElement, phrases: string[]): void {
  const cs = getComputedStyle(slot);
  const m = document.createElement('span');
  m.style.position = 'absolute';
  m.style.visibility = 'hidden';
  m.style.left = '-9999px';
  m.style.top = '0';
  m.style.display = 'block';
  m.style.width = `${slot.clientWidth}px`;
  m.style.whiteSpace = 'normal';
  copyFont(cs, m);
  document.body.appendChild(m);
  let maxH = 0;
  for (const p of phrases) {
    m.textContent = p;
    if (m.offsetHeight > maxH) maxH = m.offsetHeight;
  }
  document.body.removeChild(m);
  if (maxH > 0) slot.style.minHeight = `${maxH}px`;
}

/**
 * Replace the slot's content with per-letter spans (grouped into word spans so
 * words never break mid-wrap), and return a handle per letter with its staggered
 * enter delay (wordIndex*0.3 + letterIndex*0.05).
 */
function buildLetterSpans(slot: HTMLElement, phrase: string): LetterHandle[] {
  slot.textContent = '';
  const handles: LetterHandle[] = [];
  const words = splitIntoLetters(phrase);
  words.forEach((chars, wi) => {
    const wordEl = document.createElement('span');
    wordEl.className = 'flip-word';
    chars.forEach((ch, li) => {
      const letterEl = document.createElement('span');
      letterEl.className = 'flip-letter';
      letterEl.textContent = ch;
      wordEl.appendChild(letterEl);
      handles.push({ el: letterEl, delay: wi * WORD_STAGGER + li * LETTER_STAGGER });
    });
    slot.appendChild(wordEl);
    if (wi < words.length - 1) slot.appendChild(document.createTextNode(' '));
  });
  return handles;
}

/** Animate each letter in: fade + rise + de-blur, staggered by word then letter. */
function enter(letters: LetterHandle[]): gsap.core.Timeline {
  const tl = gsap.timeline();
  for (const { el, delay } of letters) {
    tl.fromTo(
      el,
      { opacity: 0, y: 10, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: ENTER_DUR, ease: 'power2.out' },
      delay // absolute position on the timeline
    );
  }
  return tl;
}

/** Animate the whole phrase out: fade + rise + blur + scale up. */
function exit(slot: HTMLElement): gsap.core.Tween {
  return gsap.to(slot, {
    opacity: 0,
    y: -40,
    filter: 'blur(8px)',
    scale: 1.3,
    duration: EXIT_DUR,
    ease: 'power2.in',
  });
}

/**
 * Enhance `.hero-wall__flip` into a rotating flip-words headline. Reads the 4
 * phrases from `data-flip-words` (JSON). No-op under reduced motion, with <2
 * phrases, or if already initialised — the static first phrase (already in the
 * HTML) then stands as the complete, readable headline.
 */
export function initHeroFlip(root: ParentNode = document): void {
  const slot = root.querySelector<HTMLElement>('.hero-wall__flip');
  if (!slot || slot.dataset.flipReady) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let phrases: string[] = [];
  try {
    phrases = JSON.parse(slot.dataset.flipWords || '[]');
  } catch {
    phrases = [];
  }
  if (reduced || !Array.isArray(phrases) || phrases.length < 2) return;

  slot.dataset.flipReady = 'true';

  document.fonts.ready.then(() => {
    reserveHeight(slot, phrases);
    gsap.set(slot, { autoAlpha: 1 }); // clears the CSS visibility:hidden pre-hide

    let i = 0;

    const cycle = (): void => {
      // reset the slot transform/filter the exit left behind, then build + enter
      gsap.set(slot, { opacity: 1, y: 0, scale: 1, filter: 'none' });
      const letters = buildLetterSpans(slot, phrases[i]);
      enter(letters).eventCallback('onComplete', () => {
        window.setTimeout(() => {
          exit(slot).eventCallback('onComplete', () => {
            i = (i + 1) % phrases.length;
            cycle();
          });
        }, DWELL_MS);
      });
    };

    window.setTimeout(cycle, START_DELAY_MS);
  });
}
