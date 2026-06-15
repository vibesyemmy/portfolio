import gsap from 'gsap';

/**
 * Weather-reactive logo effects.
 *
 * A WeatherLogo wraps a logo element (any container holding an <img>) and plays
 * ambient weather effects on it: drifting clouds, a warm "sunny" glow, rain,
 * snow, fog, night stars, storm flashes. Effects layer over/behind the logo via
 * two injected `.logo-fx` layers; particle sizes scale to the logo height so the
 * same engine works on the big playground logo and the tiny nav logo.
 *
 * Designed to be driven either by manual conditions (playground) or by real,
 * IP-based weather (nav) — see fetchWeather() / getCachedWeather().
 */

export type Condition = 'clear' | 'clouds' | 'fog' | 'rain' | 'snow' | 'storm';

export interface WeatherState {
  condition: Condition;
  isDay: boolean;
  tempC?: number;
  city?: string;
}

const LABEL: Record<Condition, string> = {
  clear: 'Sunny',
  clouds: 'Cloudy',
  fog: 'Foggy',
  rain: 'Rainy',
  snow: 'Snowy',
  storm: 'Stormy',
};

const EMOJI: Record<Condition, string> = {
  clear: '☀️',
  clouds: '☁️',
  fog: '🌫️',
  rain: '🌧️',
  snow: '❄️',
  storm: '⛈️',
};

/** Map an Open-Meteo WMO weather code to one of our coarse conditions. */
export function codeToCondition(code: number): Condition {
  if (code <= 1) return 'clear'; // 0 clear, 1 mainly clear
  if (code <= 3) return 'clouds'; // 2 partly cloudy, 3 overcast
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 67) return 'rain'; // drizzle + rain
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'rain'; // rain showers
  if (code >= 85 && code <= 86) return 'snow'; // snow showers
  if (code >= 95) return 'storm'; // thunderstorm
  return 'clear';
}

function tipText(s: WeatherState): string {
  const label = s.condition === 'clear' && !s.isDay ? 'Clear' : LABEL[s.condition];
  const emoji = s.condition === 'clear' && !s.isDay ? '🌙' : EMOJI[s.condition];
  return `${label}${s.city ? ` in ${s.city}` : ''} ${emoji}`;
}

const rand = gsap.utils.random;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CLOUD_SVG = `<svg viewBox="0 0 100 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="38" r="18"/><circle cx="52" cy="28" r="22"/><circle cx="74" cy="40" r="16"/><rect x="26" y="38" width="52" height="20" rx="10"/></svg>`;

export class WeatherLogo {
  private root: HTMLElement;
  private img: HTMLElement | null;
  private back: HTMLElement;
  private front: HTMLElement;
  private tip: HTMLElement;
  private runId = 0;
  private timers: number[] = [];

  constructor(root: HTMLElement) {
    this.root = root;
    this.root.classList.add('logo-stage');
    this.img = root.querySelector('img');
    this.back = this.ensureLayer('logo-fx--back', true);
    this.front = this.ensureLayer('logo-fx--front', false);
    this.tip = this.ensureTip();
  }

  private ensureLayer(cls: string, prepend: boolean): HTMLElement {
    let el = this.root.querySelector<HTMLElement>(`.${cls}`);
    if (!el) {
      el = document.createElement('div');
      el.className = `logo-fx ${cls}`;
      el.setAttribute('aria-hidden', 'true');
      if (prepend) this.root.prepend(el);
      else this.root.appendChild(el);
    }
    return el;
  }

  private ensureTip(): HTMLElement {
    let el = this.root.querySelector<HTMLElement>('.logo-tip');
    if (!el) {
      el = document.createElement('span');
      el.className = 'logo-tip';
      this.root.appendChild(el);
    }
    return el;
  }

  /** logo height in px — the scale unit for every particle */
  private u(): number {
    return this.img?.getBoundingClientRect().height || 32;
  }

  /** repeating loop that stops itself when the run is superseded. Skips spawning
      while the tab is hidden (rAF is paused there, so particles would otherwise
      pile up un-animated), and keeps ticking so it resumes when visible again. */
  private repeat(id: number, delay: () => number, fn: () => void) {
    const tick = () => {
      if (id !== this.runId) return;
      if (!document.hidden) fn();
      this.timers.push(window.setTimeout(tick, delay()));
    };
    tick();
  }

  private once(id: number, ms: number, fn: () => void) {
    this.timers.push(
      window.setTimeout(() => {
        if (id === this.runId) fn();
      }, ms)
    );
  }

  set(state: WeatherState) {
    this.stop();
    const id = this.runId;
    this.root.dataset.weather = state.condition;
    this.root.dataset.day = state.isDay ? 'day' : 'night';
    this.tip.textContent = tipText(state);

    if (reduced()) return; // honour reduced-motion: static logo, tooltip only

    switch (state.condition) {
      case 'clear':
        this.clear(id, state.isDay);
        break;
      case 'clouds':
        this.clouds(id);
        break;
      case 'fog':
        this.fog(id);
        break;
      case 'rain':
        this.rain(id);
        break;
      case 'snow':
        this.snow(id);
        break;
      case 'storm':
        this.storm(id);
        break;
    }
  }

  stop() {
    this.runId++;
    gsap.killTweensOf([...this.front.children, ...this.back.children]);
    this.timers.forEach((t) => clearTimeout(t));
    this.timers = [];
    this.front.innerHTML = '';
    this.back.innerHTML = '';
  }

  // ---- effects -------------------------------------------------------------

  private clear(id: number, isDay: boolean) {
    const glow = document.createElement('div');
    glow.className = isDay ? 'fx-glow' : 'fx-glow fx-glow--cool';
    this.back.appendChild(glow);
    gsap.fromTo(glow, { opacity: 0, scale: 0.9 }, { opacity: isDay ? 0.85 : 0.5, scale: 1, duration: 1.2, ease: 'power2.out' });
    gsap.to(glow, {
      scale: 1.12,
      opacity: isDay ? 0.6 : 0.35,
      duration: 2.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.2,
    });

    if (isDay) {
      this.repeat(id, () => rand(4, 8) * 1000, () => this.shimmer());
    } else {
      for (let i = 0; i < 4; i++) this.star();
    }
  }

  private shimmer() {
    const u = this.u();
    const s = document.createElement('div');
    s.className = 'fx-shimmer';
    this.front.appendChild(s);
    gsap
      .timeline({ onComplete: () => s.remove() })
      .fromTo(
        s,
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 0.8, duration: 0.7, ease: 'power1.inOut' }
      )
      .to(s, { opacity: 0, duration: 0.3 }, '>-0.15');
    void u;
  }

  private star() {
    const u = this.u();
    const st = document.createElement('div');
    st.className = 'fx-star';
    const sz = u * 0.1;
    st.style.width = `${sz}px`;
    st.style.height = `${sz}px`;
    st.style.left = `${rand(8, 92)}%`;
    st.style.top = `${rand(0, 55)}%`;
    this.front.appendChild(st);
    gsap.to(st, {
      opacity: rand(0.4, 1),
      duration: rand(0.8, 1.8),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: rand(0, 1.6),
    });
  }

  private clouds(id: number) {
    this.once(id, 500, () => this.spawnCloud());
    this.repeat(id, () => rand(7, 15) * 1000, () => {
      const n = rand(0, 1) < 0.5 ? 1 : 2;
      for (let i = 0; i < n; i++) this.spawnCloud();
    });
  }

  private spawnCloud() {
    const u = this.u();
    const c = document.createElement('div');
    c.className = 'fx-cloud';
    c.innerHTML = CLOUD_SVG;
    const w = u * rand(1.1, 1.7);
    c.style.width = `${w}px`;
    c.style.height = `${w * 0.6}px`;
    c.style.left = `${rand(6, 48)}%`; // biased to the mark (left) side
    c.style.top = `${rand(-12, 22)}%`;
    this.front.appendChild(c);

    const fromLeft = rand(0, 1) < 0.5;
    gsap.set(c, { xPercent: -50, yPercent: -50, x: fromLeft ? -u * 1.6 : u * 1.6, opacity: 0, scale: 0.92 });
    gsap
      .timeline({ onComplete: () => c.remove() })
      .to(c, { x: rand(-u * 0.2, u * 0.2), opacity: 0.95, duration: 0.9, ease: 'power2.out' })
      .to(c, { y: `+=${u * 0.12}`, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: 1 }, '>-0.2')
      .to(c, { x: fromLeft ? u * 1.6 : -u * 1.6, opacity: 0, duration: 1, ease: 'power2.in' });
  }

  private fog(id: number) {
    this.once(id, 400, () => this.spawnFog());
    this.repeat(id, () => rand(5, 9) * 1000, () => this.spawnFog());
  }

  private spawnFog() {
    const u = this.u();
    const f = document.createElement('div');
    f.className = 'fx-fog';
    f.style.height = `${u * 0.9}px`;
    f.style.top = `${rand(15, 45)}%`;
    this.front.appendChild(f);
    gsap
      .timeline({ onComplete: () => f.remove() })
      .fromTo(f, { xPercent: -130, opacity: 0 }, { opacity: 0.8, duration: 1.5, ease: 'power1.out' })
      .to(f, { xPercent: 130, duration: 4, ease: 'none' }, '<')
      .to(f, { opacity: 0, duration: 1.2 }, '>-1.4');
  }

  private rain(id: number) {
    this.repeat(id, () => rand(80, 170), () => this.spawnDrop());
  }

  private spawnDrop() {
    if (this.front.childElementCount > 34) return;
    const u = this.u();
    const d = document.createElement('div');
    d.className = 'fx-drop';
    d.style.left = `${rand(0, 100)}%`;
    d.style.height = `${u * 0.42}px`;
    this.front.appendChild(d);
    gsap.fromTo(
      d,
      { y: -u * 0.6, opacity: 0 },
      { y: u * 1.7, opacity: 1, duration: rand(0.5, 0.8), ease: 'power1.in', onComplete: () => d.remove() }
    );
  }

  private snow(id: number) {
    this.repeat(id, () => rand(160, 320), () => this.spawnFlake());
  }

  private spawnFlake() {
    if (this.front.childElementCount > 26) return;
    const u = this.u();
    const f = document.createElement('div');
    f.className = 'fx-flake';
    const sz = u * rand(0.08, 0.16);
    f.style.width = `${sz}px`;
    f.style.height = `${sz}px`;
    f.style.left = `${rand(0, 100)}%`;
    this.front.appendChild(f);
    gsap.fromTo(
      f,
      { y: -u * 0.5, x: 0, opacity: 0 },
      {
        y: u * 1.6,
        x: rand(-u * 0.35, u * 0.35),
        opacity: 1,
        duration: rand(2.2, 3.8),
        ease: 'sine.inOut',
        onComplete: () => f.remove(),
      }
    );
  }

  private storm(id: number) {
    this.rain(id);
    this.repeat(id, () => rand(3, 7) * 1000, () => this.flash());
  }

  private flash() {
    const fl = document.createElement('div');
    fl.className = 'fx-flash';
    this.front.appendChild(fl);
    gsap
      .timeline({ onComplete: () => fl.remove() })
      .to(fl, { opacity: 0.9, duration: 0.06 })
      .to(fl, { opacity: 0.2, duration: 0.08 })
      .to(fl, { opacity: 0.75, duration: 0.05 })
      .to(fl, { opacity: 0, duration: 0.45 });
  }
}

// ---- data ------------------------------------------------------------------

/** IP-based geolocation + Open-Meteo current weather. No API key, no prompt. */
export async function fetchWeather(): Promise<WeatherState | null> {
  try {
    const geo = await fetch('https://ipapi.co/json/').then((r) => r.json());
    if (geo == null || geo.latitude == null) return null;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=weather_code,is_day,temperature_2m`;
    const w = await fetch(url).then((r) => r.json());
    const cur = w?.current;
    if (!cur) return null;
    return {
      condition: codeToCondition(cur.weather_code),
      isDay: cur.is_day === 1,
      tempC: cur.temperature_2m,
      city: geo.city,
    };
  } catch {
    return null;
  }
}

/** fetchWeather() with a localStorage cache so repeat visits don't refetch. */
export async function getCachedWeather(maxAgeMin = 45): Promise<WeatherState | null> {
  try {
    const raw = localStorage.getItem('weatherLogo');
    if (raw) {
      const { t, s } = JSON.parse(raw);
      if (Date.now() - t < maxAgeMin * 60_000) return s as WeatherState;
    }
  } catch {
    /* ignore */
  }
  const s = await fetchWeather();
  if (s) {
    try {
      localStorage.setItem('weatherLogo', JSON.stringify({ t: Date.now(), s }));
    } catch {
      /* ignore */
    }
  }
  return s;
}
