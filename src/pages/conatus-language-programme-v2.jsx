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
        <textPath href="#ring-top" startOffset="50%" textAnchor="middle">CONATUS · ACADEMIA</textPath>
      </text>
      <text fontFamily={Ufonts.display} fontSize="5" fill={color} letterSpacing="3">
        <textPath href="#ring-bottom" startOffset="50%" textAnchor="middle">MMXXIV</textPath>
      </text>
    </svg>
  );
}

// ── Shield Logo ────────────────────────────────────────────────
function Shield({ size = 36, color = U.gold, bg = 'transparent' }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none" aria-label="Conatus Academy">
      <path d="M20 2 L37 7 L37 26 Q37 36 20 44 Q3 36 3 26 L3 7 Z"
            stroke={color} strokeWidth="1.2" fill={bg} strokeLinejoin="miter" />
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
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Section Header Helper ─────────────────────────────────────
function SectionHead({ kicker, title, sub, light }) {
  const kickerColor = light ? U.gold : U.goldDeep;
  const titleColor = light ? U.ivory : U.navy;
  const subColor = light ? 'rgba(255,255,255,0.7)' : U.inkSoft;
  return (
    <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18 }}>
        <span style={{ width: 28, height: 1, background: kickerColor }} />
        <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: kickerColor, whiteSpace: 'nowrap' }}>
          {kicker}
        </span>
        <span style={{ width: 28, height: 1, background: kickerColor }} />
      </div>
      <h2 style={{
        fontFamily: Ufonts.display,
        fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.05,
        letterSpacing: '-0.012em', margin: 0,
        color: titleColor,
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
        <span>EN</span>
      </div>
    </div>
  );
}

// ── Masthead / Nav ────────────────────────────────────────────
function Masthead() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <header className="m-masthead" style={{
      background: U.navy, color: U.ivory,
      padding: '20px 5%',
      borderBottom: `3px solid ${U.gold}`,
    }}>
      <div className="m-masthead-inner" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Shield size={42} color={U.gold} />
          <div>
            <div style={{ fontFamily: Ufonts.display, fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, lineHeight: 1, color: U.ivory }}>
              Conatus Academy
            </div>
            <div className="m-masthead-subtitle" style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', color: U.gold, textTransform: 'uppercase', marginTop: 4 }}>
              A School for Sales Professionals - Est. MMXXIV
            </div>
          </div>
        </div>
        <nav className="m-nav" style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Programmes', to: '/programmes' },
            { label: 'CONAT Method', to: '/method' },
            { label: 'Bulletin', to: '/bulletin' },
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' },
          ].map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              onMouseEnter={() => setHoveredLink(l.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontFamily: Ufonts.display, fontSize: 16, fontWeight: 500, letterSpacing: '0.005em',
                color: hoveredLink === l.label ? U.gold : (i === 0 ? U.gold : U.ivory),
                textDecoration: 'none',
                borderBottom: i === 0 ? `1.5px solid ${U.gold}` : '1.5px solid transparent',
                paddingBottom: 4,
                transition: 'color 0.2s ease',
              }}
            >{l.label}</Link>
          ))}
          <Link to="/assessment" style={{
            fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: U.navy, background: U.gold, padding: '10px 18px', textDecoration: 'none',
            transition: 'background 0.2s ease',
          }}>Apply for Your Team</Link>
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
      padding: 'clamp(60px, 6vw, 88px) 5% clamp(60px, 6vw, 96px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Parchment border frame */}
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />

      <div className="m-grid-stack" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1px minmax(280px, 1fr)', gap: 'clamp(24px, 4vw, 56px)', alignItems: 'start' }}>
        <div>
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <Crest size={44} color={U.gold} />
              <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold }}>
                Office of Professional Development
              </div>
            </div>

            <h1 style={{
              fontFamily: Ufonts.display,
              fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.018em',
              margin: '0 0 28px',
            }}>
              Give your team the
              <br />
              <span style={{ color: U.gold, fontStyle: 'italic', fontWeight: 400 }}>language to close.</span>
            </h1>

            <p style={{
              fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.65,
              color: 'rgba(255,255,255,0.75)', margin: '0 0 36px', maxWidth: 600,
            }}>
              Enterprise sales teams operating across borders need more than English. They need the fluency to negotiate, present, and build trust in their client's native language. Conatus Academy delivers intensive, structured language programmes designed specifically for sales professionals.
            </p>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
              <Link to="/assessment" style={{
                fontFamily: Ufonts.sans, fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                color: U.navy, background: U.gold, padding: '15px 28px', textDecoration: 'none',
              }}>Schedule a Consultation</Link>
              <Link to="/programmes" style={{
                fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 16, color: U.ivory,
                textDecoration: 'underline', textUnderlineOffset: 5, textDecorationColor: U.gold,
              }}>Read the prospectus</Link>
            </div>

            {/* Trust strip */}
            <div style={{ display: 'flex', gap: 'clamp(20px, 3vw, 36px)', paddingTop: 28, borderTop: '1px solid rgba(200,162,74,0.2)', flexWrap: 'wrap' }}>
              {[
                ['Languages', 'French, Spanish, Italian, German'],
                ['Format', '12-week intensive programme'],
                ['Delivery', 'Individual instruction, live sessions'],
                ['Certification', 'CEFR level on completion'],
              ].map((r, i) => (
                <div key={i}>
                  <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
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

        <div className="m-grid-divider" style={{ background: 'rgba(200,162,74,0.2)', alignSelf: 'stretch' }} />

        {/* Admissions card */}
        <aside>
          <FadeIn delay={150}>
            <div style={{
              background: U.ivory, color: U.ink,
              padding: '28px 28px 32px',
              border: `1px solid ${U.goldDeep}`,
              boxShadow: `8px 8px 0 ${U.navyMid}`,
            }}>
              <div style={{ textAlign: 'center', marginBottom: 18 }}>
                <Crest size={56} color={U.goldDeep} />
              </div>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep, textAlign: 'center', marginBottom: 8 }}>
                Now Accepting Applications
              </div>
              <h3 style={{
                fontFamily: Ufonts.display, fontSize: 24, fontWeight: 600, lineHeight: 1.15,
                color: U.navy, margin: '0 0 4px', textAlign: 'center',
              }}>
                Business Language for<br />Sales Professionals
              </h3>
              <div style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14, color: U.inkSoft, textAlign: 'center', marginBottom: 18 }}>
                A twelve-week intensive - Cohort Vernal MMXXVI
              </div>

              <div style={{ borderTop: `1px solid ${U.rule}`, borderBottom: `1px solid ${U.rule}`, padding: '12px 0', marginBottom: 18 }}>
                {[
                  ['Duration', '12 weeks'],
                  ['Contact hours', '50+ live'],
                  ['Format', 'Individual instruction'],
                  ['Certification', 'CEFR level'],
                ].map((r, i, arr) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto', gap: 12,
                    padding: '7px 0',
                    borderBottom: i < arr.length - 1 ? `1px dotted ${U.ruleSoft}` : 'none',
                  }}>
                    <span style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: U.inkMute }}>{r[0]}</span>
                    <span style={{ fontFamily: Ufonts.serif, fontSize: 13, color: U.ink, fontWeight: 600 }}>{r[1]}</span>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 6 }}>
                  Tuition
                </div>
                <div style={{ fontFamily: Ufonts.display, fontSize: 44, fontWeight: 600, lineHeight: 1, color: U.navy }}>
                  {'€'}3,995
                </div>
                <div style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 12, color: U.inkMute, marginTop: 4 }}>
                  per participant - all-inclusive
                </div>
              </div>

              <Link to="/contact" style={{
                display: 'block', textAlign: 'center',
                fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: U.ivory, background: U.navy, padding: '12px 0', textDecoration: 'none',
              }}>Request the Prospectus</Link>

              <div style={{ marginTop: 14, fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: U.goldDeep, textAlign: 'center' }}>
                Eligible for employer education reimbursement
              </div>
            </div>
          </FadeIn>
        </aside>
      </div>
    </section>
  );
}

// ── The Challenge ──────────────────────────────────────────────
function Challenge() {
  return (
    <section style={{ padding: 'clamp(60px, 6vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <SectionHead
        kicker="The Case for Language"
        title={<>Three barriers between your team<br />and the next market.</>}
        sub="Enterprise sales is won or lost in the nuance. These are the patterns we see across every international sales organisation we work with."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0, maxWidth: 1280, margin: '0 auto' }}>
        {[
          {
            num: 'I',
            title: 'Professional language gaps',
            body: 'Your team can hold a social conversation in the target language - but cannot negotiate contract terms, handle objections, or present to a C-suite in it. The gap between conversational and professional fluency is where deals are lost.',
          },
          {
            num: 'II',
            title: 'Expansion into new markets',
            body: 'Every new region demands local-language competence. Clients in Germany, France, Spain and Italy expect their partners to speak their language - not just in meetings but in follow-up emails, proposals and presentations.',
          },
          {
            num: 'III',
            title: 'Cross-border team communication',
            body: 'International sales teams default to English as a common ground - but critical context gets lost in translation. Internal alignment suffers when half the team cannot communicate with full precision.',
          },
        ].map((p, i) => (
          <FadeIn key={i} delay={i * 80}>
            <article style={{
              padding: '0 36px',
              borderRight: i < 2 ? `1px solid ${U.rule}` : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                width: 56, height: 56, margin: '0 auto 22px',
                border: `1.5px solid ${U.gold}`, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: Ufonts.display, fontSize: 22, fontWeight: 600, color: U.goldDeep, fontStyle: 'italic',
              }}>
                {p.num}
              </div>
              <h3 style={{
                fontFamily: Ufonts.display, fontSize: 24, fontWeight: 500, lineHeight: 1.2, color: U.navy,
                margin: '0 0 12px',
              }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.7, color: U.inkSoft, margin: 0 }}>
                {p.body}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Programmes ────────────────────────────────────────────────
function Programmes() {
  return (
    <section style={{ padding: 'clamp(60px, 6vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <SectionHead
        kicker="Course Catalogue - MMXXVI"
        title="Programmes of Study"
        sub="A flagship programme now enrolling, with further courses forthcoming."
      />

      {/* Flagship */}
      <FadeIn>
        <div className="m-grid-stack" style={{
          maxWidth: 1280, margin: '0 auto 28px',
          background: U.ivory,
          border: `1px solid ${U.navy}`,
          display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(240px, 1fr)',
        }}>
          <div style={{ padding: 'clamp(28px, 3vw, 44px) clamp(28px, 3vw, 48px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, background: U.gold, borderRadius: '50%' }} />
              <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep }}>
                CONA-101 - Flagship - Now Enrolling
              </span>
            </div>
            <h3 style={{
              fontFamily: Ufonts.display, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 500, lineHeight: 1.04,
              letterSpacing: '-0.015em', margin: '0 0 16px', color: U.navy,
            }}>
              Business Language for<br />Sales Professionals
            </h3>
            <p style={{ fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.7, color: U.inkSoft, margin: '0 0 28px', maxWidth: 540 }}>
              An intensive twelve-week programme combining business language with realistic enterprise sales scenarios - discovery calls, negotiations, executive presentations, stakeholder management - all in the target language. Certified to CEFR level on completion.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', borderTop: `1px solid ${U.rule}`, paddingTop: 18, gap: 16 }}>
              {[
                ['Duration', '12 weeks'],
                ['Hours', '50+ live'],
                ['Format', 'Individual instruction'],
                ['Languages', 'FR, ES, IT, DE'],
              ].map((r, i) => (
                <div key={i}>
                  <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.inkMute, marginBottom: 6 }}>
                    {r[0]}
                  </div>
                  <div style={{ fontFamily: Ufonts.display, fontSize: 20, fontWeight: 500, color: U.navy }}>
                    {r[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: U.navy, color: U.ivory,
            padding: 'clamp(28px, 3vw, 44px) clamp(24px, 3vw, 40px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 16, right: 16, opacity: 0.25 }}>
              <Crest size={56} color={U.gold} />
            </div>
            <div>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 16 }}>
                Tuition
              </div>
              <div style={{
                fontFamily: Ufonts.display, fontSize: 'clamp(48px, 5.5vw, 84px)', fontWeight: 500, lineHeight: 0.94,
                letterSpacing: '-0.025em', color: U.ivory,
              }}>
                {'€'}3,995
              </div>
              <div style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
                per participant - all-inclusive
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(200,162,74,0.32)', paddingTop: 18, marginTop: 32 }}>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.gold, marginBottom: 8 }}>
                Reimbursement Eligible
              </div>
              <div style={{ fontFamily: Ufonts.serif, fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
                Institution-named invoice, course description, learning outcomes report and CEFR certificate provided to every participant.
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Forthcoming - generic placeholders */}
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {[
          { code: 'CONA-201', title: 'Applied Artificial Intelligence for Sales', body: 'Practical AI for sales workflows - analytics, automation, pipeline intelligence and enterprise tooling.' },
          { code: 'CONA-301', title: 'Performance in Enterprise Organisations', body: 'Cross-disciplinary development combining sales methodology, language and technology for maximum impact.' },
        ].map((p, i) => (
          <FadeIn key={i} delay={i * 80}>
            <div style={{
              background: U.ivory, border: `1px solid ${U.rule}`,
              padding: '28px 28px 32px',
            }}>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 14 }}>
                {p.code} - Forthcoming - 2026
              </div>
              <h4 style={{
                fontFamily: Ufonts.display, fontSize: 22, fontWeight: 500, lineHeight: 1.18, color: U.navy,
                margin: '0 0 12px',
              }}>
                {p.title}
              </h4>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 14, lineHeight: 1.6, color: U.inkSoft, margin: 0 }}>
                {p.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Faculty ───────────────────────────────────────────────────
const facultyData = [
  {
    name: 'Karolina Gajdos',
    photo: '/faculty/karolina-gajdos.jpg',
    initials: 'KG',
    language: 'Spanish',
    role: 'Language Instructor - Spanish',
    bio: 'Nearly two decades of experience helping professionals communicate with confidence in international business environments. Background in English Philology with international experience in Spain, Germany and the UK. ICF-accredited specialist in professional language development, she supports participants in building not only fluency and accuracy but also effective communication strategies for real business situations - meetings, presentations, negotiations and everyday international collaboration.',
  },
  {
    name: 'Monika Wajnberg',
    photo: '/faculty/monika-wajnberg.jpg',
    initials: 'MW',
    language: 'French',
    role: 'Language Instructor - French',
    bio: 'Over 16 years of professional experience working with French clients and companies. Lived in France for several years in the fashion and sales industries - giving her deep understanding of the cultural nuances that are critical in international business communication. Delivers sessions based on authentic materials and modern teaching methods, ensuring the highest quality of course content.',
  },
  {
    name: 'Dorota Rafacz',
    photo: '/faculty/dorota-rafacz.jpg',
    initials: 'DR',
    language: 'German',
    role: 'Language Instructor - German',
    bio: 'English and German language specialist supporting learners at all levels from A1 to C2, with particular strength in Business English and German. Known for tailoring materials and exercises to individual needs, helping participants break through barriers while keeping learning engaging and motivating. Experienced across diverse professional contexts, including learners with different processing styles.',
  },
  {
    name: 'Marcin Soltysiński',
    photo: '/faculty/marcin-soltysinski.jpg',
    initials: 'MS',
    language: 'German',
    role: 'Language Instructor - German',
    bio: 'German and English specialist with three decades of experience in Cologne, where he completed studies in prevention and rehabilitation before pursuing an international career. Based in Warsaw since 2014, devoted to professional language instruction in German and English. Has worked with people from a wide range of professional backgrounds and industries, adapting his approach to different communication needs and business environments.',
  },
  {
    name: 'Aleksandra Barysenka',
    photo: '/faculty/aleksandra-barysenka.jpg',
    initials: 'AB',
    language: 'Italian',
    role: 'Language Instructor - Italian',
    bio: 'English and Italian language specialist, graduate of Italian Philology from the Jagiellonian University in Krakow. Specialises in business communication as well as practical and conversational language training. Focused on helping participants build confidence, fluency and natural communication skills in both everyday and professional situations.',
  },
];

function Faculty() {
  return (
    <section style={{ padding: 'clamp(60px, 6vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <SectionHead
        kicker="The Faculty"
        title="Named instructors. Verifiable credentials."
        sub="Every Conatus programme is delivered by a named instructor employed by our partner institution - not a freelancer marketplace. Qualified professionals with auditable track records in business language instruction."
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 28 }}>
        {facultyData.map((f, i) => (
          <FadeIn key={i} delay={i * 80}>
            <article style={{ textAlign: 'center' }}>
              <div style={{
                width: 200, height: 240, margin: '0 auto 22px',
                background: U.parchment,
                border: `1px solid ${U.rule}`,
                overflow: 'hidden',
                position: 'relative',
              }}>
                <img
                  src={f.photo}
                  alt={f.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  display: 'none', position: 'absolute', inset: 0,
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: Ufonts.display, fontSize: 56, fontWeight: 500, color: U.navy, opacity: 0.2,
                }}>
                  {f.initials}
                </div>
              </div>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 8 }}>
                {f.role}
              </div>
              <h4 style={{
                fontFamily: Ufonts.display, fontSize: 22, fontWeight: 500, lineHeight: 1.15,
                margin: '0 0 10px', color: U.navy,
              }}>
                {f.name}
              </h4>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 13.5, lineHeight: 1.6, color: U.inkSoft, margin: 0 }}>
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
    <section style={{ padding: 'clamp(80px, 8vw, 120px) 5%', background: U.navy, color: U.ivory, position: 'relative', overflow: 'hidden' }}>
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
            fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, lineHeight: 1.22, letterSpacing: '-0.012em',
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

// ── ROI / Course Comparison ───────────────────────────────────
function CourseComparison() {
  return (
    <section style={{ padding: 'clamp(60px, 6vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <SectionHead
        kicker="The Arithmetic"
        title="What separates a programme that works."
        sub="Most language courses have an 85% dropout rate. The few that work share the same structure - and it is the opposite of what most people buy."
      />

      <FadeIn>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          border: `1px solid ${U.navy}`,
          background: U.ivory,
        }}>
          {[
            { v: '85%', l: 'of people who start an online language course never finish it', source: 'Industry average' },
            { v: '6x', l: 'higher completion rate in structured programmes with live instruction vs. self-paced', source: 'Structured vs. self-paced' },
            { v: '50+', l: 'hours of live, instructor-led sessions - not pre-recorded videos or chatbot exercises', source: 'Conatus programme' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '40px',
              borderRight: i < 2 ? `1px solid ${U.rule}` : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 14 }}>
                {s.source}
              </div>
              <div style={{
                fontFamily: Ufonts.display, fontSize: 'clamp(48px, 5.5vw, 80px)', fontWeight: 500, lineHeight: 0.94,
                letterSpacing: '-0.025em', color: U.navy, marginBottom: 14,
              }}>
                {s.v}
              </div>
              <div style={{ width: 32, height: 1, background: U.gold, margin: '0 auto 14px' }} />
              <div style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14, lineHeight: 1.55, color: U.inkSoft }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ maxWidth: 1280, margin: '32px auto 0', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0, alignItems: 'center', border: `1px solid ${U.rule}`, padding: '28px 36px' }}>
          <div>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.inkMute, marginBottom: 6 }}>
              Generic Language App
            </div>
            <div style={{ fontFamily: Ufonts.serif, fontSize: 15, color: U.inkMute }}>
              Gamified, self-paced, no accountability, generic vocabulary
            </div>
          </div>
          <div style={{ padding: '0 40px', fontFamily: Ufonts.display, fontSize: 24, color: U.gold }}>
            vs.
          </div>
          <div>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 6 }}>
              Conatus Academy
            </div>
            <div style={{ fontFamily: Ufonts.serif, fontSize: 15, color: U.ink, fontWeight: 600 }}>
              Live instruction, sales-specific, structured, certified
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ── Compliance ────────────────────────────────────────────────
function Compliance() {
  return (
    <section style={{ padding: 'clamp(60px, 6vw, 96px) 5%', background: U.parchment, borderBottom: `1px solid ${U.rule}` }}>
      <div className="m-grid-stack" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'start' }}>
        <FadeIn>
          <div>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 14 }}>
              Office of the Registrar
            </div>
            <h2 style={{
              fontFamily: Ufonts.display, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.05,
              letterSpacing: '-0.012em', margin: '0 0 24px', color: U.navy,
            }}>
              An institution<br />of standing.
            </h2>
            <p style={{ fontFamily: Ufonts.serif, fontSize: 17, lineHeight: 1.7, color: U.inkSoft, margin: '0 0 28px' }}>
              Every detail - invoice format, syllabus structure, instructor credentials, certificate design - is engineered to satisfy procurement, finance and people-operations teams at the largest enterprise organisations. Documentation is the product.
            </p>
            <div style={{
              padding: 18, background: U.ivory,
              border: `1px solid ${U.rule}`,
              borderLeft: `3px solid ${U.gold}`,
            }}>
              <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14, color: U.inkSoft, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ fontStyle: 'normal', color: U.navy }}>Notice.</strong> Conatus Academy is an independent educational institution. We are not affiliated with, endorsed by, or partnered with any specific employer.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{
            background: U.ivory,
            border: `1px solid ${U.navy}`,
          }}>
            <div style={{
              padding: '14px 24px',
              background: U.navy, color: U.ivory,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ fontFamily: Ufonts.display, fontSize: 17, fontWeight: 500 }}>
                Certificate of Standing
              </div>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', color: U.gold }}>
                Reg. 2024 - KRS
              </div>
            </div>
            {[
              'Registered company (KRS - Republic of Poland)',
              'Named, qualified instructors for every programme',
              'Structured syllabi with documented learning objectives',
              'Certificates of completion with verifiable identifiers',
              'No incentives or referral fees to participants',
              'GDPR compliant data handling',
              'Proper invoicing with institution name and course detail',
            ].map((it, i, arr) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr 32px', alignItems: 'center', gap: 14,
                padding: '14px 24px',
                borderBottom: i < arr.length - 1 ? `1px solid ${U.ruleSoft}` : 'none',
              }}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.16em', color: U.goldDeep }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontFamily: Ufonts.serif, fontSize: 14, color: U.ink }}>{it}</div>
                <div style={{ fontFamily: Ufonts.display, fontSize: 17, color: U.gold, textAlign: 'right' }}>&#10003;</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  return (
    <section style={{ padding: 'clamp(60px, 6vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <SectionHead
        kicker="Letters & Replies"
        title="Frequently asked, faithfully answered."
      />
      <div style={{ maxWidth: 980, margin: '0 auto', borderTop: `1px solid ${U.navy}` }}>
        {[
          {
            q: 'Which languages are available?',
            a: 'The programme currently offers French, Spanish, Italian and German. All instruction is delivered by qualified language professionals employed by our partner institution. Additional languages may be available on request for cohorts of three or more.',
          },
          {
            q: 'What level do I need to start?',
            a: 'Every participant begins with a placement assessment. The programme accommodates learners from beginner (A1) through advanced (B2+), with instruction tailored to your current level and professional goals. The target is always functional business fluency.',
          },
          {
            q: 'How is this different from a standard language school?',
            a: 'Every session is built around enterprise sales scenarios - discovery calls, objection handling, negotiations, presentations, stakeholder management. You practise the language you will actually use at work, not textbook dialogues about hotel reservations.',
          },
          {
            q: 'What happens if I fall behind?',
            a: 'The programme is structured but flexible. Your instructor adjusts the pace to your progress. Missed sessions are rescheduled within the same week where possible. The twelve-week timeline allows for normal travel and work commitments.',
          },
          {
            q: 'Can my employer reimburse the tuition?',
            a: 'In many cases, yes. Most enterprise technology companies provide education reimbursement benefits that can cover the full tuition. Visit our Reimbursement page to learn more about the process.',
          },
          {
            q: 'Do you accommodate group enrolments?',
            a: 'Yes. Groups of three or more receive scheduling priority and a dedicated cohort coordinator, while remaining structured as individual enrolments. Each participant receives personalised instruction and their own certification.',
          },
        ].map((row, i) => (
          <details key={i} style={{ borderBottom: `1px solid ${U.rule}`, padding: '24px 0' }}>
            <summary style={{
              listStyle: 'none', cursor: 'pointer',
              display: 'grid', gridTemplateColumns: '76px 1fr 28px', gap: 16, alignItems: 'baseline',
            }}>
              <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.22em', color: U.goldDeep }}>
                Q - {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontFamily: Ufonts.display, fontSize: 'clamp(18px, 2vw, 23px)', fontWeight: 500, lineHeight: 1.3,
                color: U.navy,
              }}>
                {row.q}
              </span>
              <span style={{ fontFamily: Ufonts.display, fontSize: 24, color: U.gold, textAlign: 'right' }}>+</span>
            </summary>
            <div style={{ display: 'grid', gridTemplateColumns: '76px 1fr 28px', gap: 16, marginTop: 14 }}>
              <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.22em', color: U.inkMute }}>A.</span>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.65, color: U.inkSoft, margin: 0 }}>
                {row.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="cta" style={{
      padding: 'clamp(80px, 8vw, 120px) 5%', background: U.navy, color: U.ivory,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
            <Crest size={64} color={U.gold} />
          </div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold, marginBottom: 24 }}>
            Office of Corporate Admissions
          </div>
          <h2 style={{
            fontFamily: Ufonts.display, fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.022em',
            margin: 0,
          }}>
            Let us discuss <span style={{ fontStyle: 'italic', color: U.gold }}>your team.</span>
          </h2>
          <p style={{
            fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)',
            margin: '24px auto 36px', maxWidth: 680,
          }}>
            A twenty-minute consultation, by appointment, to discuss how Conatus Academy can equip your sales team with the language skills they need to win in new markets.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/assessment" style={{
              fontFamily: Ufonts.sans, fontSize: 14, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: U.navy, background: U.gold, padding: '16px 32px', textDecoration: 'none',
            }}>Schedule a Consultation</Link>
            <Link to="/contact" style={{
              fontFamily: Ufonts.sans, fontSize: 14, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
              color: U.ivory, border: `1px solid ${U.gold}`, padding: '15px 30px', textDecoration: 'none',
            }}>Request the Prospectus</Link>
          </div>
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
          <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 320 }}>
            An independent school for the structured professional development of enterprise sales professionals.
          </p>
          <p style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginTop: 18 }}>
            ul. Zamknieta 10/1.5, Krakow 30-554<br />
            NIP 6342934938
          </p>
        </div>
        <div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>Programmes</div>
          <Link to="/programmes/business-language" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>Business Language</Link>
          <Link to="/programmes" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>Applied AI</Link>
          <Link to="/programmes" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>Performance</Link>
        </div>
        <div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>Resources</div>
          <Link to="/assessment" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>Free Assessment</Link>
          <Link to="/reimbursement" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>Reimbursement</Link>
          <Link to="/bulletin" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>Bulletin</Link>
          <Link to="/contact" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>FAQ</Link>
        </div>
        <div>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.gold, marginBottom: 14 }}>Contact</div>
          <a href="mailto:admissions@conatus.academy" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>admissions@conatus.academy</a>
          {/* <a href="#" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 10 }}>LinkedIn</a> */}
        </div>
      </div>
      <div className="m-footer-bottom" style={{ maxWidth: 1280, margin: '0 auto', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)' }}>
          2024-2026 CONATUS ACADEMY - ALL RIGHTS RESERVED
        </div>
        <div style={{ display: 'flex', gap: 18, fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.4)' }}>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>PRIVACY</Link>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>TERMS</Link>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>ACCESSIBILITY</a>
        </div>
      </div>
    </footer>
  );
}

// ── Main Page Component ───────────────────────────────────────
export default function ForCompanies() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          fontFamily: Ufonts.serif,
          color: U.ink,
          background: U.ivory,
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <UtilityBar />
        <Masthead />
        <Hero />
        <Challenge />
        <Programmes />
        <Faculty />
        <Testimonial />
        <CourseComparison />
        <Compliance />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
