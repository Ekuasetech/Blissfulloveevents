import { useEffect, useRef, useState } from "react";

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setY(window.scrollY)); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

export function Reveal({ as: Tag = "div", kind = "up", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`r r-${kind} ${on ? "in" : ""} ${className}`} style={{ "--d": `${delay}ms` }} {...rest}>{children}</Tag>;
}

export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1800;
      const tick = (t) => {
        const k = Math.min((t - t0) / dur, 1);
        setN(Math.round(to * (1 - Math.pow(1 - k, 4))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export function Tilt({ className = "", children }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const s = ref.current.style;
    s.setProperty("--mx", `${x * 100}%`); s.setProperty("--my", `${y * 100}%`);
    s.setProperty("--rx", `${(0.5 - y) * 8}deg`); s.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  };
  const leave = () => { const s = ref.current.style; s.setProperty("--rx", "0deg"); s.setProperty("--ry", "0deg"); };
  return <div ref={ref} className={`tilt ${className}`} onMouseMove={move} onMouseLeave={leave}>{children}</div>;
}

export function Magnetic({ children }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  return <span ref={ref} className="mag" onMouseMove={move} onMouseLeave={() => (ref.current.style.transform = "")}>{children}</span>;
}

/* Confetti burst on a full-screen canvas. Fires whenever `trigger` becomes truthy/changes. */
function burst(canvas, origins) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const ctx = canvas.getContext("2d"), dpr = window.devicePixelRatio || 1;
  const W = (canvas.width = canvas.clientWidth * dpr), H = (canvas.height = canvas.clientHeight * dpr);
  const colors = ["#c9a24d", "#e6c987", "#f4d6cb", "#6f8a64", "#ffffff"];
  const ps = origins.flatMap(([ox, oy]) => Array.from({ length: 80 }, () => ({
    x: W * ox, y: H * oy, vx: (Math.random() - 0.5) * 16 * dpr, vy: (-Math.random() * 14 - 4) * dpr,
    s: (5 + Math.random() * 7) * dpr, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
    c: colors[(Math.random() * colors.length) | 0], life: 1,
  })));
  let raf;
  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    let alive = 0;
    for (const p of ps) {
      p.vy += 0.35 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= 0.006;
      if (p.life > 0 && p.y < H + 30) {
        alive++;
        ctx.save(); ctx.globalAlpha = Math.max(p.life, 0); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
      }
    }
    if (alive) raf = requestAnimationFrame(tick); else ctx.clearRect(0, 0, W, H);
  };
  tick();
  return () => cancelAnimationFrame(raf);
}

export function Confetti({ trigger, origins = [[0.2, 0.55], [0.8, 0.55]] }) {
  const ref = useRef(null);
  useEffect(() => (trigger ? burst(ref.current, origins) : undefined), [trigger]);
  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}
