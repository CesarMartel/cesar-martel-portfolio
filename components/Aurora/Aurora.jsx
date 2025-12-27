"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import "./Aurora.css";

const VERT = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
varying vec2 vUv;

// Simplex noise function
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec3 color = vec3(0.0);
    float time = uTime * 0.5;
    vec2 uv = vUv;
    
    // Create aurora waves
    for(float i = 0.0; i < 3.0; i++) {
        float noiseVal = snoise(vec2(uv.x * 2.0 + time * 0.2 + i, uv.y * 1.5 - time * 0.1));
        float intensity = smoothstep(0.4, 0.6, noiseVal * 0.5 + 0.5);
        
        // Vertical fade
        float vFade = smoothstep(0.0, 0.4, uv.y) * smoothstep(1.0, 0.6, uv.y);
        
        // Select color
        vec3 c;
        if (i < 0.5) c = uColor1;
        else if (i < 1.5) c = uColor2;
        else c = uColor3;
        
        // Add movement
        float wave = sin(uv.x * 5.0 + time + i * 2.0) * 0.5 + 0.5;
        
        color += c * intensity * vFade * uAmplitude * (0.5 + 0.5 * wave);
    }
    
    // Background glow
    color += uColor1 * 0.1 * (1.0 - vUv.y);

    gl_FragColor = vec4(color, 1.0);
}
`;

export default function Aurora({
  colorStops = ["#3A29FF", "#7CFF67", "#FF94B4"],
  amplitude = 1.0,
  speed = 0.5,
}) {
  const ctnDom = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!ctnDom.current) return;
    
    const container = ctnDom.current;
    
    // 1. Renderer
    const renderer = new Renderer({ 
        alpha: true,
        premultipliedAlpha: false,
        dpr: Math.min(window.devicePixelRatio, 2)
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    
    // Append canvas
    container.appendChild(gl.canvas);

    // 2. Geometry
    const geometry = new Triangle(gl);

    // 3. Colors
    const safeColors = [...colorStops];
    while (safeColors.length < 3) safeColors.push(safeColors[0]);
    
    const c1 = new Color(safeColors[0]);
    const c2 = new Color(safeColors[1]);
    const c3 = new Color(safeColors[2]);

    // 4. Program
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uColor3: { value: c3 },
      },
    });

    // 5. Mesh
    const mesh = new Mesh(gl, { geometry, program });

    // 6. Resize
    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", resize);
    resize();

    // Mouse Interaction
    function handleMouseMove(e) {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        targetMouseRef.current = { x, y };
    }
    window.addEventListener("mousemove", handleMouseMove);

    // 7. Loop
    let lastTime = performance.now();
    let time = 0;

    function update(t) {
      animationRef.current = requestAnimationFrame(update);
      const dt = (t - lastTime) * 0.001;
      lastTime = t;
      
      time += dt * speed;
      program.uniforms.uTime.value = time;
      
      // Parallax effect using transform
      // Smooth interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      if (gl.canvas) {
        gl.canvas.style.transform = `translate(${mouseRef.current.x * -20}px, ${mouseRef.current.y * -20}px) scale(1.05)`;
      }

      renderer.render({ scene: mesh });
    }
    animationRef.current = requestAnimationFrame(update);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (container && gl.canvas) {
        container.removeChild(gl.canvas);
      }
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  }, [colorStops, amplitude, speed]);

  return <div ref={ctnDom} className="aurora-container" />;
}
