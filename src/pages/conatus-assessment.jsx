import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Design Tokens ──────────────────────────────────────────────
const U = {
  navy: '#0E2240', navyDeep: '#081628', navyMid: '#173759',
  ivory: '#FFFFFF', parchment: '#F1F4F8',
  gold: '#C8A24A', goldDeep: '#A4812B', goldLight: '#E0C277',
  ink: '#1A1A1A', inkSoft: '#3A3A40', inkMute: '#6B7280',
  rule: '#E5E7EB', ruleSoft: '#EEF0F3',
};
const Ufonts = {
  display: "'Cormorant Garamond', 'EB Garamond', 'Times New Roman', serif",
  serif: "'Source Serif 4', 'EB Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// ── Inject CSS Keyframes (for spinning crest + flame) ─────────
function useKeyframes() {
  useEffect(() => {
    const id = 'conatus-assessment-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes crest-rotate {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes crest-rotate-reverse {
        from { transform: rotate(0deg); }
        to   { transform: rotate(-360deg); }
      }
      @keyframes flame-pulse {
        0%, 100% { transform: scaleY(1); opacity: 0.95; }
        50%      { transform: scaleY(1.18); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => { const el = document.getElementById(id); if (el) el.remove(); };
  }, []);
}

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
          setTimeout(() => setVisible(true), delay * 1000);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Crest (with rotating ring) ─────────────────────────────────
function CrestSpinning({ size = 240 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none">
      <defs>
        <path id="ring-spin" d="M 120 120 m -98 0 a 98 98 0 1 1 196 0 a 98 98 0 1 1 -196 0" />
      </defs>
      {/* outer rotating ring of dots + text */}
      <g style={{ transformOrigin: '120px 120px', animation: 'crest-rotate 60s linear infinite' }}>
        <circle cx="120" cy="120" r="108" stroke={U.gold} strokeWidth="0.6" fill="none" opacity="0.45" />
        <circle cx="120" cy="120" r="98" stroke={U.gold} strokeWidth="0.6" fill="none" opacity="0.55" />
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const x = 120 + Math.cos(a) * 103;
          const y = 120 + Math.sin(a) * 103;
          return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.6} fill={U.gold} opacity={i % 3 === 0 ? 0.9 : 0.5} />;
        })}
        <text fontFamily={Ufonts.display} fontSize="9" fill={U.gold} letterSpacing="6" opacity="0.85">
          <textPath href="#ring-spin" startOffset="0%">CONATUS · ACADEMIA · OFFICIO ADMISSIONIS · MMXXVI · </textPath>
        </text>
      </g>

      {/* counter-rotating inner orbit with the four assessment pillars */}
      <g style={{ transformOrigin: '120px 120px', animation: 'crest-rotate-reverse 80s linear infinite' }}>
        <circle cx="120" cy="120" r="86" stroke={U.gold} strokeWidth="0.4" fill="none" opacity="0.3" strokeDasharray="2 4" />
        {['I', 'II', 'III', 'IV'].map((n, i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const x = 120 + Math.cos(a) * 86;
          const y = 120 + Math.sin(a) * 86;
          return (
            <g key={n}>
              <circle cx={x} cy={y} r="9" fill={U.navy} stroke={U.gold} strokeWidth="0.8" />
              <text x={x} y={y + 3} fontFamily={Ufonts.display} fontSize="9" fill={U.gold} textAnchor="middle" fontStyle="italic">{n}</text>
            </g>
          );
        })}
      </g>

      {/* still center: shield + book + flame */}
      <g>
        <circle cx="120" cy="120" r="68" stroke={U.gold} strokeWidth="0.8" fill="none" />
        <circle cx="120" cy="120" r="62" stroke={U.gold} strokeWidth="0.5" fill="none" opacity="0.6" />
        <path d="M120 76 L150 84 L150 116 Q150 138 120 154 Q90 138 90 116 L90 84 Z"
              stroke={U.gold} strokeWidth="1.4" fill="none" />
        <path d="M100 110 L120 106 L140 110 L140 132 L120 128 L100 132 Z"
              stroke={U.gold} strokeWidth="1" fill="none" />
        <line x1="120" y1="106" x2="120" y2="128" stroke={U.gold} strokeWidth="0.7" />
        {/* flame - gentle pulse */}
        <path d="M120 88 Q125 94 120 102 Q115 94 120 88 Z" fill={U.gold} opacity="0.95"
              style={{ transformOrigin: '120px 96px', animation: 'flame-pulse 3.2s ease-in-out infinite' }} />
      </g>
    </svg>
  );
}

// ── Utility Bar ───────────────────────────────────────────────
function UtilityBar() {
  return (
    <div className="m-util-bar" style={{
      background: U.navyDeep, color: 'rgba(255,255,255,0.6)',
      padding: '8px 5%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
      fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
    }}>
      <div>Conatus Academy</div>
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
        <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
        <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
        <span style={{ color: U.gold }}>EN</span>
      </div>
    </div>
  );
}

// ── Masthead ──────────────────────────────────────────────────
function Masthead() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <header className="m-masthead" style={{
      background: U.navy, color: U.ivory,
      padding: '20px 5%',
      borderBottom: `3px solid ${U.gold}`,
    }}>
      <div className="m-masthead-inner" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
          <Shield size={42} color={U.gold} />
          <div>
            <div style={{ fontFamily: Ufonts.display, fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, lineHeight: 1, color: U.ivory }}>
              Conatus Academy
            </div>
            <div className="m-masthead-subtitle" style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', color: U.gold, textTransform: 'uppercase', marginTop: 4 }}>
              A School for Sales Professionals - Est. MMXXIV
            </div>
          </div>
        </Link>
        <nav className="m-nav" style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Programmes', to: '/programmes' },
            { label: 'CONAT Method', to: '/method' },
            { label: 'Bulletin', to: '/bulletin' },
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' },
          ].map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onMouseEnter={() => setHoveredLink(l.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontFamily: Ufonts.display, fontSize: 16, fontWeight: 500,
                color: hoveredLink === l.label ? U.gold : U.ivory,
                textDecoration: 'none', paddingBottom: 4,
                borderBottom: '1.5px solid transparent',
                transition: 'color 0.2s ease',
              }}
            >{l.label}</Link>
          ))}
          <span style={{
            fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: U.navy, background: U.gold, padding: '10px 18px',
            borderBottom: `2px solid ${U.goldDeep}`,
          }}>Free Assessment</span>
        </nav>
      </div>
    </header>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: U.navyDeep, color: U.ivory, padding: '48px 5% 28px' }}>
      <div className="m-footer-grid" style={{
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
            From Spinoza's conatus - the innate drive to persist and excel. An independent school for the professional development of enterprise sales teams.
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
      <div className="m-footer-bottom" style={{ maxWidth: 1280, margin: '0 auto', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
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

// ── Assessment Form ───────────────────────────────────────────
function AssessmentForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    role: '', goal: '', languages: [], level: '',
    name: '', email: '', company: '', timeslot: '', consent: false,
  });
  const total = 4;
  const [sending, setSending] = useState(false);

  const submitToFormspree = async () => {
    setSending(true);
    try {
      // Replace YOUR_FORM_ID with your Formspree form ID (e.g. "mpwzabcd")
      await fetch('https://formspree.io/f/maqvdgdp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: data.role,
          goal: data.goal,
          languages: data.languages.join(', '),
          level: data.level,
          name: data.name,
          email: data.email,
          company: data.company,
          timeslot: data.timeslot,
        }),
      });
    } catch (err) { /* proceed anyway */ }
    setSending(false);
  };

  const next = () => {
    if (step === total - 1) {
      submitToFormspree().then(() => setStep(total));
    } else {
      setStep(s => Math.min(s + 1, total));
    }
  };
  const back = () => setStep(s => Math.max(s - 1, 0));
  const setKV = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggleArr = (k, v) => setData(d => ({
    ...d, [k]: d[k].includes(v) ? d[k].filter(x => x !== v) : [...d[k], v],
  }));

  const labelStyle = {
    fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
    color: U.goldDeep, marginBottom: 12, display: 'block',
  };
  const inputStyle = {
    width: '100%', fontFamily: Ufonts.serif, fontSize: 17, color: U.ink,
    background: 'transparent', border: 'none',
    borderBottom: `1px solid ${U.rule}`, padding: '12px 0', outline: 'none',
  };
  const chipBase = {
    fontFamily: Ufonts.serif, fontSize: 15, padding: '11px 18px',
    border: `1px solid ${U.rule}`, background: U.ivory, color: U.ink,
    cursor: 'pointer', textAlign: 'left',
  };
  const chipOn = { ...chipBase, borderColor: U.navy, background: U.navy, color: U.ivory };

  const stepEls = [
    // 0 - Role
    <div key="0">
      <label style={labelStyle}>Question I - Your Role</label>
      <h3 style={{ fontFamily: Ufonts.display, fontSize: 32, fontWeight: 500, lineHeight: 1.15, color: U.navy, margin: '0 0 24px', letterSpacing: '-0.01em' }}>
        Which describes your current position?
      </h3>
      <div className="m-grid-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {['Account Executive', 'SDR / BDR', 'Sales Manager / Director', 'VP Sales / CRO', 'Customer Success', 'Other commercial role'].map(o => (
          <button key={o} type="button" onClick={() => setKV('role', o)}
            style={data.role === o ? chipOn : chipBase}>
            {o}
          </button>
        ))}
      </div>
    </div>,
    // 1 - Goal
    <div key="1">
      <label style={labelStyle}>Question II - Your Objective</label>
      <h3 style={{ fontFamily: Ufonts.display, fontSize: 32, fontWeight: 500, lineHeight: 1.15, color: U.navy, margin: '0 0 24px', letterSpacing: '-0.01em' }}>
        What is the most important outcome for the next twelve months?
      </h3>
      <div style={{ display: 'grid', gap: 10 }}>
        {[
          'Operate confidently in a second business language (German / French / Polish)',
          'Sharpen enterprise sales methodology - discovery, MEDDPICC, executive presence',
          'Apply AI tooling to my sales workflow - analytics, automation, content',
          'Move into a leadership / management track',
          'A combination of the above - please advise',
        ].map(o => (
          <button key={o} type="button" onClick={() => setKV('goal', o)}
            style={data.goal === o ? chipOn : chipBase}>
            {o}
          </button>
        ))}
      </div>
    </div>,
    // 2 - Languages + level
    <div key="2">
      <label style={labelStyle}>Question III - Working Languages</label>
      <h3 style={{ fontFamily: Ufonts.display, fontSize: 32, fontWeight: 500, lineHeight: 1.15, color: U.navy, margin: '0 0 24px', letterSpacing: '-0.01em' }}>
        Which languages are part of your sales territory?
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {['English', 'German', 'French', 'Polish', 'Spanish', 'Italian', 'Dutch'].map(o => (
          <button key={o} type="button" onClick={() => toggleArr('languages', o)}
            style={data.languages.includes(o) ? chipOn : chipBase}>
            {o}
          </button>
        ))}
      </div>
      <label style={labelStyle}>Self-assessed proficiency in your weakest target language</label>
      <div style={{ display: 'flex', gap: 8 }}>
        {['A1 - Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Upper intermediate', 'C1+ - Advanced'].map(o => (
          <button key={o} type="button" onClick={() => setKV('level', o)}
            style={{ ...(data.level === o ? chipOn : chipBase), flex: 1, fontSize: 13, padding: '10px 12px', textAlign: 'center' }}>
            {o}
          </button>
        ))}
      </div>
    </div>,
    // 3 - Contact
    <div key="3">
      <label style={labelStyle}>Question IV - Office of Admissions</label>
      <h3 style={{ fontFamily: Ufonts.display, fontSize: 32, fontWeight: 500, lineHeight: 1.15, color: U.navy, margin: '0 0 24px', letterSpacing: '-0.01em' }}>
        Where shall we send your invitation?
      </h3>
      <div className="m-grid-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 22 }}>
        <div>
          <label style={labelStyle}>Full name</label>
          <input style={inputStyle} placeholder="e.g. Magdalena Kowalska" value={data.name} onChange={e => setKV('name', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Professional email</label>
          <input style={inputStyle} placeholder="name@company.com" value={data.email} onChange={e => setKV('email', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Company</label>
          <input style={inputStyle} placeholder="Your employer" value={data.company} onChange={e => setKV('company', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Preferred timeslot</label>
          <select style={{ ...inputStyle, appearance: 'none' }} value={data.timeslot} onChange={e => setKV('timeslot', e.target.value)}>
            <option value="">Select an appointment window</option>
            <option>Mornings - 09:00-11:00 CET</option>
            <option>Midday - 11:00-13:00 CET</option>
            <option>Afternoons - 14:00-16:00 CET</option>
            <option>Late - 16:00-18:00 CET</option>
          </select>
        </div>
      </div>
      <div style={{
        padding: 16, background: U.parchment, border: `1px solid ${U.rule}`,
        fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 13, color: U.inkSoft, lineHeight: 1.55,
      }}>
        Your responses are reviewed by a member of the Faculty of Admissions before scheduling. Conversations are confidential - we do not contact your employer.
      </div>
      <label style={{
        display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 22, cursor: 'pointer',
      }}>
        <input
          type="checkbox"
          checked={data.consent}
          onChange={e => setKV('consent', e.target.checked)}
          style={{ marginTop: 4, width: 18, height: 18, accentColor: U.navy, flexShrink: 0 }}
        />
        <span style={{ fontFamily: Ufonts.serif, fontSize: 13, color: U.inkSoft, lineHeight: 1.55 }}>
          I consent to Conatus Academy processing my personal data for the purpose of scheduling and conducting a Development Assessment, in accordance with the <a href="/privacy" style={{ color: U.navy, textDecoration: 'underline', textUnderlineOffset: 3 }}>Privacy Policy</a>. I understand I can withdraw my consent at any time by contacting admissions@conatus.academy.
        </span>
      </label>
    </div>,
    // 4 - Done
    <div key="4" style={{ textAlign: 'center', padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
        <CrestSpinning size={140} />
      </div>
      <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 14 }}>
        Application Received
      </div>
      <h3 style={{ fontFamily: Ufonts.display, fontSize: 44, fontWeight: 500, color: U.navy, margin: 0, marginBottom: 14, letterSpacing: '-0.012em' }}>
        Thank you, {data.name || 'colleague'}.
      </h3>
      <p style={{ fontFamily: Ufonts.serif, fontSize: 17, color: U.inkSoft, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
        A member of the Faculty of Admissions will write to you at <strong style={{ color: U.navy }}>{data.email || 'your address'}</strong> within two business days to confirm a twenty-minute appointment.
      </p>
    </div>,
  ];

  return (
    <div style={{
      background: U.ivory, border: `1px solid ${U.navy}`,
      padding: '44px 56px', position: 'relative',
    }}>
      {/* progress dots */}
      {step < total && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 2,
              background: i <= step ? U.gold : U.rule,
              transition: 'background 0.3s ease',
            }} />
          ))}
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', color: U.goldDeep, marginLeft: 8 }}>
            {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>
      )}

      {stepEls[step]}

      {step < total && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
          <button type="button" onClick={back} disabled={step === 0} style={{
            fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 15, color: step === 0 ? U.inkMute : U.navy,
            background: 'none', border: 'none', cursor: step === 0 ? 'default' : 'pointer',
            textDecoration: step === 0 ? 'none' : 'underline', textUnderlineOffset: 4, textDecorationColor: U.gold,
          }}>&#8592; previous</button>
          <button type="button"
            onClick={next}
            disabled={(step === total - 1 && !data.consent) || sending}
            style={{
              fontFamily: Ufonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: (step === total - 1 && !data.consent) ? U.inkMute : U.navy,
              background: (step === total - 1 && !data.consent) ? U.rule : U.gold,
              padding: '14px 28px', border: 'none',
              cursor: (step === total - 1 && !data.consent) ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s ease, color 0.2s ease',
          }}>{sending ? 'Submitting...' : (step === total - 1 ? 'Submit application' : 'Continue')} {!sending && <>&rarr;</>}</button>
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────
export default function ConatusAssessment() {
  useKeyframes();

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

        {/* ── HERO with animated crest ── */}
        <section style={{ background: U.navy, color: U.ivory, padding: 'clamp(60px, 6vw, 88px) 5%', position: 'relative', overflow: 'hidden' }}>
          {/* parchment frames */}
          <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />

          {/* Faint constellation behind */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }}>
            {Array.from({ length: 60 }).map((_, i) => {
              const x = (i * 137.5) % 1440;
              const y = (i * 53.7) % 600;
              return <circle key={i} cx={x} cy={y} r={i % 7 === 0 ? 1.5 : 0.6} fill={U.gold} opacity={0.25 + (i % 5) * 0.1} />;
            })}
          </svg>

          <div className="m-grid-stack" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <FadeIn>
              <div>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold, marginBottom: 22 }}>
                  &#9670; Office of Admissions - By Appointment
                </div>
                <h1 style={{
                  fontFamily: Ufonts.display, fontSize: 'clamp(48px, 6vw, 84px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em',
                  margin: 0, marginBottom: 22, color: U.ivory, textWrap: 'balance',
                }}>
                  The free <span style={{ fontStyle: 'italic', color: U.gold }}>Development<br />Assessment</span>.
                </h1>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 19, lineHeight: 1.65, color: 'rgba(248,244,234,0.78)', margin: 0, marginBottom: 28, maxWidth: 540 }}>
                  A twenty-minute conversation with a member of our Faculty of Admissions. We assess your current standing, define a learning objective, and propose a programme of study - at no cost, with no obligation.
                </p>

                <div className="m-grid-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, paddingTop: 24, borderTop: '1px solid rgba(200,162,74,0.2)' }}>
                  {[
                    ['Duration', '20 minutes'],
                    ['Format', 'Video or telephone'],
                    ['Output', 'A written learning plan'],
                    ['Cost', 'No fee - No obligation'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(248,244,234,0.5)', marginBottom: 6 }}>{k}</div>
                      <div style={{ fontFamily: Ufonts.display, fontSize: 17, fontWeight: 500, color: U.ivory }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Animated crest */}
            <FadeIn delay={0.2}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <CrestSpinning size={420} />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── WHAT YOU RECEIVE - 4 pillars ── */}
        <section style={{ padding: 'clamp(60px, 7vw, 88px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18 }}>
              <span style={{ width: 28, height: 1, background: U.goldDeep }} />
              <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, whiteSpace: 'nowrap' }}>The Four Instruments</span>
              <span style={{ width: 28, height: 1, background: U.goldDeep }} />
            </div>
            <h2 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.012em', margin: 0, color: U.navy }}>
              What the assessment will produce.
            </h2>
          </div>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 0 }}>
            {[
              { n: 'I', t: 'Skill Gap Diagnostic', b: 'A structured review of your present capabilities against the demands of your role and territory.' },
              { n: 'II', t: 'Language Placement', b: 'A short oral evaluation in your weakest target language, mapped to CEFR (A1-C1).' },
              { n: 'III', t: 'Programme Recommendation', b: 'A faculty-prepared written plan, naming the specific courses, sequence and cohort dates.' },
              { n: 'IV', t: 'Reimbursement Brief', b: 'Practical guidance on how to claim from your employer\'s education benefit, with template documents.' },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <article style={{
                  padding: '0 32px', textAlign: 'center',
                  borderRight: i < 3 ? `1px solid ${U.rule}` : 'none',
                }}>
                  <div style={{
                    width: 56, height: 56, margin: '0 auto 22px',
                    border: `1.5px solid ${U.gold}`, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: Ufonts.display, fontSize: 22, fontWeight: 600, color: U.goldDeep, fontStyle: 'italic',
                  }}>{p.n}</div>
                  <h4 style={{ fontFamily: Ufonts.display, fontSize: 22, fontWeight: 500, lineHeight: 1.18, color: U.navy, margin: 0, marginBottom: 12, letterSpacing: '-0.008em' }}>
                    {p.t}
                  </h4>
                  <p style={{ fontFamily: Ufonts.serif, fontSize: 14, lineHeight: 1.65, color: U.inkSoft, margin: 0 }}>{p.b}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── FORM SECTION ── */}
        <section id="form" style={{ padding: 'clamp(60px, 7vw, 88px) 5%', background: U.parchment, borderBottom: `1px solid ${U.rule}` }}>
          <div className="m-grid-stack" style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 56, alignItems: 'start' }}>
            {/* Sidebar - itinerary */}
            <aside style={{ position: 'sticky', top: 32 }}>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 16 }}>
                The Itinerary
              </div>
              <h3 style={{ fontFamily: Ufonts.display, fontSize: 38, fontWeight: 500, lineHeight: 1.05, color: U.navy, margin: 0, marginBottom: 24, letterSpacing: '-0.012em' }}>
                Four short questions, then we propose a plan.
              </h3>
              <div style={{ borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
                {[
                  ['I', 'Your role'],
                  ['II', 'Your objective'],
                  ['III', 'Working languages'],
                  ['IV', 'Office of admissions'],
                ].map(([n, t], i, arr) => (
                  <div key={n} style={{
                    display: 'grid', gridTemplateColumns: '32px 1fr', alignItems: 'baseline', gap: 12,
                    padding: '12px 0',
                    borderBottom: i < arr.length - 1 ? `1px dotted ${U.rule}` : 'none',
                  }}>
                    <span style={{ fontFamily: Ufonts.display, fontStyle: 'italic', fontSize: 17, color: U.goldDeep }}>{n}</span>
                    <span style={{ fontFamily: Ufonts.serif, fontSize: 15, color: U.ink }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 22, padding: 14, border: `1px solid ${U.rule}`, background: U.ivory,
                borderLeft: `3px solid ${U.gold}`,
              }}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 6 }}>
                  Confidential
                </div>
                <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 13, color: U.inkSoft, lineHeight: 1.55, margin: 0 }}>
                  The conversation is between the participant and the Academy. We never contact your employer without explicit instruction.
                </p>
              </div>
            </aside>

            {/* Form panel */}
            <AssessmentForm />
          </div>
        </section>

        {/* ── FACULTY - who you'll meet ── */}
        <section style={{ padding: 'clamp(60px, 7vw, 88px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18 }}>
              <span style={{ width: 28, height: 1, background: U.goldDeep }} />
              <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, whiteSpace: 'nowrap' }}>Whom You Will Meet</span>
              <span style={{ width: 28, height: 1, background: U.goldDeep }} />
            </div>
            <h2 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.012em', margin: 0, color: U.navy }}>
              Our Language Instructors.
            </h2>
            <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 17, color: U.inkSoft, lineHeight: 1.55, margin: '14px 0 0' }}>
              Qualified professionals employed by our partner institution - not freelancers or chatbots.
            </p>
          </div>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              { photo: '/faculty/karolina-gajdos.jpg', i: 'KG', n: 'Karolina Gajdos', r: 'Language Instructor - Spanish', d: 'Nearly two decades helping professionals communicate with confidence in international business environments.' },
              { photo: '/faculty/monika-wajnberg.jpg', i: 'MW', n: 'Monika Wajnberg', r: 'Language Instructor - French', d: 'Over 16 years working with French clients and companies. Deep understanding of cultural nuances in business communication.' },
              { photo: '/faculty/dorota-rafacz.jpg', i: 'DR', n: 'Dorota Rafacz', r: 'Language Instructor - German', d: 'Business English and German specialist supporting learners from A1 to C2 with tailored, practical instruction.' },
            ].map((f, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <article style={{ textAlign: 'center', padding: '28px 24px', border: `1px solid ${U.rule}` }}>
                  <div style={{
                    width: 96, height: 96, margin: '0 auto 18px', borderRadius: '50%',
                    background: U.parchment, border: `1px solid ${U.rule}`,
                    overflow: 'hidden', position: 'relative',
                  }}>
                    <img src={f.photo} alt={f.n} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                    <div style={{
                      display: 'none', position: 'absolute', inset: 0,
                      alignItems: 'center', justifyContent: 'center',
                      fontFamily: Ufonts.display, fontSize: 36, fontWeight: 500, color: U.navy, letterSpacing: '-0.02em',
                    }}>{f.i}</div>
                  </div>
                  <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 8 }}>{f.r}</div>
                  <h4 style={{ fontFamily: Ufonts.display, fontSize: 22, fontWeight: 500, color: U.navy, margin: 0, marginBottom: 8, letterSpacing: '-0.008em' }}>{f.n}</h4>
                  <p style={{ fontFamily: Ufonts.serif, fontSize: 13, lineHeight: 1.6, color: U.inkSoft, margin: 0 }}>{f.d}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── CLOSING WORD ── */}
        <section style={{ padding: 'clamp(72px, 7vw, 96px) 5%', background: U.navy, color: U.ivory, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 28px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 32px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
            <FadeIn>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold, marginBottom: 18 }}>
                A Note from the Founders
              </div>
              <blockquote style={{
                fontFamily: Ufonts.display, fontStyle: 'italic',
                fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, lineHeight: 1.32, letterSpacing: '-0.008em',
                color: U.ivory, margin: 0, textWrap: 'balance',
              }}>
                <span style={{ color: U.gold, fontStyle: 'normal' }}>"</span>
                We do not believe a sales career is best served by an algorithm or a marketplace. Twenty minutes with a person who has done the work - that is the most useful first step we know.
                <span style={{ color: U.gold, fontStyle: 'normal' }}>"</span>
              </blockquote>
              <div style={{ marginTop: 28 }}>
                <div style={{ width: 32, height: 1, background: U.gold, margin: '0 auto 12px' }} />
                <div style={{ fontFamily: Ufonts.display, fontSize: 17, fontWeight: 600, color: U.ivory }}>Stanislaw Grzech</div>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,162,74,0.85)', marginTop: 6 }}>CEO - Conatus Academy</div>
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
