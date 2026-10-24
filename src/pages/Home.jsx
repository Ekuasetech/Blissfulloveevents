import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../Art.jsx";
import { Confetti, Counter, Magnetic, Reveal, Tilt, useScrollY } from "../hooks.jsx";
import { headline, photos, projects, services, stats, steps, ticker, voices } from "../data.js";
import { ProjectCard } from "./Work.jsx";

const sparks = [[8, 22, 14, 0], [46, 12, 10, 0.8], [90, 30, 16, 1.4], [70, 70, 10, 0.4], [20, 78, 12, 1.9], [55, 88, 9, 1.1]];

function Hero() {
  const y = useScrollY();
  const [fire, setFire] = useState(0);
  useEffect(() => { const t = setTimeout(() => setFire(1), 1100); return () => clearTimeout(t); }, []);
  return (
    <section className="hero">
      <Confetti trigger={fire} />
      <div className="sparks" aria-hidden="true">
        {sparks.map(([l, t, s, d], i) => <span key={i} style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, animationDelay: `${d}s` }} />)}
      </div>
      <div className="wrap hero-grid">
        <div>
          <h1 aria-label="Celebrations with the warmth of home.">
            {headline.map((w, i) => <span key={i} className="w" aria-hidden="true"><span style={{ "--i": i }}>{w}&nbsp;</span></span>)}
          </h1>
          <p className="lead">From Nigerian weddings and birthday owambes to graduation parties and community conferences, we plan celebrations in London, Ontario where every guest feels welcome, whichever home they come from.</p>
          <div className="row hero-cta">
            <Magnetic><Link className="btn" to="/contact">Plan your celebration</Link></Magnetic>
            <Link className="btn ghost" to="/work">See our work</Link>
          </div>
        </div>
        <div className="hero-art" style={{ transform: `translateY(${Math.min(y, 600) * -0.06}px)` }}>
          <div className="hero-img"><Photo src={photos.hero} kind="celebration" alt="Nigerian and Canadian guests celebrating together" /></div>
          <button className="badge b1" onClick={() => setFire((n) => n + 1)} aria-label="Celebrate"><strong>Celebrate!</strong><span>tap for confetti</span></button>
          <div className="badge b2"><strong>London, ON</strong><span>serving Southwestern Ontario</span></div>
        </div>
      </div>
      <div className="tick" aria-hidden="true">
        <div className="tick-in">{[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="sec">
      <div className="wrap split">
        <Reveal kind="left" className="about-img"><Photo src={photos.about} kind="wedding" alt="A wedding arch for two families" /></Reveal>
        <div className="stack">
          <Reveal as="h2">Two cultures. One unforgettable room.</Reveal>
          <Reveal as="p" delay={100}>Whether you’re a Nigerian family celebrating far from home, a newcomer building new traditions in Canada, or a Canadian friend marrying into a Nigerian family, we plan celebrations that carry both worlds: jollof and charcuterie, live highlife and a DJ, aso-ebi and black tie.</Reveal>
          <Reveal as="p" delay={200}>We handle venues, vendors, décor, programme and guest flow across London, Ontario and nearby cities, so you can be a guest at your own celebration.</Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="sec tint">
      <div className="wrap">
        <Reveal as="h2" className="head">What we plan</Reveal>
        <ul className="grid3">
          {services.map(([t, d], i) => (
            <Reveal as="li" key={t} kind="scale" delay={i * 80}><Tilt className="card"><h3>{t}</h3><p>{d}</p></Tilt></Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const r = ref.current.getBoundingClientRect();
      setP(Math.max(0, Math.min(1, (window.innerHeight * 0.65 - r.top) / r.height)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section id="process" className="sec dark">
      <div className="wrap">
        <Reveal as="h2" className="head">How a celebration comes together</Reveal>
        <ol className="steps" ref={ref}>
          <div className="line"><div style={{ height: `${p * 100}%` }} /></div>
          {steps.map(([t, d], i) => (
            <li key={t} className={p * steps.length > i + 0.2 ? "on" : ""}><span className="dot">{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stats() {
  const ref = useRef(null);
  const [off, setOff] = useState(0);
  const y = useScrollY();
  useEffect(() => {
    const r = ref.current.getBoundingClientRect();
    setOff((r.top + r.height / 2 - window.innerHeight / 2) * -0.15);
  }, [y]);
  return (
    <section className="para" ref={ref}>
      <Photo src={photos.wide} kind="celebration" className="para-bg" alt="" />
      <div className="para-in wrap" style={{ transform: `translateY(${off * 0.3}px)` }}>
        <ul className="stats">
          {stats.map(([n, s, l], i) => (
            <Reveal as="li" key={l} delay={i * 100}><strong><Counter to={n} suffix={s} /></strong><span>{l}</span></Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkPreview() {
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <Reveal as="h2" className="head">Celebrations we’ve planned</Reveal>
        <ul className="work">{projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}</ul>
        <Reveal className="more"><Link className="btn ghost" to="/work">See all our work</Link></Reveal>
      </div>
    </section>
  );
}

function Voices() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % voices.length), 6000); return () => clearInterval(t); }, []);
  return (
    <section id="voices" className="sec tint">
      <div className="wrap voices">
        <Reveal as="h2">What clients say</Reveal>
        <div className="q-wrap">
          {voices.map(([q, who, org], k) => (
            <blockquote key={k} className={k === i ? "on" : ""} aria-hidden={k !== i}><p>“{q}”</p><footer>{who}<span>{org}</span></footer></blockquote>
          ))}
        </div>
        <div className="dots">{voices.map((_, k) => <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} />)}</div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="sec cta">
      <div className="wrap">
        <Reveal as="h2">Planning a celebration?</Reveal>
        <Reveal as="p" delay={100}>You don’t need everything figured out. Tell us what you have in mind and we’ll help with what comes next.</Reveal>
        <Reveal delay={200}><Magnetic><Link className="btn" to="/contact">Plan your celebration</Link></Magnetic></Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return <><Hero /><About /><Services /><Process /><Stats /><WorkPreview /><Voices /><CTA /></>;
}
