import React, { useEffect, useRef } from 'react';

interface FluidShaderCanvasProps {
  className?: string;
  color1?: string; // Deep void obsidian: 'rgb(10, 14, 26)'
  color2?: string; // Capital & Code Electric Royal Blue: 'rgb(28, 43, 255)'
  color3?: string; // Silk highlight: 'rgb(255, 255, 255)'
  speed?: number;
  scale?: number;
  swirl?: number;
  swirlIterations?: number;
  distortion?: number;
  shapeScale?: number;
  softness?: number;
  proportion?: number;
  grainOpacity?: number;
}

function parseColor(str: string, fallback: [number, number, number, number] = [0, 0, 0, 1]): [number, number, number, number] {
  if (!str) return fallback;
  const s = str.trim();
  if (s.startsWith('#')) {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length === 6) hex += 'ff';
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
      parseInt(hex.slice(6, 8), 16) / 255,
    ];
  }
  const rgbMatch = s.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\s*\)/i);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10) / 255,
      parseInt(rgbMatch[2], 10) / 255,
      parseInt(rgbMatch[3], 10) / 255,
      rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1.0,
    ];
  }
  return fallback;
}

export const FluidShaderCanvas: React.FC<FluidShaderCanvasProps> = ({
  className = 'w-full h-full',
  color1 = 'rgb(10, 14, 26)',
  color2 = 'rgb(28, 43, 255)',
  color3 = 'rgb(255, 255, 255)',
  speed = 0.53,
  scale = 0.45,
  swirl = 0.35,
  swirlIterations = 10,
  distortion = 0.0,
  shapeScale = 0.10,
  softness = 1.0,
  proportion = 0.28,
  grainOpacity = 0.10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });

    if (!gl) return;

    // Fullscreen quad
    const vsSource = `#version 300 es
    in vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }`;

    // Authentic Capital & Code GLSL Fluid Wave Shader with In-Shader Instant Grain
    const fsSource = `#version 300 es
    precision highp float;

    uniform float u_time;
    uniform float u_pixelRatio;
    uniform vec2 u_resolution;

    uniform float u_scale;
    uniform float u_rotation;
    uniform vec4 u_color1;
    uniform vec4 u_color2;
    uniform vec4 u_color3;
    uniform float u_proportion;
    uniform float u_softness;
    uniform float u_shape;
    uniform float u_shapeScale;
    uniform float u_distortion;
    uniform float u_swirl;
    uniform float u_swirlIterations;
    uniform float u_grain;

    out vec4 fragColor;

    #define TWO_PI 6.28318530718
    #define PI 3.14159265358979323846

    vec2 rotate(vec2 uv, float th) {
      return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      float x1 = mix(a, b, u.x);
      float x2 = mix(c, d, u.x);
      return mix(x1, x2, u.y);
    }

    vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
      vec3 col1 = c1.rgb * c1.a;
      vec3 col2 = c2.rgb * c2.a;
      vec3 col3 = c3.rgb * c3.a;

      float r1 = smoothstep(0.0 + 0.35 * edgesWidth, 0.7 - 0.35 * edgesWidth + 0.5 * edge_blur, mixer);
      float r2 = smoothstep(0.3 + 0.35 * edgesWidth, 1.0 - 0.35 * edgesWidth + edge_blur, mixer);

      vec3 blended_color_2 = mix(col1, col2, r1);
      float blended_opacity_2 = mix(c1.a, c2.a, r1);

      vec3 c = mix(blended_color_2, col3, r2);
      float o = mix(blended_opacity_2, c3.a, r2);
      return vec4(c, o);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;

      float t = 0.5 * u_time;
      float noise_scale = 0.0005 + 0.006 * u_scale;

      uv -= 0.5;
      uv *= (noise_scale * u_resolution);
      uv = rotate(uv, u_rotation * 0.5 * PI);
      uv /= u_pixelRatio;
      uv += 0.5;

      float n1 = noise(uv * 1.0 + t);
      float n2 = noise(uv * 2.0 - t);
      float angle = n1 * TWO_PI;
      uv.x += 4.0 * u_distortion * n2 * cos(angle);
      uv.y += 4.0 * u_distortion * n2 * sin(angle);

      float iterations_number = ceil(clamp(u_swirlIterations, 1.0, 20.0));
      for (float i = 1.0; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0.0, 2.0) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0.0, 2.0) / i * cos(t + i * 1.0 * uv.x);
      }

      float proportion = clamp(u_proportion, 0.0, 1.0);
      float shape = 0.0;
      float mixer = 0.0;

      if (u_shape < 0.5) {
        vec2 checks_shape_uv = uv * (0.5 + 3.5 * u_shapeScale);
        shape = 0.5 + 0.5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
        mixer = shape + 0.48 * sign(proportion - 0.5) * pow(abs(proportion - 0.5), 0.5);
      } else if (u_shape < 1.5) {
        vec2 stripes_shape_uv = uv * (0.25 + 3.0 * u_shapeScale);
        float f = fract(stripes_shape_uv.y);
        shape = smoothstep(0.0, 0.55, f) * smoothstep(1.0, 0.45, f);
        mixer = shape + 0.48 * sign(proportion - 0.5) * pow(abs(proportion - 0.5), 0.5);
      } else {
        float sh = 1.0 - uv.y;
        sh -= 0.5;
        sh /= (noise_scale * u_resolution.y);
        sh += 0.5;
        float shape_scaling = 0.2 * (1.0 - u_shapeScale);
        shape = smoothstep(0.45 - shape_scaling, 0.55 + shape_scaling, sh + 0.3 * (proportion - 0.5));
        mixer = shape;
      }

      vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1.0 - clamp(u_softness, 0.0, 1.0), 0.01 + 0.01 * u_scale);

      // Subtle, velvety organic micro-texture that preserves razor-sharp text clarity
      if (u_grain > 0.001) {
        float g = (random(gl_FragCoord.xy) - 0.5) * u_grain;
        color_mix.rgb += g;
      }

      fragColor = vec4(color_mix.rgb, color_mix.a);
    }`;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([
      -1, -1,
       3, -1,
      -1,  3,
    ]);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uPixelRatio = gl.getUniformLocation(program, 'u_pixelRatio');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uScale = gl.getUniformLocation(program, 'u_scale');
    const uRotation = gl.getUniformLocation(program, 'u_rotation');
    const uColor1 = gl.getUniformLocation(program, 'u_color1');
    const uColor2 = gl.getUniformLocation(program, 'u_color2');
    const uColor3 = gl.getUniformLocation(program, 'u_color3');
    const uProportion = gl.getUniformLocation(program, 'u_proportion');
    const uSoftness = gl.getUniformLocation(program, 'u_softness');
    const uShape = gl.getUniformLocation(program, 'u_shape');
    const uShapeScale = gl.getUniformLocation(program, 'u_shapeScale');
    const uDistortion = gl.getUniformLocation(program, 'u_distortion');
    const uSwirl = gl.getUniformLocation(program, 'u_swirl');
    const uSwirlIterations = gl.getUniformLocation(program, 'u_swirlIterations');
    const uGrain = gl.getUniformLocation(program, 'u_grain');

    const c1 = parseColor(color1, [10 / 255, 14 / 255, 26 / 255, 1.0]);
    const c2 = parseColor(color2, [28 / 255, 43 / 255, 255 / 255, 1.0]);
    const c3 = parseColor(color3, [1.0, 1.0, 1.0, 1.0]);

    // Pre-bind static uniforms once to eliminate repetitive per-frame driver overhead
    gl.uniform1f(uScale, scale);
    gl.uniform1f(uRotation, 0.0);
    gl.uniform4f(uColor1, c1[0], c1[1], c1[2], c1[3]);
    gl.uniform4f(uColor2, c2[0], c2[1], c2[2], c2[3]);
    gl.uniform4f(uColor3, c3[0], c3[1], c3[2], c3[3]);
    gl.uniform1f(uProportion, proportion);
    gl.uniform1f(uSoftness, softness);
    gl.uniform1f(uShape, 0.0);
    gl.uniform1f(uShapeScale, shapeScale);
    gl.uniform1f(uDistortion, distortion);
    gl.uniform1f(uSwirl, swirl);
    gl.uniform1f(uSwirlIterations, swirlIterations);
    gl.uniform1f(uGrain, grainOpacity);

    let animationFrameId: number;
    let currentDpr = 1;
    let isVisible = true;

    const handleResize = () => {
      if (!canvas) return;
      // Full crystal-clear native sharpness without blurriness
      currentDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(canvas.clientWidth * currentDpr);
      const height = Math.floor(canvas.clientHeight * currentDpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.uniform1f(uPixelRatio, currentDpr);
        gl.uniform2f(uResolution, width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver: pauses rendering when scrolled out of view to save battery and keep scrolling silky smooth
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        const rect = canvas.getBoundingClientRect();
        isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility, { passive: true });

    let lastNow = performance.now();
    let totalTime = 0;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) {
        lastNow = now;
        return;
      }

      // Smooth delta time accumulation for buttery smooth V-Sync playback without micro-stutters
      const dt = Math.min((now - lastNow) * 0.001, 0.05);
      lastNow = now;
      totalTime += dt * (speed * 0.5);

      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform1f(uTime, totalTime);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(vbo);
        gl.deleteVertexArray(vao);
      }
    };
  }, [color1, color2, color3, speed, scale, swirl, swirlIterations, distortion, shapeScale, softness, proportion, grainOpacity]);

  return (
    <div className={`relative overflow-hidden pointer-events-none ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
      />
    </div>
  );
};
