import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUT_DIR = resolve(process.cwd(), "public/images/case-studies");

const BG = "#0a0a0a";
const PANEL = "#171717";
const PANEL_2 = "#1f1f1f";
const BORDER = "#262626";
const TEXT = "#fafafa";
const MUTED = "#a3a3a3";
const DIM = "#525252";
const PURPLE = "#a855f7";
const PURPLE_DEEP = "#7e22ce";
const FUCHSIA = "#d946ef";
const GREEN = "#22c55e";
const RED = "#ef4444";
const AMBER = "#f59e0b";

const FONT = "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const wrap = (w, h, body) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#111114"/>
    </linearGradient>
    <radialGradient id="haloPurple" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="${PURPLE_DEEP}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${PURPLE_DEEP}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${PURPLE}"/>
      <stop offset="100%" stop-color="${FUCHSIA}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1a1a" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bgGrad)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  ${body}
</svg>`;

// ---------- 1. HERO ----------
function hero() {
  const w = 1600, h = 900;
  const body = `
    <ellipse cx="1180" cy="280" rx="640" ry="420" fill="url(#haloPurple)"/>
    <ellipse cx="280" cy="780" rx="520" ry="340" fill="url(#haloPurple)" opacity="0.6"/>

    <!-- left meta -->
    <g font-family="${FONT}" fill="${TEXT}">
      <text x="100" y="180" font-size="22" letter-spacing="6" fill="${PURPLE}" font-weight="600">CASE STUDY · POSEIDON</text>
      <text x="100" y="280" font-size="78" font-weight="800">Taming the</text>
      <text x="100" y="370" font-size="78" font-weight="800">fintech monster.</text>
      <text x="100" y="440" font-size="24" fill="${MUTED}" font-weight="400">One design system. Three surfaces.</text>
      <text x="100" y="476" font-size="24" fill="${MUTED}" font-weight="400">Web · iOS · Android · POS.</text>

      <line x1="100" y1="540" x2="260" y2="540" stroke="url(#accentLine)" stroke-width="3"/>
      <text x="100" y="600" font-size="14" letter-spacing="3" fill="${DIM}" font-weight="600">HYDROGENPAY · LEAD PRODUCT DESIGNER</text>
    </g>

    <!-- right device stack -->
    <g transform="translate(900,150)">
      <!-- desktop -->
      <rect x="0" y="60" width="620" height="380" rx="14" fill="${PANEL}" stroke="${BORDER}"/>
      <rect x="0" y="60" width="620" height="34" rx="14" fill="${PANEL_2}"/>
      <circle cx="20" cy="77" r="5" fill="#3f3f46"/><circle cx="38" cy="77" r="5" fill="#3f3f46"/><circle cx="56" cy="77" r="5" fill="#3f3f46"/>
      <rect x="22" y="120" width="180" height="12" rx="3" fill="${MUTED}"/>
      <rect x="22" y="146" width="120" height="8" rx="3" fill="${DIM}"/>
      <rect x="22" y="180" width="576" height="120" rx="8" fill="${PANEL_2}" stroke="${BORDER}"/>
      <rect x="42" y="200" width="220" height="10" rx="3" fill="${MUTED}"/>
      <rect x="42" y="220" width="160" height="8" rx="3" fill="${DIM}"/>
      <rect x="42" y="252" width="120" height="32" rx="6" fill="${PURPLE}"/>
      <rect x="22" y="320" width="280" height="80" rx="8" fill="${PANEL_2}" stroke="${BORDER}"/>
      <rect x="318" y="320" width="280" height="80" rx="8" fill="${PANEL_2}" stroke="${BORDER}"/>

      <!-- phone -->
      <g transform="translate(440,260)">
        <rect x="0" y="0" width="180" height="320" rx="22" fill="${PANEL}" stroke="${BORDER}"/>
        <rect x="10" y="14" width="160" height="292" rx="14" fill="#0f0f10"/>
        <rect x="22" y="34" width="100" height="10" rx="3" fill="${MUTED}"/>
        <rect x="22" y="54" width="60" height="6" rx="3" fill="${DIM}"/>
        <rect x="22" y="84" width="136" height="64" rx="8" fill="${PANEL_2}" stroke="${BORDER}"/>
        <rect x="34" y="100" width="80" height="8" rx="3" fill="${MUTED}"/>
        <rect x="34" y="116" width="60" height="6" rx="3" fill="${DIM}"/>
        <rect x="22" y="160" width="136" height="44" rx="8" fill="${PURPLE}"/>
        <rect x="22" y="216" width="136" height="44" rx="8" fill="${PANEL_2}" stroke="${BORDER}"/>
        <rect x="22" y="272" width="80" height="6" rx="3" fill="${DIM}"/>
      </g>

      <!-- POS terminal -->
      <g transform="translate(-60,360)">
        <rect x="0" y="0" width="170" height="240" rx="14" fill="${PANEL}" stroke="${BORDER}"/>
        <rect x="10" y="10" width="150" height="100" rx="6" fill="#0f0f10"/>
        <rect x="22" y="26" width="80" height="8" rx="3" fill="${MUTED}"/>
        <rect x="22" y="42" width="100" height="14" rx="3" fill="${PURPLE}"/>
        <rect x="22" y="66" width="50" height="6" rx="3" fill="${DIM}"/>
        <g fill="${PANEL_2}" stroke="${BORDER}">
          <rect x="14" y="124" width="40" height="32" rx="6"/><rect x="62" y="124" width="40" height="32" rx="6"/><rect x="110" y="124" width="44" height="32" rx="6"/>
          <rect x="14" y="164" width="40" height="32" rx="6"/><rect x="62" y="164" width="40" height="32" rx="6"/><rect x="110" y="164" width="44" height="32" rx="6"/>
          <rect x="14" y="204" width="40" height="28" rx="6"/><rect x="62" y="204" width="40" height="28" rx="6"/><rect x="110" y="204" width="44" height="28" rx="6"/>
        </g>
      </g>
    </g>
  `;
  return { svg: wrap(w, h, body), w, h, name: "poseidon-hero.png" };
}

// ---------- 2. BEFORE / AFTER ----------
function beforeAfter() {
  const w = 1600, h = 900;
  // panel renderer
  const screen = (x, y, label, fill, btn, btnLabel, accent) => `
    <g transform="translate(${x},${y})">
      <rect width="200" height="240" rx="10" fill="${PANEL}" stroke="${BORDER}"/>
      <rect x="14" y="18" width="80" height="8" rx="3" fill="${MUTED}"/>
      <rect x="14" y="34" width="120" height="6" rx="3" fill="${DIM}"/>
      <circle cx="100" cy="92" r="26" fill="none" stroke="${accent}" stroke-width="3"/>
      <path d="M 88 92 l 10 10 l 18 -20" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="14" y="138" width="172" height="8" rx="3" fill="${MUTED}"/>
      <rect x="14" y="154" width="140" height="6" rx="3" fill="${DIM}"/>
      <rect x="14" y="184" width="172" height="38" rx="${btn}" fill="${fill}"/>
      <text x="100" y="208" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="600" fill="${TEXT}">${btnLabel}</text>
      <text x="100" y="270" text-anchor="middle" font-family="${FONT}" font-size="13" fill="${DIM}">${label}</text>
    </g>`;

  const body = `
    <text x="100" y="120" font-family="${FONT}" font-size="20" letter-spacing="5" fill="${PURPLE}" font-weight="600">BEFORE / AFTER</text>
    <text x="100" y="180" font-family="${FONT}" font-size="46" font-weight="800" fill="${TEXT}">One screen, three truths → one shared pattern.</text>

    <!-- divider -->
    <line x1="800" y1="240" x2="800" y2="820" stroke="${BORDER}" stroke-width="1" stroke-dasharray="6 8"/>
    <rect x="788" y="260" width="24" height="24" rx="4" fill="${PANEL}" stroke="${BORDER}"/>
    <text x="800" y="277" text-anchor="middle" font-family="${FONT}" font-size="13" fill="${MUTED}" font-weight="700">/</text>

    <!-- BEFORE label -->
    <text x="120" y="280" font-family="${FONT}" font-size="14" letter-spacing="3" font-weight="700" fill="${RED}">BEFORE · DIVERGENT</text>
    <text x="120" y="316" font-family="${FONT}" font-size="22" fill="${MUTED}">Three teams. Three confirmations. Zero alignment.</text>

    <!-- BEFORE: 3 inconsistent screens -->
    ${screen(120, 360, "Web", "#0ea5e9", 6, "DONE", "#0ea5e9")}
    ${screen(360, 380, "Mobile", "#22c55e", 22, "Confirm ✓", "#22c55e")}
    ${screen(560, 420, "POS", "#f59e0b", 0, "OK", "#f59e0b")}

    <!-- AFTER label -->
    <text x="860" y="280" font-family="${FONT}" font-size="14" letter-spacing="3" font-weight="700" fill="${GREEN}">AFTER · UNIFIED</text>
    <text x="860" y="316" font-family="${FONT}" font-size="22" fill="${MUTED}">One pattern. Tokens flex per surface.</text>

    <!-- AFTER: 3 consistent screens -->
    ${screen(860, 380, "Web", PURPLE, 8, "Confirm payment", GREEN)}
    ${screen(1100, 380, "Mobile", PURPLE, 8, "Confirm payment", GREEN)}
    ${screen(1340, 380, "POS", PURPLE, 8, "Confirm payment", GREEN)}

    <!-- footer caption -->
    <line x1="100" y1="780" x2="260" y2="780" stroke="url(#accentLine)" stroke-width="3"/>
    <text x="100" y="822" font-family="${FONT}" font-size="16" fill="${DIM}" letter-spacing="2">PRIMITIVE · SUCCESS-CONFIRMATION · ONE PATTERN ACROSS WEB · MOBILE · POS</text>
  `;
  return { svg: wrap(w, h, body), w, h, name: "poseidon-before-after.png" };
}

// ---------- 3. BUTTON SPECIMEN (1:1) ----------
function buttonSpecimen() {
  const w = 1200, h = 1200;
  const surfaces = ["Web", "Mobile", "POS"];
  const states = [
    { label: "Default",    fill: PURPLE,        text: TEXT,    border: "none" },
    { label: "Hover",      fill: PURPLE_DEEP,   text: TEXT,    border: "none" },
    { label: "Focus",      fill: PURPLE,        text: TEXT,    border: PURPLE, ring: true },
    { label: "Loading",    fill: PURPLE,        text: TEXT,    border: "none", spinner: true },
    { label: "Disabled",   fill: "#3f3f46",     text: "#71717a", border: "none" },
    { label: "Destructive",fill: RED,           text: TEXT,    border: "none" },
  ];

  const cellW = 150, cellH = 56, gapX = 18, gapY = 28;
  const startX = 170, startY = 280;

  let cells = "";
  surfaces.forEach((surf, row) => {
    states.forEach((s, col) => {
      const x = startX + col * (cellW + gapX);
      const y = startY + row * (cellH + gapY) + row * 60;
      const radius = surf === "Web" ? 8 : surf === "Mobile" ? 12 : 6;
      const fontSize = surf === "POS" ? 13 : 14;
      cells += `
        ${s.ring ? `<rect x="${x-4}" y="${y-4}" width="${cellW+8}" height="${cellH+8}" rx="${radius+4}" fill="none" stroke="${PURPLE}" stroke-width="2" opacity="0.6"/>` : ""}
        <rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="${radius}" fill="${s.fill}"/>
        ${s.spinner ? `<circle cx="${x+30}" cy="${y+cellH/2}" r="8" fill="none" stroke="${TEXT}" stroke-width="2" stroke-dasharray="30 12" opacity="0.85"/>` : ""}
        <text x="${x + cellW/2 + (s.spinner?12:0)}" y="${y+cellH/2+5}" text-anchor="middle" font-family="${FONT}" font-size="${fontSize}" font-weight="600" fill="${s.text}">${s.label === "Loading" ? "Saving…" : "Pay now"}</text>
        <text x="${x + cellW/2}" y="${y + cellH + 22}" text-anchor="middle" font-family="${FONT}" font-size="11" fill="${DIM}" letter-spacing="2">${s.label.toUpperCase()}</text>
      `;
    });
    // surface row label
    cells += `
      <text x="100" y="${startY + row * (cellH + gapY) + row * 60 + cellH/2 + 5}" font-family="${FONT}" font-size="16" font-weight="700" fill="${MUTED}" letter-spacing="3">${surf.toUpperCase()}</text>
      <line x1="100" y1="${startY + row * (cellH + gapY) + row * 60 + cellH + 36}" x2="${startX + 6 * (cellW + gapX) - gapX}" y2="${startY + row * (cellH + gapY) + row * 60 + cellH + 36}" stroke="${BORDER}" stroke-dasharray="2 6"/>
    `;
  });

  const body = `
    <ellipse cx="900" cy="200" rx="500" ry="320" fill="url(#haloPurple)" opacity="0.5"/>
    <text x="100" y="120" font-family="${FONT}" font-size="20" letter-spacing="5" fill="${PURPLE}" font-weight="600">COMPONENT SPECIMEN</text>
    <text x="100" y="180" font-family="${FONT}" font-size="44" font-weight="800" fill="${TEXT}">Button — six states, three surfaces.</text>
    <text x="100" y="222" font-family="${FONT}" font-size="18" fill="${MUTED}">Same primitive. Tokens flex per surface (radius, density, type ramp).</text>

    ${cells}

    <g transform="translate(100,1080)">
      <text font-family="${FONT}" font-size="14" letter-spacing="3" fill="${DIM}" font-weight="600">TOKENS</text>
      <text y="28" font-family="${FONT}" font-size="14" fill="${MUTED}">color.action.primary</text>
      <text x="240" y="28" font-family="${FONT}" font-size="14" fill="${MUTED}">radius.button.{web|mobile|pos}</text>
      <text x="600" y="28" font-family="${FONT}" font-size="14" fill="${MUTED}">space.button.padX</text>
      <text x="840" y="28" font-family="${FONT}" font-size="14" fill="${MUTED}">type.label.md</text>
    </g>
  `;
  return { svg: wrap(w, h, body), w, h, name: "poseidon-button-specimen.png" };
}

// ---------- 4. SYSTEM DIAGRAM ----------
function systemDiagram() {
  const w = 1600, h = 900;

  const layer = (y, label, items, color) => {
    let nodes = "";
    items.forEach((it, i) => {
      const x = 320 + i * 220;
      nodes += `
        <rect x="${x}" y="${y}" width="180" height="80" rx="10" fill="${PANEL}" stroke="${color}" stroke-width="1.5"/>
        <text x="${x+90}" y="${y+38}" text-anchor="middle" font-family="${FONT}" font-size="16" font-weight="700" fill="${TEXT}">${it.t}</text>
        <text x="${x+90}" y="${y+58}" text-anchor="middle" font-family="${FONT}" font-size="12" fill="${MUTED}">${it.s}</text>
      `;
    });
    return `
      <text x="120" y="${y+50}" font-family="${FONT}" font-size="18" font-weight="700" fill="${color}" letter-spacing="3">${label}</text>
      ${nodes}
    `;
  };

  // arrows between layer y bands
  const arrow = (x, y1, y2) => `
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2-6}" stroke="${DIM}" stroke-width="1.5"/>
    <polygon points="${x-5},${y2-6} ${x+5},${y2-6} ${x},${y2}" fill="${DIM}"/>
  `;

  const tokensY = 230, atomsY = 380, molY = 530, orgY = 680;
  let arrows = "";
  for (let i = 0; i < 4; i++) {
    const cx = 320 + i * 220 + 90;
    arrows += arrow(cx, tokensY+80, atomsY);
    arrows += arrow(cx, atomsY+80, molY);
    arrows += arrow(cx, molY+80, orgY);
  }

  const body = `
    <ellipse cx="800" cy="200" rx="700" ry="180" fill="url(#haloPurple)" opacity="0.45"/>
    <text x="100" y="120" font-family="${FONT}" font-size="20" letter-spacing="5" fill="${PURPLE}" font-weight="600">SYSTEM DIAGRAM</text>
    <text x="100" y="180" font-family="${FONT}" font-size="42" font-weight="800" fill="${TEXT}">Tokens → atoms → molecules → organisms.</text>

    ${layer(tokensY, "TOKENS",     [{t:"color",s:"semantic + raw"},{t:"space",s:"4 / 8 / 16…"},{t:"radius",s:"per surface"},{t:"type",s:"label · body · h"}], PURPLE)}
    ${layer(atomsY,  "ATOMS",      [{t:"button",s:"6 states"},{t:"input",s:"text · num · select"},{t:"badge",s:"status"},{t:"icon",s:"24px grid"}], FUCHSIA)}
    ${layer(molY,    "MOLECULES",  [{t:"form row",s:"label + input + help"},{t:"list item",s:"avatar + meta"},{t:"toast",s:"success · error"},{t:"tab bar",s:"surface aware"}], "#22d3ee")}
    ${layer(orgY,    "ORGANISMS",  [{t:"transaction card",s:"web · mobile · POS"},{t:"KYC step",s:"3-stage flow"},{t:"refund flow",s:"dialog → receipt"},{t:"settings panel",s:"shared"}], GREEN)}

    ${arrows}

    <line x1="100" y1="820" x2="260" y2="820" stroke="url(#accentLine)" stroke-width="3"/>
    <text x="100" y="858" font-family="${FONT}" font-size="14" fill="${DIM}" letter-spacing="3">ONE GRAPH FEEDS WEB · IOS · ANDROID · POS</text>
  `;
  return { svg: wrap(w, h, body), w, h, name: "poseidon-system-diagram.png" };
}

// ---------- 5. USER FLOW ----------
function userFlow() {
  const w = 1600, h = 900;

  // 3 surfaces × 3 stages
  const surfaces = [
    { label: "WEB",    y: 220, radius: 10, frame: { w: 360, h: 200 } },
    { label: "MOBILE", y: 460, radius: 22, frame: { w: 200, h: 200 } },
    { label: "POS",    y: 700, radius: 8,  frame: { w: 280, h: 160 } },
  ];

  const stages = [
    { label: "1 · REFUND",       body: (sx,sy,fw,fh) => `
        <rect x="${sx+20}" y="${sy+24}" width="${fw*0.5}" height="10" rx="3" fill="${MUTED}"/>
        <rect x="${sx+20}" y="${sy+44}" width="${fw*0.7}" height="6" rx="3" fill="${DIM}"/>
        <rect x="${sx+20}" y="${sy+72}" width="${fw-40}" height="42" rx="8" fill="${PANEL_2}" stroke="${BORDER}"/>
        <text x="${sx+34}" y="${sy+98}" font-family="${FONT}" font-size="13" fill="${MUTED}">Amount  $48.20</text>
        <rect x="${sx+20}" y="${sy+fh-58}" width="120" height="36" rx="8" fill="${RED}"/>
        <text x="${sx+80}" y="${sy+fh-34}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="600" fill="${TEXT}">Refund</text>
    ` },
    { label: "2 · CONFIRM",      body: (sx,sy,fw,fh) => `
        <circle cx="${sx+fw/2}" cy="${sy+fh/2-20}" r="22" fill="none" stroke="${AMBER}" stroke-width="3"/>
        <text x="${sx+fw/2}" y="${sy+fh/2-14}" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="800" fill="${AMBER}">!</text>
        <text x="${sx+fw/2}" y="${sy+fh/2+22}" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="600" fill="${TEXT}">Confirm refund?</text>
        <rect x="${sx+fw/2-110}" y="${sy+fh-46}" width="100" height="32" rx="8" fill="${PANEL_2}" stroke="${BORDER}"/>
        <text x="${sx+fw/2-60}" y="${sy+fh-26}" text-anchor="middle" font-family="${FONT}" font-size="12" fill="${MUTED}">Cancel</text>
        <rect x="${sx+fw/2+10}" y="${sy+fh-46}" width="100" height="32" rx="8" fill="${PURPLE}"/>
        <text x="${sx+fw/2+60}" y="${sy+fh-26}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="600" fill="${TEXT}">Confirm</text>
    ` },
    { label: "3 · RECEIPT",      body: (sx,sy,fw,fh) => `
        <circle cx="${sx+fw/2}" cy="${sy+fh/2-30}" r="22" fill="${GREEN}"/>
        <path d="M ${sx+fw/2-10} ${sy+fh/2-30} l 8 8 l 14 -14" fill="none" stroke="${TEXT}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="${sx+fw/2}" y="${sy+fh/2+10}" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="700" fill="${TEXT}">Refunded $48.20</text>
        <text x="${sx+fw/2}" y="${sy+fh/2+30}" text-anchor="middle" font-family="${FONT}" font-size="11" fill="${DIM}">REF · 9F2A · 14:32</text>
    ` },
  ];

  const stageX = [200, 700, 1200];
  let scenes = "";
  surfaces.forEach((s) => {
    stages.forEach((st, i) => {
      const sx = stageX[i] + (300 - s.frame.w) / 2;
      const sy = s.y;
      scenes += `
        <rect x="${sx}" y="${sy}" width="${s.frame.w}" height="${s.frame.h}" rx="${s.radius}" fill="${PANEL}" stroke="${BORDER}"/>
        ${st.body(sx, sy, s.frame.w, s.frame.h)}
      `;
    });
    // surface label
    scenes += `<text x="100" y="${s.y + s.frame.h/2 + 5}" font-family="${FONT}" font-size="16" font-weight="700" fill="${MUTED}" letter-spacing="4">${s.label}</text>`;

    // arrows between stages
    for (let i = 0; i < 2; i++) {
      const x1 = stageX[i] + (300 + s.frame.w) / 2 + 10;
      const x2 = stageX[i+1] + (300 - s.frame.w) / 2 - 10;
      const y = s.y + s.frame.h / 2;
      scenes += `
        <line x1="${x1}" y1="${y}" x2="${x2-6}" y2="${y}" stroke="${DIM}" stroke-width="1.5" stroke-dasharray="4 6"/>
        <polygon points="${x2-6},${y-5} ${x2-6},${y+5} ${x2},${y}" fill="${DIM}"/>
      `;
    }
  });

  // stage headers
  let headers = "";
  stages.forEach((st, i) => {
    headers += `<text x="${stageX[i] + 150}" y="180" text-anchor="middle" font-family="${FONT}" font-size="14" letter-spacing="4" font-weight="700" fill="${PURPLE}">${st.label}</text>`;
  });

  const body = `
    <text x="100" y="120" font-family="${FONT}" font-size="20" letter-spacing="5" fill="${PURPLE}" font-weight="600">USER FLOW</text>
    <text x="100" y="156" font-family="${FONT}" font-size="32" font-weight="800" fill="${TEXT}">Refund → confirm → receipt. Identical across surfaces.</text>
    ${headers}
    ${scenes}
  `;
  return { svg: wrap(w, h, body), w, h, name: "poseidon-user-flow.png" };
}

const artifacts = [hero(), beforeAfter(), buttonSpecimen(), systemDiagram(), userFlow()];

await mkdir(OUT_DIR, { recursive: true });
for (const a of artifacts) {
  const out = resolve(OUT_DIR, a.name);
  const buf = Buffer.from(a.svg, "utf8");
  await sharp(buf, { density: 144 })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(out);
  console.log("wrote", out);
}
console.log("done");
