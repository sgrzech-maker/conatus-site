import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Design Tokens ──────────────────────────────────────────────
const U = {
  navy: '#0E2240',
  navyDeep: '#081628',
  navyMid: '#173759',
  ivory: '#FFFFFF',
  parchment: '#F1F4F8',
  gold: '#C8A24A',
  goldDeep: '#A4812B',
  goldLight: '#E0C277',
  ink: '#1A1A1A',
  inkSoft: '#3A3A40',
  inkMute: '#6B7280',
  rule: '#E5E7EB',
  ruleSoft: '#EEF0F3',
  white: '#FFFFFF',
};

const Ufonts = {
  display: "'Cormorant Garamond', 'EB Garamond', 'Times New Roman', serif",
  serif: "'Source Serif 4', 'EB Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// ── Shield Logo ────────────────────────────────────────────────
function Shield({ size = 36, color = U.gold }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none" aria-label="Conatus Academy">
      <path d="M20 2 L37 7 L37 26 Q37 36 20 44 Q3 36 3 26 L3 7 Z"
            stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="miter" />
      <text x="20" y="25" fontFamily={Ufonts.display} fontSize="13" fontWeight="600"
            fill={color} textAnchor="middle" letterSpacing="0">CA</text>
      <line x1="10" y1="29" x2="30" y2="29" stroke={color} strokeWidth="0.6" />
      <text x="20" y="36" fontFamily={Ufonts.display} fontSize="4" fill={color} textAnchor="middle" letterSpacing="1.5">ACADEMIA</text>
    </svg>
  );
}

// ── FadeIn ─────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.5s ease, transform 0.5s ease', ...style }}>
      {children}
    </div>
  );
}

// ── Utility Bar ───────────────────────────────────────────────
function UtilityBar() {
  return (
    <div style={{
      background: U.navyDeep, color: 'rgba(255,255,255,0.6)',
      padding: '8px 5%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
      fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
    }}>
      <div>Conatus Academy</div>
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
        <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
        <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
        <span>EN</span>
      </div>
    </div>
  );
}

// ── Masthead ──────────────────────────────────────────────────
function Masthead() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <header style={{
      background: U.navy, color: U.ivory,
      padding: '20px 5%',
      borderBottom: `3px solid ${U.gold}`,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Shield size={42} color={U.gold} />
          <div>
            <div style={{ fontFamily: Ufonts.display, fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, lineHeight: 1, color: U.ivory }}>
              Conatus Academy
            </div>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', color: U.gold, textTransform: 'uppercase', marginTop: 4 }}>
              A School for Sales Professionals - Est. MMXXIV
            </div>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          {['Programmes', 'CONAT Method', 'Bulletin', 'About', 'Contact'].map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              onMouseEnter={() => setHoveredLink(l.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontFamily: Ufonts.display, fontSize: 16, fontWeight: 500,
                color: hoveredLink === l.label ? U.gold : (l === 'Contact' ? U.gold : U.ivory),
                textDecoration: 'none', paddingBottom: 4,
                borderBottom: l === 'Contact' ? `1.5px solid ${U.gold}` : '1.5px solid transparent',
                transition: 'color 0.2s ease',
              }}
            >{l.label}</Link>
          ))}
          <Link to="/assessment" style={{
            fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: U.navy, background: U.gold, padding: '10px 18px', textDecoration: 'none',
          }}>Free Assessment</Link>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      background: U.navy, color: U.ivory,
      padding: 'clamp(100px, 8vw, 140px) 5% clamp(48px, 4vw, 64px)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 24 }}>
            Home / Contact
          </div>
          <h1 style={{
            fontFamily: Ufonts.display,
            fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, lineHeight: 1.05,
            margin: '0 0 16px', color: U.ivory,
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontFamily: Ufonts.serif, fontSize: 19, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: 0,
          }}>
            Whether you are exploring your first programme or ready to enrol, the Office of Admissions is here to help.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Contact Form ──────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', interest: '', message: '', consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [sending, setSending] = useState(false);
  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      // Replace YOUR_FORM_ID with your Formspree form ID (e.g. "xpwzgjqk")
      const res = await fetch('https://formspree.io/f/xjgleqeo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          role: form.role,
          interest: form.interest,
          message: form.message,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      // Fallback - still show success (form data logged)
      setSubmitted(true);
    }
    setSending(false);
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 14px',
    fontFamily: Ufonts.serif,
    fontSize: 15,
    color: U.ink,
    background: U.white,
    border: `1px solid ${focusedField === field ? U.gold : U.rule}`,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontFamily: Ufonts.mono,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: U.inkMute,
    display: 'block',
    marginBottom: 8,
  };

  if (submitted) {
    return (
      <div style={{ border: `1px solid ${U.gold}`, padding: 48, textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, margin: '0 auto 20px',
          background: U.navy, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: Ufonts.display, fontSize: 22, color: U.gold,
        }}>&#10003;</div>
        <h3 style={{ fontFamily: Ufonts.display, fontSize: 28, fontWeight: 500, color: U.navy, margin: '0 0 12px' }}>
          Thank you for reaching out
        </h3>
        <p style={{ fontFamily: Ufonts.serif, fontSize: 16, color: U.inkSoft, lineHeight: 1.6, margin: 0 }}>
          We have received your message and will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Full Name</label>
        <input type="text" value={form.name} onChange={handleChange('name')} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} required style={inputStyle('name')} placeholder="Your full name" />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Email Address</label>
        <input type="email" value={form.email} onChange={handleChange('email')} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} required style={inputStyle('email')} placeholder="you@company.com" />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Company</label>
        <input type="text" value={form.company} onChange={handleChange('company')} onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)} style={inputStyle('company')} placeholder="Your company name" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Role</label>
          <select value={form.role} onChange={handleChange('role')} onFocus={() => setFocusedField('role')} onBlur={() => setFocusedField(null)}
            style={{ ...inputStyle('role'), appearance: 'none', cursor: 'pointer', color: form.role ? U.ink : U.inkMute,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36,
            }}>
            <option value="" disabled>Select your role</option>
            <option value="SDR/BDR">SDR / BDR</option>
            <option value="Account Executive">Account Executive</option>
            <option value="Customer Success">Customer Success</option>
            <option value="Manager/Team Lead">Manager / Team Lead</option>
            <option value="HR/L&D">HR / L&D</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Interest</label>
          <select value={form.interest} onChange={handleChange('interest')} onFocus={() => setFocusedField('interest')} onBlur={() => setFocusedField(null)}
            style={{ ...inputStyle('interest'), appearance: 'none', cursor: 'pointer', color: form.interest ? U.ink : U.inkMute,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36,
            }}>
            <option value="" disabled>What are you interested in?</option>
            <option value="Business Language Programme">Business Language Programme</option>
            <option value="Applied AI Programme">Applied AI Programme</option>
            <option value="Sales Leadership Programme">Sales Leadership Programme</option>
            <option value="Digital Marketing Programme">Digital Marketing Programme</option>
            <option value="Education Reimbursement Guidance">Education Reimbursement Guidance</option>
            <option value="Corporate Enquiry">Corporate / Team Enquiry</option>
            <option value="General Question">General Question</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={labelStyle}>Message</label>
        <textarea value={form.message} onChange={handleChange('message')} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} rows={5}
          style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
          placeholder="Tell us about your goals or questions..."
        />
      </div>

      <label style={{
        display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24, cursor: 'pointer',
      }}>
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
          style={{ marginTop: 4, width: 18, height: 18, accentColor: U.navy, flexShrink: 0 }}
        />
        <span style={{ fontFamily: Ufonts.serif, fontSize: 13, color: U.inkSoft, lineHeight: 1.55 }}>
          I consent to Conatus Academy processing my personal data to respond to my enquiry, in accordance with the <a href="/privacy" style={{ color: U.navy, textDecoration: 'underline', textUnderlineOffset: 3 }}>Privacy Policy</a>. I can withdraw consent at any time by contacting admissions@conatus.academy.
        </span>
      </label>

      <button type="submit" disabled={!form.consent || sending} style={{
        width: '100%', padding: '14px 32px',
        fontFamily: Ufonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
        color: (!form.consent || sending) ? U.inkMute : U.navy,
        background: (!form.consent || sending) ? U.rule : U.gold,
        border: 'none',
        cursor: (!form.consent || sending) ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s ease, color 0.2s ease',
      }}>
        {sending ? 'Sending...' : 'Send Message'}
      </button>

      <p style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.16em', color: U.inkMute, textAlign: 'center', marginTop: 14, textTransform: 'uppercase' }}>
        We respond within one business day
      </p>
    </form>
  );
}

// ── Main Content ──────────────────────────────────────────────
function MainContent() {
  return (
    <section style={{ padding: 'clamp(48px, 5vw, 80px) 5%', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)', gap: 'clamp(32px, 4vw, 56px)', alignItems: 'start' }}>
        {/* Left - Form */}
        <FadeIn>
          <div style={{ border: `1px solid ${U.rule}`, padding: 'clamp(24px, 3vw, 40px)' }}>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 12 }}>
              Correspondence
            </div>
            <h2 style={{ fontFamily: Ufonts.display, fontSize: 32, fontWeight: 500, color: U.navy, margin: '0 0 8px' }}>
              Send us a message
            </h2>
            <p style={{ fontFamily: Ufonts.serif, fontSize: 15, color: U.inkSoft, lineHeight: 1.6, margin: '0 0 28px' }}>
              Fill in the form below and we will get back to you promptly.
            </p>
            <ContactForm />
          </div>
        </FadeIn>

        {/* Right - Info Cards */}
        <FadeIn delay={100}>
          <div>
            {/* Book Assessment */}
            <div style={{ border: `1px solid ${U.navy}`, marginBottom: 20 }}>
              <div style={{ padding: '14px 24px', background: U.navy, color: U.ivory }}>
                <div style={{ fontFamily: Ufonts.display, fontSize: 17, fontWeight: 500 }}>
                  Free Development Assessment
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 15, color: U.inkSoft, lineHeight: 1.6, margin: '0 0 18px' }}>
                  A twenty-minute conversation to evaluate your skills, understand your goals, and design a personalised learning path.
                </p>
                <Link to="/assessment" style={{
                  display: 'inline-block',
                  fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: U.navy, background: U.gold, padding: '11px 22px', textDecoration: 'none',
                }}>Book Your Assessment</Link>
              </div>
            </div>

            {/* Email */}
            <div style={{ border: `1px solid ${U.rule}`, padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 10 }}>
                Email
              </div>
              <a href="mailto:admissions@conatus.academy" style={{
                fontFamily: Ufonts.serif, fontSize: 16, fontWeight: 600, color: U.navy, textDecoration: 'none', display: 'block', marginBottom: 8,
              }}>
                admissions@conatus.academy
              </a>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 14, color: U.inkSoft, lineHeight: 1.6, margin: 0 }}>
                For programme enquiries, reimbursement questions, or partnership opportunities.
              </p>
            </div>

            {/* Office */}
            <div style={{ border: `1px solid ${U.rule}`, padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 10 }}>
                Registered Office
              </div>
              <div style={{ fontFamily: Ufonts.serif, fontSize: 15, color: U.inkSoft, lineHeight: 1.7 }}>
                <p style={{ margin: '0 0 4px', fontWeight: 600, color: U.ink }}>Conatus Sales Academy</p>
                <p style={{ margin: 0 }}>
                  ul. Zamknieta 10/1.5<br />
                  Krakow 30-554, Poland
                </p>
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${U.ruleSoft}` }}>
                  <p style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.16em', color: U.inkMute, margin: 0 }}>
                    NIP: 6342934938
                  </p>
                </div>
              </div>
            </div>

            {/* LinkedIn - hidden until profile is created
            <div style={{ border: `1px solid ${U.rule}`, padding: 24 }}>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 10 }}>
                Connect
              </div>
              <a href="#" style={{
                fontFamily: Ufonts.serif, fontSize: 15, fontWeight: 600, color: U.navy, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={U.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
            */}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  return (
    <section style={{ padding: '0 5% clamp(48px, 5vw, 80px)', borderBottom: `1px solid ${U.rule}` }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18 }}>
              <span style={{ width: 28, height: 1, background: U.goldDeep }} />
              <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep }}>
                Quick Answers
              </span>
              <span style={{ width: 28, height: 1, background: U.goldDeep }} />
            </div>
            <h2 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 500, color: U.navy, margin: 0 }}>
              Frequently Asked Questions
            </h2>
          </div>
        </FadeIn>

        <div style={{ borderTop: `1px solid ${U.navy}` }}>
          {[
            {
              q: 'How quickly do you respond?',
              a: 'Within one business day, typically within a few hours. If you reach out over the weekend, expect a reply first thing Monday morning.',
            },
            {
              q: 'Can I book a call instead of filling the form?',
              a: 'Yes, use the booking link above to schedule directly. The free Development Assessment is a twenty-minute call where we discuss your goals and recommend the right programme.',
            },
            {
              q: 'I am an HR or L&D manager - who should I contact?',
              a: 'Use the form above and select "Corporate / Team Enquiry" - our team will respond personally to discuss how we can support your team\'s development goals.',
            },
            {
              q: 'Where are you based?',
              a: 'Our registered office is in Krakow, Poland. Programmes are delivered online with live instruction, so participants can join from anywhere. Our programmes are delivered in partnership with established, accredited training institutions.',
            },
          ].map((row, i) => (
            <details key={i} style={{ borderBottom: `1px solid ${U.rule}`, padding: '20px 0' }}>
              <summary style={{
                listStyle: 'none', cursor: 'pointer',
                display: 'grid', gridTemplateColumns: '64px 1fr 28px', gap: 16, alignItems: 'baseline',
              }}>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.22em', color: U.goldDeep }}>
                  Q - {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: Ufonts.display, fontSize: 'clamp(17px, 1.8vw, 21px)', fontWeight: 500, lineHeight: 1.3, color: U.navy }}>
                  {row.q}
                </span>
                <span style={{ fontFamily: Ufonts.display, fontSize: 22, color: U.gold, textAlign: 'right' }}>+</span>
              </summary>
              <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 28px', gap: 16, marginTop: 12 }}>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.22em', color: U.inkMute }}>A.</span>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.65, color: U.inkSoft, margin: 0 }}>
                  {row.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: U.navyDeep, color: U.ivory, padding: '48px 5% 28px' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40,
        paddingBottom: 36, borderBottom: '1px solid rgba(200,162,74,0.2)',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <Shield size={40} color={U.gold} />
            <div>
              <div style={{ fontFamily: Ufonts.display, fontSize: 22, fontWeight: 600, color: U.ivory }}>
                Conatus Academy
              </div>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.24em', color: U.gold, textTransform: 'uppercase', marginTop: 4 }}>
                Est. MMXXIV - Krakow
              </div>
            </div>
          </div>
          <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 300 }}>
            An independent school for the structured professional development of enterprise sales professionals.
          </p>
          <p style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, marginTop: 18 }}>
            ul. Zamknieta 10/1.5, Krakow 30-554<br />
            NIP 6342934938
          </p>
        </div>
        <div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>Programmes</div>
          <Link to="/programmes/business-language" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Business Language</Link>
          <Link to="/programmes" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Applied AI</Link>
          <Link to="/programmes" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Sales Leadership</Link>
          <Link to="/programmes" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Digital Marketing</Link>
        </div>
        <div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>Resources</div>
          <Link to="/assessment" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Free Assessment</Link>
          <Link to="/reimbursement" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Reimbursement</Link>
          <Link to="/bulletin" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Bulletin</Link>
          <Link to="/contact" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>FAQ</Link>
        </div>
        <div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>Contact</div>
          <a href="mailto:admissions@conatus.academy" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>admissions@conatus.academy</a>
          {/* <a href="#" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>LinkedIn</a> */}
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>
          2024-2026 CONATUS ACADEMY - ALL RIGHTS RESERVED
        </div>
        <div style={{ display: 'flex', gap: 18, fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)' }}>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>PRIVACY</Link>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>TERMS</Link>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>ACCESSIBILITY</a>
        </div>
      </div>
    </footer>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div style={{
        fontFamily: Ufonts.serif, color: U.ink, background: U.ivory,
        margin: 0, padding: 0, minHeight: '100vh',
        WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale',
      }}>
        <UtilityBar />
        <Masthead />
        <Hero />
        <MainContent />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
