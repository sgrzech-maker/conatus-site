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
          <Link className="m-nav-cta" to="/assessment" style={{
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
    <section className="m-hero" style={{
      minHeight: '90vh', display: 'flex', alignItems: 'center',
      background: U.navy, position: 'relative', overflow: 'hidden',
    }}>
      {/* Parchment frame */}
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />

      <div className="m-hero-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px, 10vw, 160px) 5% clamp(80px, 8vw, 120px)', position: 'relative', zIndex: 1, width: '100%' }}>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Crest size={48} color={U.gold} />
            <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold }}>
              Professional Development for Enterprise Sales
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 style={{
            fontFamily: Ufonts.display,
            fontSize: 'clamp(44px, 6.5vw, 88px)', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.018em',
            margin: '0 0 28px', color: U.ivory, maxWidth: 900,
          }}>
            The Sales Academy
            <br />
            <span style={{ color: U.gold, fontStyle: 'italic', fontWeight: 400 }}>built for enterprise.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p style={{
            fontFamily: Ufonts.serif, fontSize: 19, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 0 40px',
          }}>
            Structured programmes in business languages, sales leadership, AI and digital marketing - designed for professionals at the world's leading technology companies.
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
            <Link to="/programmes" style={{
              fontFamily: Ufonts.sans, fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
              color: U.navy, background: U.gold, padding: '15px 28px', textDecoration: 'none',
            }}>Explore Programmes</Link>
            <Link to="/assessment" style={{
              fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 16, color: U.ivory,
              textDecoration: 'underline', textUnderlineOffset: 5, textDecorationColor: U.gold,
              padding: '15px 0', display: 'inline-flex', alignItems: 'center',
            }}>Free Development Assessment</Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.65}>
          <div style={{ display: 'flex', gap: 'clamp(24px, 4vw, 48px)', paddingTop: 32, borderTop: '1px solid rgba(200,162,74,0.2)', flexWrap: 'wrap' }}>
            {[
              ['Programmes', 'Languages, AI, Leadership, Marketing'],
              ['Format', 'Live individual instruction'],
              ['Certification', 'CEFR, industry-recognised'],
            ].map((r, i) => (
              <div key={i}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
                  {r[0]}
                </div>
                <div style={{ fontFamily: Ufonts.display, fontSize: 16, fontWeight: 500, color: U.ivory }}>
                  {r[1]}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Trust Bar ─────────────────────────────────────────────────
function TrustBar() {
  return (
    <section style={{ background: U.ivory, borderBottom: `1px solid ${U.rule}`, padding: '20px 5%' }}>
      <div className="m-trust-bar" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: Ufonts.mono, fontSize: 10, color: U.inkMute, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Courses delivered with our training partners
        </span>
        {['Accredited Language School', 'Altkom Akademia'].map((l, i) => (
          <div key={i} style={{
            padding: '6px 16px', border: `1px solid ${U.rule}`,
            fontFamily: Ufonts.serif, fontSize: 14, fontWeight: 600, color: U.inkSoft,
          }}>{l}</div>
        ))}
      </div>
    </section>
  );
}

// ── Four Programmes ───────────────────────────────────────────
function FourProgrammes() {
  const programmes = [
    {
      code: 'CONA-101',
      title: 'Business Language for Sales Professionals',
      desc: 'Guaranteed one CEFR level improvement in 12 weeks. French, German, Spanish, Italian - with sales-specific vocabulary, live simulation calls, and real negotiation practice.',
      partner: 'Accredited Partner',
      status: 'Now Enrolling',
      statusColor: U.gold,
    },
    {
      code: 'CONA-201',
      title: 'Applied Artificial Intelligence for Sales',
      desc: 'Practical AI tools for prospecting, CRM intelligence, and workflow automation. Hands-on training updated quarterly with the latest enterprise platforms.',
      partner: 'Altkom',
      status: 'Forthcoming',
      statusColor: U.inkMute,
    },
    {
      code: 'CONA-301',
      title: 'Sales Leadership Programme',
      desc: 'For current and aspiring sales managers. Leadership foundations, delegation, motivation, strategic thinking - with industry-recognised certification on completion.',
      partner: 'Altkom',
      status: 'Forthcoming',
      statusColor: U.inkMute,
    },
    {
      code: 'CONA-401',
      title: 'Digital Marketing for Sales Professionals',
      desc: 'Google Analytics, LinkedIn Ads strategy, and campaign optimisation. Data-driven selling for professionals who want to understand their pipeline from source to close.',
      partner: 'Altkom',
      status: 'Forthcoming',
      statusColor: U.inkMute,
    },
  ];

  return (
    <section id="programmes" style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <SectionHead
        kicker="What We Teach"
        title="Four Disciplines of Professional Growth"
        sub="Each programme combines world-class instruction with practical application specific to enterprise sales."
      />

      <div className="m-programme-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>
        {programmes.map((p, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{
              padding: '36px 32px',
              borderRight: i < 3 ? `1px solid ${U.rule}` : 'none',
              height: '100%',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep }}>
                  {p.code}
                </span>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.statusColor }}>
                  {p.status}
                </span>
              </div>

              <h3 style={{
                fontFamily: Ufonts.display, fontSize: 26, fontWeight: 500, lineHeight: 1.15,
                color: U.navy, margin: '0 0 14px',
              }}>
                {p.code === 'CONA-101' ? (
                  <Link to="/programmes/business-language" style={{ color: 'inherit', textDecoration: 'none' }}>{p.title}</Link>
                ) : p.title}
              </h3>

              <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.7, color: U.inkSoft, margin: 0, flex: 1 }}>
                {p.desc}
              </p>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${U.ruleSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: U.inkMute }}>
                  With {p.partner}
                </span>
                {p.code === 'CONA-101' && (
                  <Link to="/programmes/business-language" style={{
                    fontFamily: Ufonts.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: U.goldDeep, textDecoration: 'none',
                  }}>View Programme →</Link>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 16, color: U.inkSoft }}>
            Not sure which programme fits?{' '}
            <Link to="/assessment" style={{ color: U.goldDeep, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 4, textDecorationColor: U.gold }}>
              Take our free Development Assessment
            </Link>
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

// ── CONAT Method ──────────────────────────────────────────────
function Method() {
  const steps = [
    { l: 'C', name: 'Calibrate', desc: 'Free Development Assessment - skill gap analysis, language placement, and career goal mapping.' },
    { l: 'O', name: 'Orient', desc: 'Custom Learning Path - we match you with the right programme, instructor, and timeline.' },
    { l: 'N', name: 'Nurture', desc: 'Core development through structured programmes - live instruction, practice, and feedback.' },
    { l: 'A', name: 'Accelerate', desc: 'Applied practice - mock calls, presentations, negotiations, and real-world simulation.' },
    { l: 'T', name: 'Transform', desc: 'Certification, documented outcomes, and career advancement. Measurable results.' },
  ];

  return (
    <section id="method" style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.navy, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 24px)', border: '1px solid rgba(200,162,74,0.12)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHead
          kicker="Our Methodology"
          title={<>The CONAT Method</>}
          sub={<>From Spinoza's <em>conatus</em> - the innate drive to persist and excel. Five phases that transform potential into measurable growth.</>}
          light
        />

        <div className="m-method-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                padding: '32px 24px',
                borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 52, height: 52, margin: '0 auto 16px',
                  background: 'rgba(200,162,74,0.12)', border: `1px solid rgba(200,162,74,0.25)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: Ufonts.display, fontSize: 24, fontWeight: 600, color: U.gold,
                }}>
                  {s.l}
                </div>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.gold, marginBottom: 8 }}>
                  Phase {i + 1}
                </div>
                <h3 style={{ fontFamily: Ufonts.display, fontSize: 22, fontWeight: 500, color: U.ivory, margin: '0 0 10px' }}>
                  {s.name}
                </h3>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link to="/assessment" style={{
              fontFamily: Ufonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: U.ivory, border: `1px solid ${U.gold}`, padding: '13px 28px', textDecoration: 'none',
            }}>Start With a Free Assessment</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Flagship Programme Feature ────────────────────────────────
function FlagshipFeature() {
  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div className="m-grid-stack" style={{
            border: `1px solid ${U.navy}`,
            display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(260px, 1fr)',
          }}>
            <div style={{ padding: 'clamp(28px, 3vw, 48px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ width: 8, height: 8, background: U.gold, borderRadius: '50%' }} />
                <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep }}>
                  CONA-101 - Flagship - Now Enrolling
                </span>
              </div>
              <h3 style={{
                fontFamily: Ufonts.display, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 500, lineHeight: 1.04,
                margin: '0 0 16px', color: U.navy,
              }}>
                Business Language for<br />Sales Professionals
              </h3>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.7, color: U.inkSoft, margin: '0 0 28px', maxWidth: 540 }}>
                An intensive twelve-week programme combining business language with realistic enterprise sales scenarios - discovery calls, negotiations, executive presentations, stakeholder management - all in the target language. Certified to CEFR level on completion.
              </p>

              <div className="m-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', borderTop: `1px solid ${U.rule}`, paddingTop: 18, gap: 16 }}>
                {[
                  ['Duration', '12 weeks'],
                  ['Hours', '50+ live'],
                  ['Format', 'Individual instruction'],
                  ['Languages', 'FR, ES, IT, DE'],
                  ['Certification', 'CEFR level'],
                ].map((r, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.inkMute, marginBottom: 6 }}>
                      {r[0]}
                    </div>
                    <div style={{ fontFamily: Ufonts.display, fontSize: 18, fontWeight: 500, color: U.navy }}>
                      {r[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: U.navy, color: U.ivory,
              padding: 'clamp(28px, 3vw, 48px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 16, right: 16, opacity: 0.2 }}>
                <Crest size={56} color={U.gold} />
              </div>
              <div>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 16 }}>
                  Tuition
                </div>
                <div style={{
                  fontFamily: Ufonts.display, fontSize: 'clamp(48px, 5vw, 80px)', fontWeight: 500, lineHeight: 0.94,
                  color: U.ivory,
                }}>
                  {'€'}3,995
                </div>
                <div style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
                  per participant - all-inclusive
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(200,162,74,0.3)', paddingTop: 18, marginTop: 32 }}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.gold, marginBottom: 8 }}>
                  Reimbursement Eligible
                </div>
                <div style={{ fontFamily: Ufonts.serif, fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
                  Institution-named invoice, course description, learning outcomes report and CEFR certificate provided.
                </div>
                <Link to="/programmes/business-language" style={{
                  display: 'inline-block', marginTop: 20,
                  fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: U.navy, background: U.gold, padding: '12px 24px', textDecoration: 'none',
                }}>View Full Programme</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Faculty ───────────────────────────────────────────────────
function Faculty() {
  const instructors = [
    { name: 'Karolina Gajdos', photo: '/faculty/karolina-gajdos.jpg', initials: 'KG', language: 'Spanish', bio: 'Nearly two decades helping professionals communicate with confidence in international business environments. ICF-accredited specialist in professional language development.' },
    { name: 'Monika Wajnberg', photo: '/faculty/monika-wajnberg.jpg', initials: 'MW', language: 'French', bio: 'Over 16 years working with French clients and companies. Deep understanding of cultural nuances critical in international business communication.' },
    { name: 'Dorota Rafacz', photo: '/faculty/dorota-rafacz.jpg', initials: 'DR', language: 'German', bio: 'Business English and German specialist supporting learners from A1 to C2. Known for tailoring instruction to individual professional needs.' },
    { name: 'Marcin Soltysiński', photo: '/faculty/marcin-soltysinski.jpg', initials: 'MS', language: 'German', bio: 'German and English specialist with three decades of experience in Cologne. Adapts instruction to diverse professional backgrounds and industries.' },
    { name: 'Aleksandra Barysenka', photo: '/faculty/aleksandra-barysenka.jpg', initials: 'AB', language: 'Italian', bio: 'Italian Philology graduate specialising in business communication. Focused on building confidence and fluency in professional situations.' },
  ];

  return (
    <section style={{ padding: 'clamp(60px, 6vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <SectionHead
        kicker="The Faculty"
        title="Named instructors. Verifiable credentials."
        sub="Every programme is delivered by a named, qualified instructor employed by an established institution - not a freelancer marketplace."
      />
      <div className="m-faculty-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 24 }}>
        {instructors.map((f, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <article style={{ textAlign: 'center' }}>
              <div style={{
                width: 160, height: 200, margin: '0 auto 18px',
                background: U.parchment, border: `1px solid ${U.rule}`,
                overflow: 'hidden', position: 'relative',
              }}>
                <img src={f.photo} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div style={{
                  display: 'none', position: 'absolute', inset: 0,
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: Ufonts.display, fontSize: 48, fontWeight: 500, color: U.navy, opacity: 0.2,
                }}>{f.initials}</div>
              </div>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 6 }}>
                {f.language}
              </div>
              <h4 style={{ fontFamily: Ufonts.display, fontSize: 20, fontWeight: 500, color: U.navy, margin: '0 0 8px' }}>
                {f.name}
              </h4>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 13, lineHeight: 1.55, color: U.inkSoft, margin: 0 }}>
                {f.bio}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Testimonial ───────────────────────────────────────────────
function Testimonial() {
  return (
    <section style={{ padding: 'clamp(80px, 8vw, 120px) 5%', background: U.navy, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 24px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 28px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
            <Crest size={56} color={U.gold} />
          </div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold, marginBottom: 28 }}>
            From the Field
          </div>
          <blockquote style={{
            fontFamily: Ufonts.display, fontStyle: 'italic',
            fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, lineHeight: 1.22,
            color: U.ivory, margin: 0,
          }}>
            <span style={{ color: U.gold, fontStyle: 'normal' }}>"</span>
            I could already speak German - or so I thought. But every time I tried to use it in a real sales situation, I froze. Twelve weeks of structured training turned my conversational German into something I could actually sell with. The difference was having someone who understood what business fluency really means.
            <span style={{ color: U.gold, fontStyle: 'normal' }}>"</span>
          </blockquote>
          <div style={{ marginTop: 36 }}>
            <div style={{ width: 32, height: 1, background: U.gold, margin: '0 auto 14px' }} />
            <div style={{ fontFamily: Ufonts.display, fontSize: 18, fontWeight: 600, color: U.ivory }}>
              Adam Krawiec
            </div>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,162,74,0.85)', marginTop: 6 }}>
              Account Executive - Enterprise Sales - DACH
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Reimbursement Banner ──────────────────────────────────────
function ReimburseBanner() {
  return (
    <section style={{ padding: 'clamp(48px, 5vw, 72px) 5%', background: U.parchment, borderBottom: `1px solid ${U.rule}` }}>
      <div className="m-grid-stack" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 40, alignItems: 'center' }}>
        <FadeIn>
          <div>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 12 }}>
              Education Reimbursement
            </div>
            <h3 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 500, color: U.navy, margin: '0 0 12px', lineHeight: 1.15 }}>
              Your employer may cover the full cost.
            </h3>
            <p style={{ fontFamily: Ufonts.serif, fontSize: 16, color: U.inkSoft, lineHeight: 1.65, margin: 0, maxWidth: 600 }}>
              Many enterprise technology companies offer education reimbursement benefits that can cover the full cost of our programmes. See if you qualify.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Link to="/reimbursement" style={{
            fontFamily: Ufonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: U.navy, background: U.gold, padding: '14px 24px', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>See If You Qualify</Link>
        </FadeIn>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="cta" style={{
      padding: 'clamp(80px, 8vw, 120px) 5%', background: U.navy, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
            <Crest size={64} color={U.gold} />
          </div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold, marginBottom: 24 }}>
            Your Next Step
          </div>
          <h2 style={{
            fontFamily: Ufonts.display, fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 500, lineHeight: 1,
            margin: 0, color: U.ivory,
          }}>
            Get your free <span style={{ fontStyle: 'italic', color: U.gold }}>Development Assessment.</span>
          </h2>
          <p style={{
            fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)',
            margin: '24px auto 20px', maxWidth: 680,
          }}>
            A twenty-minute conversation, by appointment. We evaluate your current skills, understand your career goals, and design a personalised learning path - completely free, no obligations.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 28px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {['Skill gap analysis', 'Language placement', 'Programme recommendations', 'Reimbursement guidance'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: Ufonts.display, fontSize: 16, color: U.gold }}>&#10003;</span>
                <span style={{ fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{item}</span>
              </div>
            ))}
          </div>

          <Link to="/assessment" style={{
            fontFamily: Ufonts.sans, fontSize: 14, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: U.navy, background: U.gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-block',
          }}>Book Your Free Assessment</Link>
        </FadeIn>
      </div>
    </section>
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
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>
            Programmes
          </div>
          <Link to="/programmes/business-language" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Business Language</Link>
          <Link to="/programmes" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Applied AI</Link>
          <Link to="/programmes" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Sales Leadership</Link>
          <Link to="/programmes" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Digital Marketing</Link>
        </div>
        <div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>
            Resources
          </div>
          <Link to="/assessment" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Free Assessment</Link>
          <Link to="/reimbursement" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Reimbursement</Link>
          <Link to="/bulletin" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>Bulletin</Link>
          <Link to="/contact" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>FAQ</Link>
        </div>
        <div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>
            Contact
          </div>
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

// ── Main ──────────────────────────────────────────────────────
export default function ConatusHome() {
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
        <TrustBar />
        <FourProgrammes />
        <FlagshipFeature />
        <Method />
        <Faculty />
        <Testimonial />
        <ReimburseBanner />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
