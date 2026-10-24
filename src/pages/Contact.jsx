import { useState } from "react";
import { Confetti, Reveal } from "../hooks.jsx";
import { budgets, eventTypes, heard, needs, site } from "../data.js";

// Submissions are delivered to site.email through FormSubmit (https://formsubmit.co), no backend needed.
// The first time anyone submits, FormSubmit emails that address an "Activate form" link: click it once.
const ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;

function Chips({ options, multi, value, onChange }) {
  const toggle = (o) => multi ? onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]) : onChange(value === o ? "" : o);
  return (
    <div className="chips">
      {options.map((o) => {
        const on = multi ? value.includes(o) : value === o;
        return <button type="button" key={o} className={on ? "on" : ""} aria-pressed={on} onClick={() => toggle(o)}>{o}</button>;
      })}
    </div>
  );
}

export default function Contact() {
  const [f, setF] = useState({ name: "", org: "", email: "", phone: "", date: "", location: "", guests: "", duration: "", goal: "", inplace: "", challenge: "", budget: "", heard: "", _honey: "" });
  const [type, setType] = useState("");
  const [need, setNeed] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (f._honey) return;
    setStatus("sending");
    const payload = {
      _subject: `New event enquiry from ${f.name}`, _template: "table", _captcha: "false", _replyto: f.email,
      "Full name": f.name, Organisation: f.org, Email: f.email, "Phone / WhatsApp": f.phone,
      "Event type": type, "Proposed date": f.date, Location: f.location, "Guests": f.guests, "Duration": f.duration,
      "Needs help with": need.join(", "), "What should it feel like": f.goal, "Already in place": f.inplace,
      "Biggest worry": f.challenge, Budget: f.budget, "Heard about us via": f.heard,
    };
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === "false" || data.success === false) throw new Error(data.message || "failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Confetti trigger={status === "sent"} origins={[[0.5, 0.4]]} />
      <section className="chero">
        <div className="wrap">
          <Reveal as="h1">Tell us what you’re celebrating.</Reveal>
          <Reveal as="p" delay={120}>Weddings, birthdays, graduations and conferences, planned with both of your worlds in mind. Send us a few details and we’ll take it from there.</Reveal>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: "2rem" }}>
        <div className="wrap cgrid">
          <Reveal as="aside" className="info" kind="left">
            <h2>Get in touch</h2>
            <div><h3>Email</h3><a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><h3>WhatsApp</h3><a href={`https://wa.me/${site.phone.replace(/\D/g, "")}`}>{site.phone}</a></div>
            <div><h3>Location</h3><p>{site.city}</p></div>
          </Reveal>
          <Reveal kind="right">
            {status === "sent" ? (
              <div className="form thanks">
                <svg className="check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg>
                <h2>Thank you{f.name ? `, ${f.name.split(" ")[0]}` : ""}!</h2>
                <p>We’ve received your details and will reply within one working day.</p>
              </div>
            ) : (
              <form className="form" onSubmit={submit}>
                <h2>Your details</h2>
                <input type="text" name="_honey" value={f._honey} onChange={set("_honey")} className="honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />
                <div className="fg">
                  <label className="f"><span>Full name</span><input required value={f.name} onChange={set("name")} autoComplete="name" /></label>
                  <label className="f"><span>Organisation (if any)</span><input value={f.org} onChange={set("org")} autoComplete="organization" /></label>
                  <label className="f"><span>Email</span><input required type="email" value={f.email} onChange={set("email")} autoComplete="email" /></label>
                  <label className="f"><span>Phone / WhatsApp</span><input type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" /></label>
                </div>
                <div className="f"><span className="lab">Event type</span><Chips options={eventTypes} value={type} onChange={setType} /></div>
                <div className="fg">
                  <label className="f"><span>Proposed event date</span><input type="date" value={f.date} onChange={set("date")} /></label>
                  <label className="f"><span>Location</span><input value={f.location} onChange={set("location")} placeholder="City or venue" /></label>
                  <label className="f"><span>Expected number of guests</span><input inputMode="numeric" value={f.guests} onChange={set("guests")} /></label>
                  <label className="f"><span>How long will the event run?</span><input value={f.duration} onChange={set("duration")} placeholder="e.g. 4 hours, 2 days" /></label>
                </div>
                <div className="f"><span className="lab">What do you need help with?</span><Chips multi options={needs} value={need} onChange={setNeed} /></div>
                <label className="f"><span>What should the celebration feel like?</span><textarea rows="3" value={f.goal} onChange={set("goal")} /></label>
                <label className="f"><span>What have you already booked or decided?</span><textarea rows="3" value={f.inplace} onChange={set("inplace")} /></label>
                <label className="f"><span>What is your biggest worry right now?</span><textarea rows="3" value={f.challenge} onChange={set("challenge")} /></label>
                <div className="fg">
                  <label className="f"><span>Estimated budget (CAD)</span>
                    <select value={f.budget} onChange={set("budget")}><option value="">Select a range</option>{budgets.map((b) => <option key={b}>{b}</option>)}</select></label>
                  <label className="f"><span>How did you hear about {site.name}?</span>
                    <select value={f.heard} onChange={set("heard")}><option value="">Select one</option>{heard.map((b) => <option key={b}>{b}</option>)}</select></label>
                </div>
                {status === "error" && (
                  <p className="err" role="alert">Sorry, that didn’t send. Please try again, or email us directly at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
                )}
                <div><button className="btn" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send event brief"}</button></div>
                <p className="fine">By sending this brief, you agree to be contacted by the {site.name} team about your event.</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
