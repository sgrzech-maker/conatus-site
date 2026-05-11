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

// ── Crest SVG ──────────────────────────────────────────────────
function Crest({ size = 64, color = U.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-label="Conatus seal">
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="1" />
      <circle cx="40" cy="40" r="34" stroke={color} strokeWidth="0.6" />
      <path d="M40 16 L58 22 L58 42 Q58 56 40 64 Q22 56 22 42 L22 22 Z"
            stroke={color} strokeWidth="1.4" fill="none" strokeLinejoin="miter" />
      <path d="M28 38 L40 36 L52 38 L52 50 L40 48 L28 50 Z"
            stroke={color} strokeWidth="1" fill="none" />
      <line x1="40" y1="36" x2="40" y2="48" stroke={color} strokeWidth="0.8" />
      <path d="M40 24 Q43 28 40 33 Q37 28 40 24 Z" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.9" />
      <defs>
        <path id="ring-top" d="M 10 40 A 30 30 0 0 1 70 40" />
        <path id="ring-bottom" d="M 12 40 A 28 28 0 0 0 68 40" />
      </defs>
      <text fontFamily={Ufonts.display} fontSize="6" fill={color} letterSpacing="2">
        <textPath href="#ring-top" startOffset="50%" textAnchor="middle">CONATUS - ACADEMIA</textPath>
      </text>
      <text fontFamily={Ufonts.display} fontSize="5" fill={color} letterSpacing="3">
        <textPath href="#ring-bottom" startOffset="50%" textAnchor="middle">MMXXIV</textPath>
      </text>
    </svg>
  );
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
        transition: `opacity 0.6s ease, transform 0.6s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────
function SectionHead({ kicker, title, sub, light }) {
  const kickerColor = light ? U.gold : U.goldDeep;
  const titleColor = light ? U.ivory : U.navy;
  const subColor = light ? 'rgba(255,255,255,0.7)' : U.inkSoft;
  return (
    <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18 }}>
        <span style={{ width: 28, height: 1, background: kickerColor }} />
        <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: kickerColor }}>
          {kicker}
        </span>
        <span style={{ width: 28, height: 1, background: kickerColor }} />
      </div>
      <h2 style={{
        fontFamily: Ufonts.display,
        fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.05,
        letterSpacing: '-0.012em', margin: 0, color: titleColor,
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          fontFamily: Ufonts.serif, fontStyle: 'italic',
          fontSize: 18, lineHeight: 1.55, color: subColor,
          margin: '16px 0 0',
        }}>
          {sub}
        </p>
      )}
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
        <span style={{ color: U.gold }}>EN</span>
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
      padding: 'clamp(100px, 10vw, 160px) 5% clamp(80px, 8vw, 120px)',
      background: U.navy, position: 'relative', overflow: 'hidden',
    }}>
      {/* Parchment frame */}
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            <Crest size={48} color={U.gold} />
            <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold }}>
              Course Catalogue 2025-2026
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 style={{
            fontFamily: Ufonts.display,
            fontSize: 'clamp(40px, 5.5vw, 76px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.018em',
            margin: '0 0 28px', color: U.ivory,
          }}>
            Four Disciplines of
            <br />
            <span style={{ color: U.gold, fontStyle: 'italic', fontWeight: 400 }}>Professional Growth</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p style={{
            fontFamily: Ufonts.serif, fontSize: 'clamp(17px, 1.6vw, 21px)',
            lineHeight: 1.65, color: 'rgba(255,255,255,0.7)',
            maxWidth: 640, margin: '0 auto 40px',
          }}>
            Each programme combines world-class instruction with practical application
            specific to enterprise sales. One programme is live today - three more are in development.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <a href="#flagship" style={{
            fontFamily: Ufonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: U.navy, background: U.gold, padding: '15px 32px', textDecoration: 'none',
            display: 'inline-block',
          }}>
            View Flagship Programme
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Programme Data ─────────────────────────────────────────────
const programmes = [
  {
    code: 'CONA-101',
    title: 'Business Language for Sales Professionals',
    status: 'Now Enrolling',
    statusColor: U.gold,
    partner: 'Accredited Partner',
    price: '4,995',
    currency: 'EUR',
    duration: '12 weeks',
    hours: '50-55 contact hours',
    format: 'Live individual instruction',
    flagship: true,
    languages: ['French', 'German', 'Spanish', 'Italian'],
    outcomes: [
      'Guaranteed one CEFR level improvement',
      'Sales-specific vocabulary and terminology',
      'Live simulation calls and role-play',
      'Real negotiation practice scenarios',
      'CEFR certification on completion',
    ],
    description: 'A 12-week intensive programme designed for enterprise sales professionals who need to operate in a second language. Individual instruction with a dedicated language trainer - covering sales-specific vocabulary, live simulation calls, and real negotiation practice. Every graduate achieves at least one CEFR level improvement, certified.',
    idealFor: 'SDRs, BDRs, Account Executives, and Account Managers working across European markets or preparing for international roles.',
  },
  {
    code: 'CONA-201',
    title: 'Applied Artificial Intelligence for Sales',
    status: 'Forthcoming',
    statusColor: U.inkMute,
    partner: 'Altkom',
    price: null,
    duration: 'TBC',
    hours: 'TBC',
    format: 'Live group + e-learning',
    flagship: false,
    outcomes: [
      'Practical AI tools for prospecting and pipeline management',
      'CRM intelligence and automation workflows',
      'Prompt engineering for sales communications',
      'Data-driven decision making with AI assistants',
    ],
    description: 'Practical AI tools for prospecting, CRM intelligence, and workflow automation. Hands-on training updated quarterly with the latest enterprise platforms and methodologies.',
    idealFor: 'Sales professionals looking to integrate AI into their daily workflow and gain a competitive edge in enterprise environments.',
  },
  {
    code: 'CONA-301',
    title: 'Sales Leadership Programme',
    status: 'Forthcoming',
    statusColor: U.inkMute,
    partner: 'Altkom',
    price: null,
    duration: 'TBC',
    hours: 'TBC',
    format: 'Live sessions + certification',
    flagship: false,
    outcomes: [
      'Leadership foundations for sales managers',
      'Delegation, motivation, and team dynamics',
      'Strategic thinking and pipeline forecasting',
      'Industry-recognised leadership certification',
    ],
    description: 'For current and aspiring sales managers. Leadership foundations, delegation, motivation, strategic thinking - with industry-recognised certification on completion.',
    idealFor: 'Senior AEs, team leads, and newly promoted sales managers transitioning from individual contributor to leadership.',
  },
  {
    code: 'CONA-401',
    title: 'Digital Marketing for Sales Professionals',
    status: 'Forthcoming',
    statusColor: U.inkMute,
    partner: 'Altkom',
    price: null,
    duration: 'TBC',
    hours: 'TBC',
    format: 'Live sessions + certification',
    flagship: false,
    outcomes: [
      'Google Analytics for pipeline attribution',
      'LinkedIn Ads strategy and campaign optimisation',
      'Data-driven selling and marketing alignment',
      'Industry-recognised digital marketing certification',
    ],
    description: 'Google Analytics, LinkedIn Ads strategy, and campaign optimisation. Data-driven selling for professionals who want to understand their pipeline from source to close.',
    idealFor: 'Sales professionals who collaborate closely with marketing teams or want to build personal brand and pipeline through digital channels.',
  },
];

// ── Flagship Feature Card ──────────────────────────────────────
function FlagshipCard() {
  const p = programmes[0];
  return (
    <section id="flagship" style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.parchment }}>
      <SectionHead
        kicker="Flagship Programme"
        title={p.title}
        sub={`${p.code} - ${p.partner} - ${p.status}`}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <div style={{
            background: U.white, border: `1px solid ${U.rule}`,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 0,
          }}>
            {/* Left - Details */}
            <div style={{ padding: 'clamp(32px, 4vw, 48px)', borderRight: `1px solid ${U.rule}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <span style={{ width: 8, height: 8, background: U.gold, borderRadius: '50%' }} />
                <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep }}>
                  {p.code} - Now Enrolling
                </span>
              </div>

              <p style={{ fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.7, color: U.inkSoft, margin: '0 0 28px' }}>
                {p.description}
              </p>

              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 10 }}>
                Available Languages
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                {p.languages.map((lang) => (
                  <span key={lang} style={{
                    fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 500,
                    padding: '6px 14px', border: `1px solid ${U.rule}`, color: U.navy,
                  }}>
                    {lang}
                  </span>
                ))}
              </div>

              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 10 }}>
                Ideal For
              </div>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.65, color: U.inkSoft, margin: 0 }}>
                {p.idealFor}
              </p>
            </div>

            {/* Right - Quick facts + outcomes */}
            <div style={{ padding: 'clamp(32px, 4vw, 48px)' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
                paddingBottom: 28, marginBottom: 28, borderBottom: `1px solid ${U.rule}`,
              }}>
                {[
                  { label: 'Duration', value: p.duration },
                  { label: 'Contact Hours', value: p.hours },
                  { label: 'Format', value: p.format },
                  { label: 'Tuition', value: `EUR ${p.price}` },
                ].map((f) => (
                  <div key={f.label}>
                    <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.inkMute, marginBottom: 6 }}>
                      {f.label}
                    </div>
                    <div style={{ fontFamily: Ufonts.display, fontSize: 20, fontWeight: 500, color: U.navy }}>
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 14 }}>
                Programme Outcomes
              </div>
              {p.outcomes.map((o, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: Ufonts.mono, fontSize: 9, color: U.gold, marginTop: 4, flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.55, color: U.inkSoft }}>
                    {o}
                  </span>
                </div>
              ))}

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
                <Link to="/programmes/business-language" style={{
                  display: 'inline-block',
                  fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: U.navy, background: U.gold, padding: '14px 28px', textDecoration: 'none',
                }}>
                  View Full Programme
                </Link>
                <Link to="/assessment" style={{
                  display: 'inline-block',
                  fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: U.navy, border: `1.5px solid ${U.navy}`, padding: '14px 28px', textDecoration: 'none',
                }}>
                  Book Free Assessment
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Forthcoming Programmes ────────────────────────────────────
function ForthcomingProgrammes() {
  const forthcoming = programmes.filter((p) => !p.flagship);

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory }}>
      <SectionHead
        kicker="In Development"
        title="Forthcoming Programmes"
        sub="Three additional programmes are being developed with our partner Altkom. Register your interest to be notified when enrolment opens."
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 0 }}>
        {forthcoming.map((p, i) => (
          <FadeIn key={p.code} delay={i * 0.1}>
            <div style={{
              padding: '36px 32px',
              borderRight: i < forthcoming.length - 1 ? `1px solid ${U.rule}` : 'none',
              height: '100%', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep }}>
                  {p.code}
                </span>
                <span style={{
                  fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: U.inkMute, padding: '4px 10px', border: `1px solid ${U.rule}`,
                }}>
                  {p.status}
                </span>
              </div>

              <h3 style={{
                fontFamily: Ufonts.display, fontSize: 26, fontWeight: 500, lineHeight: 1.15,
                color: U.navy, margin: '0 0 14px',
              }}>
                {p.title}
              </h3>

              <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.7, color: U.inkSoft, margin: '0 0 20px', flex: 1 }}>
                {p.description}
              </p>

              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 10 }}>
                Expected Outcomes
              </div>
              {p.outcomes.map((o, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: Ufonts.mono, fontSize: 9, color: U.gold, marginTop: 3, flexShrink: 0 }}>0{j + 1}</span>
                  <span style={{ fontFamily: Ufonts.serif, fontSize: 14, lineHeight: 1.5, color: U.inkSoft }}>
                    {o}
                  </span>
                </div>
              ))}

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${U.ruleSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: U.inkMute }}>
                  With {p.partner}
                </span>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: U.inkMute }}>
                  {p.duration} - {p.hours}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── How to Enrol ──────────────────────────────────────────────
function HowToEnrol() {
  const steps = [
    { num: '01', title: 'Free Development Assessment', desc: 'A 30-minute conversation to understand your goals, current level, and career trajectory. No obligation, no cost.' },
    { num: '02', title: 'Personalised Learning Path', desc: 'Based on your assessment, we recommend the programme and schedule that fits your needs and budget.' },
    { num: '03', title: 'Manager Approval', desc: 'If using education reimbursement, submit the programme for approval through your employer. We provide all required documentation.' },
    { num: '04', title: 'Begin Your Programme', desc: 'Start your structured programme with qualified instructors. Track progress, receive feedback, earn your certification.' },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.navy }}>
      <SectionHead
        light
        kicker="Admissions"
        title="How to Enrol"
        sub="From first conversation to certification - a clear, straightforward process."
      />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {steps.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{
              display: 'flex', gap: 28, alignItems: 'flex-start',
              padding: '28px 0',
              borderBottom: i < steps.length - 1 ? '1px solid rgba(200,162,74,0.15)' : 'none',
            }}>
              <span style={{
                fontFamily: Ufonts.mono, fontSize: 12, letterSpacing: '0.2em',
                color: U.gold, flexShrink: 0, marginTop: 4,
              }}>
                {s.num}
              </span>
              <div>
                <h3 style={{
                  fontFamily: Ufonts.display, fontSize: 24, fontWeight: 500,
                  color: U.ivory, margin: '0 0 8px',
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.6)', margin: 0,
                }}>
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="cta" style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.parchment, textAlign: 'center' }}>
      <FadeIn>
        <Crest size={56} color={U.gold} />
        <h2 style={{
          fontFamily: Ufonts.display,
          fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, lineHeight: 1.1,
          color: U.navy, margin: '28px 0 16px',
        }}>
          Not sure which programme fits?
        </h2>
        <p style={{
          fontFamily: Ufonts.serif, fontStyle: 'italic',
          fontSize: 18, lineHeight: 1.6, color: U.inkSoft,
          maxWidth: 560, margin: '0 auto 36px',
        }}>
          Book a free Development Assessment. In 30 minutes, we will map your goals
          and recommend the right programme for your career.
        </p>
        <Link to="/assessment" style={{
          display: 'inline-block',
          fontFamily: Ufonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: U.ivory, background: U.navy, padding: '16px 36px', textDecoration: 'none',
        }}>
          Book Free Assessment
        </Link>
        <div style={{
          marginTop: 20,
          fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.16em', color: U.inkMute,
        }}>
          admissions@conatus.academy
        </div>
      </FadeIn>
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
export default function ConatusProgrammes() {
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
        <FlagshipCard />
        <ForthcomingProgrammes />
        <HowToEnrol />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
