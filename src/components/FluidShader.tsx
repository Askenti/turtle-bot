import { useEffect, useRef } from 'react';
import { TEAL_PALETTE, type ShaderPalette } from '../data/shader-palettes';

interface FluidShaderProps {
  className?: string;
  /** Palette of three colours. Defaults to the deep-teal hero palette. */
  palette?: ShaderPalette;
  /** Opacity multiplier for the streak/vein highlight (0..1). Defaults to 0.15. */
  streakOpacity?: number;
  /** Strength of the corner vignette (0..1). Defaults to 0.9. */
  vignetteStrength?: number;
  /** Solid CSS fallback when WebGL is unavailable. */
  fallbackBackground?: string;
}

/**
 * FluidShader — WebGL canvas rendering a flowing two-tone fluid with a
 * highlight "streak" colour drifting across it. Falls back to a CSS
 * gradient if WebGL is unavailable.
 *
 * The palette is driven by uniforms so the same engine renders both the
 * deep-teal hero background and the warm cream marble of beige sections.
 */
export default function FluidShader({
  className,
  palette = TEAL_PALETTE,
  streakOpacity = 0.15,
  vignetteStrength = 0.9,
  fallbackBackground = 'linear-gradient(160deg, #041e1e 0%, #062a2a 40%, #0a3333 70%, #041e1e 100%)',
}: FluidShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return;

    // ── Vertex shader ──────────────────────────────────────────────────────
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // ── Fragment shader ────────────────────────────────────────────────────
    // Flowing fBm-warped noise, blended between three palette colours.
    // Colours and intensities come in via uniforms so this same shader
    // serves both the teal hero and the beige marble panels.
    const fsSource = `
      precision highp float;

      uniform float u_time;
      uniform vec2  u_resolution;
      uniform vec3  u_deep;
      uniform vec3  u_mid;
      uniform vec3  u_streak;
      uniform float u_streakOpacity;
      uniform float u_vignette;

      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return fract(sin(p) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);

        float a = dot(hash2(i + vec2(0,0)), f - vec2(0,0));
        float b = dot(hash2(i + vec2(1,0)), f - vec2(1,0));
        float c = dot(hash2(i + vec2(0,1)), f - vec2(0,1));
        float d = dot(hash2(i + vec2(1,1)), f - vec2(1,1));

        return 0.5 + 0.5 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          v += amp * noise(p * freq);
          freq *= 2.07;
          amp  *= 0.48;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 st = uv * vec2(u_resolution.x / u_resolution.y, 1.0);

        float t = u_time * 0.055;

        vec2 q = vec2(fbm(st + vec2(0.0, 0.0)),
                      fbm(st + vec2(5.2, 1.3)));

        vec2 r = vec2(fbm(st + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t),
                      fbm(st + 4.0 * q + vec2(8.3, 2.8) + 0.126 * t));

        float f = fbm(st + 4.0 * r);

        // Base blend deep ↔ mid
        vec3 col = mix(u_deep, u_mid, clamp(f * f * 4.0, 0.0, 1.0));
        col = mix(col, u_mid * 1.4, clamp(f * 2.0, 0.0, 1.0));

        // Streak / vein highlight
        float streak1 = smoothstep(0.72, 0.78,
          sin(st.x * 2.8 - st.y * 1.2 + t * 1.3 + 0.0) * 0.5 + 0.5);
        float streak2 = smoothstep(0.74, 0.79,
          sin(st.x * 1.6 + st.y * 2.1 - t * 0.9 + 3.1) * 0.5 + 0.5);
        float streak3 = smoothstep(0.70, 0.76,
          sin(st.x * 3.5 - st.y * 0.8 + t * 1.7 + 1.6) * 0.5 + 0.5);

        float streakMix = (streak1 + streak2 * 0.6 + streak3 * 0.4) * u_streakOpacity;
        col = mix(col, u_streak, streakMix);

        // Vignette
        vec2 center = uv - 0.5;
        float vignette = 1.0 - dot(center, center) * u_vignette;
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // ── Uniform locations ──────────────────────────────────────────────────
    const uTime          = gl.getUniformLocation(prog, 'u_time');
    const uRes           = gl.getUniformLocation(prog, 'u_resolution');
    const uDeep          = gl.getUniformLocation(prog, 'u_deep');
    const uMid           = gl.getUniformLocation(prog, 'u_mid');
    const uStreak        = gl.getUniformLocation(prog, 'u_streak');
    const uStreakOpacity = gl.getUniformLocation(prog, 'u_streakOpacity');
    const uVignette      = gl.getUniformLocation(prog, 'u_vignette');

    // Palette + intensity uniforms are constant for the lifetime of this
    // instance — set them once outside the render loop.
    gl.uniform3f(uDeep,   ...palette.deep);
    gl.uniform3f(uMid,    ...palette.mid);
    gl.uniform3f(uStreak, ...palette.highlight);
    gl.uniform1f(uStreakOpacity, streakOpacity);
    gl.uniform1f(uVignette,      vignetteStrength);

    // ── DPR cap — mobile gets 1×, desktop up to 1.5× ──
    // Cuts mobile pixel cost by ~55% with no visible quality loss for fluid noise.
    const dprCap = window.innerWidth < 768 ? 1.0 : 1.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, dprCap);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Visibility-gated render loop ──
    // Pauses the WebGL render whenever the canvas leaves the viewport — the
    // single biggest perf win when 4 shaders coexist on one page. Rapid
    // scrolling no longer makes off-screen canvases burn the GPU.
    let isVisible = false;
    let isTabVisible = !document.hidden;
    const start = performance.now();

    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas.width, canvas.height);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (rafRef.current) return; // already running
      rafRef.current = requestAnimationFrame(render);
    };
    const stopLoop = () => {
      if (!rafRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };

    // Watch the canvas's viewport visibility
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isTabVisible) startLoop();
        else                            stopLoop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // Also pause when the browser tab is hidden — saves battery on idle tabs.
    const onTabVisibility = () => {
      isTabVisible = !document.hidden;
      if (isVisible && isTabVisible) startLoop();
      else                            stopLoop();
    };
    document.addEventListener('visibilitychange', onTabVisibility);

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onTabVisibility);
      gl!.deleteProgram(prog);
    };
    // Re-run when palette or intensity changes.
  }, [palette, streakOpacity, vignetteStrength]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ background: fallbackBackground }}
    />
  );
}
