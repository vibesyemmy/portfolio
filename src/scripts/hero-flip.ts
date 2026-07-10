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
