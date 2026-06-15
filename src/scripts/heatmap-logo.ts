import {
  ShaderMount,
  heatmapFragmentShader,
  getShaderColorFromString,
  toProcessedHeatmap,
} from '@paper-design/shaders';

/**
 * Paper Shaders "Heatmap" effect on a logo, wired without React.
 *
 * Mirrors the <Heatmap> React component: pre-process the logo image into the
 * contour/blur texture (toProcessedHeatmap), map the params to uniforms, and
 * mount via the vanilla ShaderMount (which already pauses on a hidden tab and
 * stops rAF entirely at speed:0 — used here for reduced-motion).
 *
 * Defaults are the exact config tuned in Paper.
 */

export interface HeatmapLogoOptions {
  image: string;
  colors?: string[];
  colorBack?: string;
  contour?: number;
  angle?: number;
  noise?: number;
  innerGlow?: number;
  outerGlow?: number;
  speed?: number;
  scale?: number;
}

const DEFAULTS = {
  colors: ['#112069', '#1f3ca3', '#3265e7', '#6bd8ff', '#ffe77a', '#ff9a1f', '#ff4d00', '#9933cc', '#cc3399'],
  colorBack: '#ffffff00',
  contour: 0.54,
  angle: 240,
  noise: 0,
  innerGlow: 0.25,
  outerGlow: 0.17,
  speed: 1.26,
  scale: 0.91,
};

export async function mountHeatmapLogo(
  parent: HTMLElement,
  opts: HeatmapLogoOptions
): Promise<ShaderMount | null> {
  const o = { ...DEFAULTS, ...opts };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let image: HTMLImageElement;
  try {
    const processed = await toProcessedHeatmap(o.image);
    image = await loadImage(URL.createObjectURL(processed.blob));
  } catch (e) {
    console.error('[heatmap-logo] image processing failed:', e);
    return null; // fail gracefully — the static logo stays
  }

  const uniforms = {
    u_image: image,
    u_contour: o.contour,
    u_angle: o.angle,
    u_noise: o.noise,
    u_innerGlow: o.innerGlow,
    u_outerGlow: o.outerGlow,
    u_colorBack: getShaderColorFromString(o.colorBack),
    u_colors: o.colors.map(getShaderColorFromString),
    u_colorsCount: o.colors.length,
    // sizing (Paper defaults; only scale is overridden)
    u_fit: 1, // contain
    u_offsetX: 0,
    u_offsetY: 0,
    u_originX: 0.5,
    u_originY: 0.5,
    u_rotation: 0,
    u_scale: o.scale,
    u_worldWidth: 0,
    u_worldHeight: 0,
  };

  try {
    return new ShaderMount(
      parent,
      heatmapFragmentShader,
      uniforms,
      undefined, // webgl context attrs
      reduced ? 0 : o.speed, // speed 0 => static frame, no rAF
      0, // frame
      undefined, // minPixelRatio
      undefined, // maxPixelCount
      ['u_image'] // generate mipmaps for the image
    );
  } catch (e) {
    console.error('[heatmap-logo] ShaderMount failed:', e);
    return null;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
