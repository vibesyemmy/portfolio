import { describe, it, expect } from 'vitest';
import { splitIntoLetters } from './hero-flip';

describe('splitIntoLetters', () => {
  it('returns [] for an empty string', () => {
    expect(splitIntoLetters('')).toEqual([]);
  });

  it('splits a single word into one array of characters', () => {
    expect(splitIntoLetters('hi.')).toEqual([['h', 'i', '.']]);
  });

  it('groups letters by word, splitting on single spaces', () => {
    expect(splitIntoLetters('a b')).toEqual([['a'], ['b']]);
  });

  it('preserves punctuation as its own letter', () => {
    expect(splitIntoLetters('ship.')).toEqual([['s', 'h', 'i', 'p', '.']]);
  });

  it('round-trips: join words with a space reconstructs the input', () => {
    const phrase = 'design systems teams rely on.';
    const rebuilt = splitIntoLetters(phrase)
      .map((word) => word.join(''))
      .join(' ');
    expect(rebuilt).toBe(phrase);
  });
});
