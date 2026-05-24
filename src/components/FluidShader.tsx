import { useEffect, useRef } from 'react';

/**
 * FluidShader — WebGL canvas rendering a deep-teal ocean surface with
 * slow-moving light-interference streaks. Falls back gracefully to a CSS
 * animated gradient if WebGL is unavailable.
 */
export default function FluidShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return; // CSS fallback handles it

    // ── Vertex shader ──────────────────────────────────────────────────────
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // ── Fragment shader ────────────────────────────────────────────────────
    // Simulates slow ocean-surface light diffusion with layered sin waves.
    // Three colour bands: deep teal base, mid teal swirl, cyan streak at ~15%.
    const fsSource = `
      precision highp float;

      uniform float u_time;
      uniform vec2  u_resolution;

      // ── Noise helpers ──────────────────────────────────────────────────
      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return fract(sin(p) * 43758.5453);
      }

      // Smooth value noise [0,1]
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

      // Fractal Brownian Motion — 4 octaves
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
        // Aspect-correct and centre the UVs
        vec2 st = uv * vec2(u_resolution.x / u_resolution.y, 1.0);

        float t = u_time * 0.055; // very slow drift

        // ── Base fluid warp ───────────────────────────────────────────────
        vec2 q = vec2(fbm(st + vec2(0.0, 0.0)),
                      fbm(st + vec2(5.2, 1.3)));

        vec2 r = vec2(fbm(st + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t),
                      fbm(st + 4.0 * q + vec2(8.3, 2.8) + 0.126 * t));

        float f = fbm(st + 4.0 * r);

        // ── Palette ───────────────────────────────────────────────────────
        // deep teal dark  #041e1e  → (0.016, 0.118, 0.118)
        // mid teal        #0a3333  → (0.039, 0.200, 0.200)
        // cyan streak     #00e5cc  → (0.000, 0.898, 0.800)
        vec3 deepTeal = vec3(0.016, 0.118, 0.118);
        vec3 midTeal  = vec3(0.039, 0.200, 0.200);
        vec3 cyanStreak = vec3(0.000, 0.898, 0.800);

        // Base colour from fluid warp
        vec3 col = mix(deepTeal, midTeal, clamp(f * f * 4.0, 0.0, 1.0));
        col = mix(col, midTeal * 1.4, clamp(f * 2.0, 0.0, 1.0));

        // ── Light streak (cyan at ≈15% opacity) ───────────────────────────
        // A slow diagonal wave of cyan light interference
        float streak1 = smoothstep(0.72, 0.78,
          sin(st.x * 2.8 - st.y * 1.2 + t * 1.3 + 0.0) * 0.5 + 0.5);
        float streak2 = smoothstep(0.74, 0.79,
          sin(st.x * 1.6 + st.y * 2.1 - t * 0.9 + 3.1) * 0.5 + 0.5);
        float streak3 = smoothstep(0.70, 0.76,
          sin(st.x * 3.5 - st.y * 0.8 + t * 1.7 + 1.6) * 0.5 + 0.5);

        float streakMix = (streak1 + streak2 * 0.6 + streak3 * 0.4) * 0.15;
        col = mix(col, cyanStreak, streakMix);

        // ── Subtle vignette ───────────────────────────────────────────────
        vec2 center = uv - 0.5;
        float vignette = 1.0 - dot(center, center) * 0.9;
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // ── Compile shaders ────────────────────────────────────────────────────
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

    // ── Full-screen quad ───────────────────────────────────────────────────
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

    // ── Uniforms ───────────────────────────────────────────────────────────
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes  = gl.getUniformLocation(prog, 'u_resolution');

    // ── Resize observer ────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * Math.min(window.devicePixelRatio, 1.5);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 1.5);
      gl!.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Render loop ────────────────────────────────────────────────────────
    let start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas.width, canvas.height);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl!.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        // CSS fallback — visible only when WebGL is unavailable (canvas stays transparent)
        background: 'linear-gradient(160deg, #041e1e 0%, #062a2a 40%, #0a3333 70%, #041e1e 100%)',
      }}
    />
  );
}
