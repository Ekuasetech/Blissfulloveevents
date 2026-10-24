import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { nav, site } from "./data.js";
import { useScrollY } from "./hooks.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import { WorkDetail, WorkIndex } from "./pages/Work.jsx";

function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 450);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}

function Header({ y }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className={`hdr ${y > 40 || pathname !== "/" ? "small" : ""}`}>
      <div className="wrap hdr-in">
        <Link to="/" className="brand" aria-label={`${site.name} home`}><img src="/logo.png" alt="" /><span>{site.name}</span></Link>
        <nav className={open ? "show" : ""} aria-label="Main">
          {nav.map(([n, to]) => <Link key={n} to={to}>{n}</Link>)}
        </nav>
        <Link to="/contact" className="btn sm hide-sm">Plan an event</Link>
        <button className="burger" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="logo-b"><img src="/logo.png" alt={site.name} /></div>
            <p>Celebrations with the warmth of home, planned in London, Ontario for Nigerian families, newcomers and everyone who celebrates with them.</p>
          </div>
          <div><h3>Explore</h3><ul>{nav.map(([n, to]) => <li key={n}><Link to={to}>{n}</Link></li>)}</ul></div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li>{site.city}</li>
            </ul>
          </div>
        </div>
        <div className="base"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span></div>
      </div>
    </footer>
  );
}

export function NotFound() {
  return (
    <section className="chero nf">
      <div className="wrap stack">
        <h1>That page isn’t here.</h1>
        <p>The link may be old, or the page may have moved.</p>
        <Link className="btn" to="/">Back to home</Link>
      </div>
    </section>
  );
}

export default function App() {
  const y = useScrollY();
  const { pathname } = useLocation();
  const h = typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 1;
  return (
    <>
      <ScrollManager />
      <div className="progress" style={{ transform: `scaleX(${h > 0 ? Math.min(y / h, 1) : 0})` }} />
      <div className="curtain" key={`c${pathname}`} aria-hidden="true">{[0, 1, 2, 3, 4].map((k) => <i key={k} style={{ "--k": k }} />)}</div>
      <Header y={y} />
      <main className="page" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkIndex />} />
          <Route path="/work/:slug" element={<WorkDetail NotFound={NotFound} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
