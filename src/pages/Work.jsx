import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Photo } from "../Art.jsx";
import { Counter, Magnetic, Reveal, Tilt, useScrollY } from "../hooks.jsx";
import { categories, projects } from "../data.js";
import { CTA } from "./Home.jsx";

export function ProjectCard({ p, i = 0, plain = false }) {
  const inner = (
    <Link to={`/work/${p.slug}`} className="proj">
      <div className="frame">
        <Photo src={p.photo} kind={p.kind} alt={p.title} variant={i % 2 ? 1 : 0} />
        <em className="pill">View event</em>
      </div>
      <span>{p.cat} · {p.place}</span>
      <h3>{p.title}<b aria-hidden="true">→</b></h3>
    </Link>
  );
  return plain ? <li className="pop" style={{ animationDelay: `${(i % 6) * 70}ms` }}>{inner}</li> : <Reveal as="li" delay={(i % 3) * 100}>{inner}</Reveal>;
}

export function WorkIndex() {
  const [cat, setCat] = useState("All");
  const list = projects.filter((p) => cat === "All" || p.cat === cat);
  return (
    <>
      <section className="chero">
        <div className="wrap">
          <Reveal as="h1">Celebrations we’ve planned.</Reveal>
          <Reveal as="p" delay={120}>Weddings, birthdays, graduations and conferences for Nigerian families, Canadian friends and everyone celebrating together in Southwestern Ontario.</Reveal>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: "2rem" }}>
        <div className="wrap">
          <div className="chips filters">
            {categories.map((c) => <button key={c} className={c === cat ? "on" : ""} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <ul className="work" key={cat}>{list.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} plain />)}</ul>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function WorkDetail({ NotFound }) {
  const { slug } = useParams();
  const y = useScrollY();
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx < 0) return <NotFound />;
  const p = projects[idx], n = projects.length;
  const prev = projects[(idx + n - 1) % n], next = projects[(idx + 1) % n];
  const facts = [[<Counter to={p.guests} />, "Guests"], [p.duration, "Duration"], [p.venue, "Venue"], [p.planning, "Planning time"]];
  return (
    <>
      <section className="dhero">
        <div className="wrap dgrid">
          <div className="stack">
            <Link to="/work" className="back">← All events</Link>
            <span className="chip">{p.cat}</span>
            <h1 aria-label={p.title}>
              {p.title.split(" ").map((w, i) => <span key={i} className="w" aria-hidden="true"><span style={{ "--i": i }}>{w}&nbsp;</span></span>)}
            </h1>
            <p className="where">{p.place}</p>
            <p className="lead2">{p.summary}</p>
            <Magnetic><Link className="btn" to="/contact">Plan something like this</Link></Magnetic>
          </div>
          <div className="dart" style={{ transform: `translateY(${Math.min(y, 500) * -0.05}px)` }}>
            <Photo src={p.photo} kind={p.kind} alt={p.title} />
          </div>
        </div>
      </section>

      <section className="para facts">
        <div className="wrap">
          <ul className="stats">
            {facts.map(([v, l], i) => <Reveal as="li" key={l} delay={i * 90}><strong className="fact">{v}</strong><span>{l}</span></Reveal>)}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split top">
          <div className="stack">
            <Reveal as="h2">The brief</Reveal>
            <Reveal as="p" delay={100}>{p.brief}</Reveal>
          </div>
          <div className="stack">
            <Reveal as="h2">What we handled</Reveal>
            <ul className="ticks">
              {p.did.map((d, i) => <Reveal as="li" key={d} kind="right" delay={i * 80}>{d}</Reveal>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <Reveal as="h2" className="head">Details that made it theirs</Reveal>
          <ul className="grid3">
            {p.touches.map(([t, d], i) => <Reveal as="li" key={t} kind="scale" delay={i * 100}><Tilt className="card"><h3>{t}</h3><p>{d}</p></Tilt></Reveal>)}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal as="h2" className="head">From the day</Reveal>
          <div className="gallery">
            {p.gallery.map((g, i) => <Reveal key={i} kind={i === 1 ? "up" : i ? "right" : "left"} delay={i * 120} className={`g g${i}`}><Photo src={g} kind={p.kind} variant={i + 1} alt={`${p.title}, photo ${i + 1}`} /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap voices">
          <Reveal as="blockquote" className="solo"><p>“{p.quote[0]}”</p><footer>{p.quote[1]}</footer></Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap pn">
          <Link to={`/work/${prev.slug}`}><span>← Previous</span><h3>{prev.title}</h3></Link>
          <Link to={`/work/${next.slug}`} className="r2"><span>Next →</span><h3>{next.title}</h3></Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
