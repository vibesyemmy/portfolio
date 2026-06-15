/**
 * Liquid-metal logo shader (the "fiery" Digcy-style effect, reimplemented).
 *
 * Renders a logo image into a WebGL2 canvas. The logo's alpha is the mask; a
 * flowing simplex-noise field drives a metallic ramp, per-channel dispersion
 * gives the iridescent fringe, and `warmth` blends chrome -> orange/gold so it
 * can read as molten metal or as fire. Animation pauses when the tab is hidden
 * and respects prefers-reduced-motion (renders one static frame).
 */

export interface LiquidParams {
  speed: number; // flow speed
  dispersion: number; // chromatic fringe amount
  edge: number; // edge softness of the mask
  liquid: number; // distortion / turbulence amount
  scale: number; // noise pattern scale
  warmth: number; // 0 = chrome, 1 = fiery orange/gold
}

export const DEFAULT_PARAMS: LiquidParams = {
  speed: 0.3,
  dispersion: 0.04,
  edge: 0.12,
  liquid: 0.6,
  scale: 2.2,
  warmth: 0.65,
};

const VERT = `#version 300 es
in vec2 a_position;
out vec2 vUv;
void main(){
  vUv = 0.5 * (a_position + 1.0);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D u_tex;
uniform float u_time;
uniform float u_speed;
uniform float u_dispersion;
uniform float u_edge;
uniform float u_liquid;
uniform float u_scale;
uniform float u_warmth;

vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ s += a * snoise(p); p *= 2.0; a *= 0.5; }
  return s;
}

// flowing height field at uv (rises upward over time)
float field(vec2 p, float t){
  vec2 flow = vec2(0.06 * sin(t * 0.7), -t);
  float h = fbm(p * u_scale + flow);
  float h2 = fbm(p * u_scale * 2.1 + vec2(t * 0.5, -t * 1.4));
  return h + u_liquid * 0.6 * h2;
}

// metallic ramp: dark base -> bright with a sharp anisotropic highlight
vec3 ramp(float h){
  float v = smoothstep(-1.2, 1.2, h);
  vec3 chrome = mix(vec3(0.04, 0.05, 0.07), vec3(0.95, 0.97, 1.0), v);
  chrome += smoothstep(0.74, 0.93, v) * 0.7;       // hot highlight band
  chrome += smoothstep(0.2, 0.0, v) * vec3(0.02);  // lift the shadows a touch
  return chrome;
}

void main(){
  vec2 uv = vUv;
  vec4 logo = texture(u_tex, uv);
  float a = logo.a;
  if(a < 0.001){ fragColor = vec4(0.0); return; }

  vec2 p = uv - 0.5;
  float t = u_time * 0.001 * u_speed * 6.0;

  float h = field(p, t);

  // gradient of the field -> refraction direction
  float e = 0.0025;
  float gx = field(p + vec2(e, 0.0), t) - field(p - vec2(e, 0.0), t);
  float gy = field(p + vec2(0.0, e), t) - field(p - vec2(0.0, e), t);
  float disp = u_dispersion * 30.0;

  // per-channel chromatic dispersion: shift the sampled height per channel
  float r = ramp(h + gx * disp).r;
  float g = ramp(h).g;
  float b = ramp(h - gx * disp).b;
  vec3 chrome = vec3(r, g, b);

  // warmth: push toward molten orange/gold + a heat glow on the highlights
  float hot = smoothstep(0.45, 1.1, h);
  vec3 warm = chrome * vec3(1.35, 0.62, 0.22) + vec3(0.45, 0.16, 0.0) * hot;
  vec3 color = mix(chrome, warm, u_warmth);

  // soft mask from the logo alpha
  float mask = smoothstep(0.0, u_edge, a);
  fragColor = vec4(color * mask, mask);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(sh) || 'shader compile failed');
  }
  return sh;
}

export class LiquidLogo {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private uni: Record<string, WebGLUniformLocation | null> = {};
  private raf = 0;
  private start = 0;
  private params: LiquidParams;
  private ready = false;
  private reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(canvas: HTMLCanvasElement, params: Partial<LiquidParams> = {}) {
    this.canvas = canvas;
    this.params = { ...DEFAULT_PARAMS, ...params };
    const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, antialias: true });
    if (!gl) throw new Error('WebGL2 not supported');
    this.gl = gl;

    this.program = gl.createProgram()!;
    gl.attachShader(this.program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(this.program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(this.program) || 'link failed');
    }
    gl.useProgram(this.program);

    // full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    for (const n of ['u_tex', 'u_time', 'u_speed', 'u_dispersion', 'u_edge', 'u_liquid', 'u_scale', 'u_warmth']) {
      this.uni[n] = gl.getUniformLocation(this.program, n);
    }
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // premultiplied
  }

  /** load the logo image as the shape texture, then start animating */
  async load(imageUrl: string, texSize = 600): Promise<void> {
    const img = await loadImage(imageUrl);
    // rasterise (handles SVG) into a square, contained + centred
    const off = document.createElement('canvas');
    off.width = off.height = texSize;
    const c = off.getContext('2d')!;
    const r = Math.min(texSize / img.width, texSize / img.height);
    const w = img.width * r, h = img.height * r;
    c.drawImage(img, (texSize - w) / 2, (texSize - h) / 2, w, h);

    const gl = this.gl;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off);
    gl.uniform1i(this.uni.u_tex, 0);

    this.ready = true;
    this.resize();
    if (this.reduced) this.renderFrame(0);
    else this.play();
  }

  resize() {
    const gl = this.gl;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
  }

  setParam<K extends keyof LiquidParams>(key: K, value: LiquidParams[K]) {
    this.params[key] = value;
    if (this.reduced && this.ready) this.renderFrame(performance.now() - this.start);
  }

  private renderFrame(elapsed: number) {
    const gl = this.gl;
    const p = this.params;
    gl.uniform1f(this.uni.u_time, elapsed);
    gl.uniform1f(this.uni.u_speed, p.speed);
    gl.uniform1f(this.uni.u_dispersion, p.dispersion);
    gl.uniform1f(this.uni.u_edge, p.edge);
    gl.uniform1f(this.uni.u_liquid, p.liquid);
    gl.uniform1f(this.uni.u_scale, p.scale);
    gl.uniform1f(this.uni.u_warmth, p.warmth);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  play() {
    if (this.reduced || this.raf) return;
    this.start = this.start || performance.now();
    const loop = (now: number) => {
      if (document.hidden) {
        this.raf = requestAnimationFrame(loop);
        return;
      }
      this.resize();
      this.renderFrame(now - this.start);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  pause() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
