"use client";

import { useEffect, useRef, useState } from "react";
import { usePlanetTheme } from "@/components/providers/PlanetThemeProvider";

function hexToRgb(hex: string) {
  const safe = hex.replace("#", "");
  const normalized = safe.length === 3
    ? safe.split("").map(char => char + char).join("")
    : safe;

  const value = Number.parseInt(normalized, 16);
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ] as [number, number, number];
}

export default function GalaxyBackground() {
  const { planet } = usePlanetTheme();
  const webglRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const paletteTargetRef = useRef({
    a: hexToRgb(planet.palette.nebulaA),
    b: hexToRgb(planet.palette.nebulaB),
    c: hexToRgb(planet.palette.nebulaC),
    accent: planet.palette.primary,
  });
  const paletteCurrentRef = useRef({
    a: hexToRgb(planet.palette.nebulaA),
    b: hexToRgb(planet.palette.nebulaB),
    c: hexToRgb(planet.palette.nebulaC),
    accent: planet.palette.primary,
  });
  const [coords, setCoords] = useState("X: 000.00  Y: 000.00");

  useEffect(() => {
    paletteTargetRef.current = {
      a: hexToRgb(planet.palette.nebulaA),
      b: hexToRgb(planet.palette.nebulaB),
      c: hexToRgb(planet.palette.nebulaC),
      accent: planet.palette.primary,
    };
  }, [planet]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
      const x = ((event.clientX / window.innerWidth) * 100).toFixed(2);
      const y = ((event.clientY / window.innerHeight) * 100).toFixed(2);
      setCoords(`X: ${x.padStart(6, " ")}  Y: ${y.padStart(6, " ")}`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;

    type Star = { x: number; y: number; size: number; opacity: number; speed: number; offset: number };
    let stars: Star[] = [];

    const createStars = () => {
      const count = Math.floor((width * height) / 18000);
      stars = [
        { x: width * 0.12, y: height * 0.09, size: 22, opacity: 0.75, speed: 0.018, offset: 0.2 },
        { x: width * 0.34, y: height * 0.07, size: 36, opacity: 0.95, speed: 0.016, offset: 0.8 },
        { x: width * 0.53, y: height * 0.19, size: 28, opacity: 0.85, speed: 0.018, offset: 1.1 },
        { x: width * 0.76, y: height * 0.27, size: 18, opacity: 0.65, speed: 0.014, offset: 1.5 },
        { x: width * 0.91, y: height * 0.32, size: 22, opacity: 0.75, speed: 0.012, offset: 2.4 },
      ];

      for (let i = 0; i < count; i += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 7 + 2,
          opacity: Math.random() * 0.28 + 0.08,
          speed: Math.random() * 0.012 + 0.004,
          offset: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createStars();
    };

    const drawStar = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = paletteCurrentRef.current.accent;
      ctx.beginPath();
      ctx.rect(-size, -0.5, size * 2, 1);
      ctx.rect(-0.5, -size, 1, size * 2);
      ctx.rect(-1.5, -1.5, 3, 3);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(2, 0);
      ctx.lineTo(0, 2);
      ctx.lineTo(-2, 0);
      ctx.fillStyle = `rgba(255,255,255,${Math.min(1, opacity * 1.45)})`;
      ctx.fill();
      ctx.restore();
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const mouseX = (mousePosRef.current.x - width / 2) * 0.012;
      const mouseY = (mousePosRef.current.y - height / 2) * 0.012;

      for (const star of stars) {
        const opacity = star.opacity + Math.sin(time * star.speed * 0.001 + star.offset) * star.opacity * 0.45;
        drawStar(
          star.x - mouseX * (star.size / 12),
          star.y - mouseY * (star.size / 12),
          star.size,
          Math.max(0, opacity),
        );
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const canvas = webglRef.current;
    if (!canvas) return;

    const gl = (
      canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl")
    ) as WebGLRenderingContext | null;

    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec3 u_color_a;
      uniform vec3 u_color_b;
      uniform vec3 u_color_c;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p = rot * p * 2.0 + 100.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        vec2 mouse = (u_mouse / u_resolution - 0.5) * 0.45;
        p += mouse;

        float t = u_time * 0.045;
        float q = fbm(p * 2.1 + vec2(t, t * 0.45));
        float r = fbm(p * 3.0 + vec2(-t, t * 0.9) + q * 2.1);
        float nebulaMask = smoothstep(0.18, 0.82, r);

        vec3 color = mix(u_color_a, u_color_b, q);
        color = mix(color, u_color_c, r * r);
        color *= smoothstep(2.5, 0.45, length(p));

        float starDust = step(0.995, hash(p * 95.0));
        color += vec3(starDust) * 0.42 * r;

        gl_FragColor = vec4(color * nebulaMask + u_color_a * 0.25, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const colorALocation = gl.getUniformLocation(program, "u_color_a");
    const colorBLocation = gl.getUniformLocation(program, "u_color_b");
    const colorCLocation = gl.getUniformLocation(program, "u_color_c");

    let smoothMouseX = window.innerWidth / 2;
    let smoothMouseY = window.innerHeight / 2;
    let rafId = 0;

    const render = (time: number) => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      const target = paletteTargetRef.current;
      const current = paletteCurrentRef.current;

      current.a = current.a.map((value, index) => value + (target.a[index] - value) * 0.035) as [number, number, number];
      current.b = current.b.map((value, index) => value + (target.b[index] - value) * 0.035) as [number, number, number];
      current.c = current.c.map((value, index) => value + (target.c[index] - value) * 0.035) as [number, number, number];
      current.accent = target.accent;

      const { x, y } = mousePosRef.current;
      smoothMouseX += (x - smoothMouseX) * 0.05;
      smoothMouseY += (window.innerHeight - y - smoothMouseY) * 0.05;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(mouseLocation, smoothMouseX, smoothMouseY);
      gl.uniform3f(colorALocation, current.a[0], current.a[1], current.a[2]);
      gl.uniform3f(colorBLocation, current.b[0], current.b[1], current.b[2]);
      gl.uniform3f(colorCLocation, current.c[0], current.c[1], current.c[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = requestAnimationFrame(render);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    rafId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <canvas ref={webglRef} style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: -2, pointerEvents: "none" }} />
      <canvas ref={starsRef} style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none" }} />

      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.09) 50%)", backgroundSize: "100% 4px", zIndex: 0, pointerEvents: "none", opacity: 0.45 }} />
      <div className="hidden lg:block" style={{ position: "fixed", top: 90, left: 0, right: 0, height: 1, background: "var(--frame)", zIndex: 1, pointerEvents: "none" }} />
      <div className="hidden lg:block" style={{ position: "fixed", bottom: 60, left: 0, right: 0, height: 1, background: "var(--frame)", zIndex: 1, pointerEvents: "none" }} />
      <div className="hidden lg:block" style={{ position: "fixed", left: 40, top: 0, bottom: 0, width: 1, background: "var(--frame)", zIndex: 1, pointerEvents: "none" }} />
      <div className="hidden lg:block" style={{ position: "fixed", right: 40, top: 0, bottom: 0, width: 1, background: "var(--frame)", zIndex: 1, pointerEvents: "none" }} />

      <div className="hidden lg:block" style={{ position: "fixed", bottom: 18, right: 58, textAlign: "right", zIndex: 10, pointerEvents: "none" }}>
        <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.42)", textTransform: "uppercase", marginBottom: 3 }}>
          Cursor Pos
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "var(--primary)", letterSpacing: "0.06em" }}>{coords}</div>
      </div>
    </>
  );
}
