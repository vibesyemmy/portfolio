Nav animated icons (Lordicon)
=============================

Drop two Lordicon JSON exports here:

  work.json   -> shown before the "Work" nav link
  blog.json   -> shown before the "Blog" nav link

The nav auto-detects them: until both files exist, those links render as plain
text (no broken state). Add the files and reload — icons appear and animate on
hover (hovering anywhere on the link triggers them, via the element's
target=".nav__link").

How to get the files:
1. Pick an icon on https://lordicon.com (suggest the "System / Outline" style to
   match the minimal nav — e.g. a folder/briefcase/grid for Work, a document/
   feather/article for Blog).
2. Download as "Lottie (.json)".
3. Rename to work.json / blog.json and place in this folder.

Notes:
- Check the icon's license — free icons require attribution; a paid plan removes
  it. Whatever you ship must be licensed for use.
- Colour is set in Nav.astro (colors="primary:#666666", matching --ink-2). Change
  it there if you swap to a multi-colour icon.
- Backed by lottie_light (no expressions). If a specific icon renders oddly, it
  likely uses Lottie expressions — switch the import in src/scripts/lord-icons.ts
  to the full 'lottie-web' player.
