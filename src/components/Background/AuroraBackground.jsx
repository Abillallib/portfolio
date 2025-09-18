import { useEffect, useRef } from 'react';

// Noise-driven aurora using a fixed full-viewport canvas.
// - Darker navy palette with faint indigo/purple tint
// - Two tiled noise layers moving in different directions/speeds
// - Uses 'screen' blending over your root purple gradient
// - Respects prefers-reduced-motion
export default function AuroraBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // --- Noise generation (precompute to an offscreen canvas) ---
    const NOISE_SIZE = 512; // tile size
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = NOISE_SIZE;
    noiseCanvas.height = NOISE_SIZE;
    const nctx = noiseCanvas.getContext('2d');

    // Simple value noise with 4 octaves (fast enough, good for background)
    const noise = new Float32Array(NOISE_SIZE * NOISE_SIZE);
    const rnd = (x, y, seed) => {
      // hash-based pseudo-random (deterministic)
      const s = Math.sin(x * 127.1 + y * 311.7 + seed * 101.3) * 43758.5453;
      return s - Math.floor(s);
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (t) => t * t * (3 - 2 * t);
    function valueNoise2D(x, y, seed) {
      const x0 = Math.floor(x);
      const y0 = Math.floor(y);
      const x1 = x0 + 1;
      const y1 = y0 + 1;
      const sx = smooth(x - x0);
      const sy = smooth(y - y0);
      const n00 = rnd(x0, y0, seed);
      const n10 = rnd(x1, y0, seed);
      const n01 = rnd(x0, y1, seed);
      const n11 = rnd(x1, y1, seed);
      const ix0 = lerp(n00, n10, sx);
      const ix1 = lerp(n01, n11, sx);
      return lerp(ix0, ix1, sy);
    }

    const fbm = (x, y) => {
      // fractal brownian motion: sum of octaves
      let total = 0;
      let amp = 1;
      let freq = 1 / 128; // coarser base frequency (larger features)
      const SEED = 42;
      for (let i = 0; i < 4; i++) {
        total += valueNoise2D(x * freq, y * freq, SEED + i * 19.19) * amp;
        amp *= 0.5;
        freq *= 2.0;
      }
      return total / 1.875; // normalize roughly to 0..1
    };

    const imgData = nctx.createImageData(NOISE_SIZE, NOISE_SIZE);
    for (let y = 0; y < NOISE_SIZE; y++) {
      for (let x = 0; x < NOISE_SIZE; x++) {
        const i = (y * NOISE_SIZE + x) * 4;
        const v = fbm(x, y); // 0..1
        // Map to brightness; slightly brighter gamma so highlights pop
        const brightness = Math.pow(v, 1.3);
        const gray = Math.floor(brightness * 255);
        imgData.data[i] = gray;
        imgData.data[i + 1] = gray;
        imgData.data[i + 2] = gray;
        imgData.data[i + 3] = 255; // opaque, we control alpha later
      }
    }
    nctx.putImageData(imgData, 0, 0);

    // Three layers with different tints, speeds, scales, and rotation for parallax
    const layers = [
      {
        // coarse darker navy base (slightly lighter for visibility)
        tint: 'rgb(16, 32, 72)',
        alpha: 0.6,
        speedX: 0.56,
        speedY: -0.36,
        rotationSpeed: 0.0018,
        angle: 0,
        scale: 1.2,
        offsetX: 0,
        offsetY: 0,
      },
      {
        // medium navy-indigo layer
        tint: 'rgb(36, 28, 96)',
        alpha: 0.5,
        speedX: -0.44,
        speedY: 0.52,
        rotationSpeed: -0.0012,
        angle: 0,
        scale: 1.0,
        offsetX: NOISE_SIZE / 2,
        offsetY: NOISE_SIZE / 3,
      },
      {
        // fine detail layer (very subtle, adds texture without overpowering)
        tint: 'rgb(22, 44, 96)',
        alpha: 0.25,
        speedX: 0.9,
        speedY: 0.6,
        rotationSpeed: 0.0025,
        angle: 0,
        scale: 0.55,
        offsetX: NOISE_SIZE / 4,
        offsetY: NOISE_SIZE / 5,
      },
    ];

    const speedScale = prefersReduced ? 0 : 1; // pause if reduced motion

    const drawLayer = (layer) => {
      // draw grayscale noise tiled, with rotation and scaling, then colorize via source-in tint
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = layer.alpha;

      // Apply rotation around the viewport center
      const cx = width / 2;
      const cy = height / 2;
      ctx.translate(cx, cy);
      ctx.rotate(layer.angle);
      ctx.translate(-cx, -cy);

      const tileSize = NOISE_SIZE * layer.scale;
      const startX = -((layer.offsetX % tileSize) + tileSize) % tileSize;
      const startY = -((layer.offsetY % tileSize) + tileSize) % tileSize;
      for (let y = startY; y < height; y += tileSize) {
        for (let x = startX; x < width; x += tileSize) {
          // Draw grayscale tile scaled
          ctx.drawImage(noiseCanvas, x, y, tileSize, tileSize);
          // Colorize the drawn patch
          ctx.globalCompositeOperation = 'source-in';
          ctx.fillStyle = layer.tint;
          ctx.fillRect(x, y, tileSize, tileSize);
          // Back to screen for next tile
          ctx.globalCompositeOperation = 'screen';
        }
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const layer of layers) drawLayer(layer);
    };

    const step = () => {
      for (const layer of layers) {
        layer.offsetX += layer.speedX * speedScale;
        layer.offsetY += layer.speedY * speedScale;
        layer.angle += layer.rotationSpeed * speedScale;
      }
      draw();
      animationRef.current = requestAnimationFrame(step);
    };

    draw();
    if (!prefersReduced) animationRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
