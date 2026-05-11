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
                color: hoveredLink === l.label ? U.gold : (l.label === 'CONAT Method' ? U.gold : U.ivory),
                textDecoration: 'none', paddingBottom: 4,
                borderBottom: l.label === 'CONAT Method' ? `1.5px solid ${U.gold}` : '1.5px solid transparent',
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
            <Crest size={56} color={U.gold} />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold, marginBottom: 20 }}>
            Our Methodology
          </div>
          <h1 style={{
            fontFamily: Ufonts.display,
            fontSize: 'clamp(44px, 6vw, 84px)', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.018em',
            margin: '0 0 28px', color: U.ivory,
          }}>
            The CONAT Method
          </h1>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p style={{
            fontFamily: Ufonts.serif, fontStyle: 'italic',
            fontSize: 'clamp(17px, 1.6vw, 21px)',
            lineHeight: 1.65, color: 'rgba(255,255,255,0.7)',
            maxWidth: 680, margin: '0 auto',
          }}>
            From Spinoza's <em>conatus</em> - the innate drive of every being to persist
            and enhance itself. Five phases that transform potential into measurable,
            documented professional growth.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Phase Data ─────────────────────────────────────────────────
const phases = [
  {
    letter: 'C',
    name: 'Calibrate',
    tagline: 'Development Assessment',
    summary: 'Every journey starts with honest measurement. Before recommending a single course, we map exactly where you stand.',
    details: [
      'Complimentary 30-minute discovery conversation',
      'Skill gap analysis specific to your current role',
      'Language placement test (for language programmes)',
      'Career goal mapping - where you are vs. where you want to be',
      'DISC profiling for communication style awareness',
    ],
    outcome: 'A clear, documented picture of your strengths, gaps, and the fastest path to your next career milestone.',
    cost: 'Free - no obligation',
  },
  {
    letter: 'O',
    name: 'Orient',
    tagline: 'Custom Learning Path',
    summary: 'One-size-fits-all training wastes time and money. We design a path that fits your goals, your schedule, and your budget.',
    details: [
      'Programme selection matched to your specific needs',
      'Instructor pairing based on your industry and learning style',
      'Timeline planning around your work commitments',
      'Education reimbursement eligibility check and documentation guidance',
      'Manager-ready programme overview for approval workflows',
    ],
    outcome: 'A personalised learning path with clear milestones, timeline, and all documentation needed for enrolment.',
    cost: 'Included in Calibrate phase',
  },
  {
    letter: 'N',
    name: 'Nurture',
    tagline: 'Core Development',
    summary: 'The main body of work. Structured instruction with qualified trainers, real-world practice materials, and continuous feedback.',
    details: [
      'Live sessions with dedicated, qualified instructors',
      'Industry-specific curriculum and practice scenarios',
      'Regular progress assessments and adjustment',
      'Access to supplementary materials and resources',
      'Direct instructor feedback on performance',
    ],
    outcome: 'Consistent, measurable skill development through structured, professional training with real accountability.',
    cost: 'Programme tuition applies',
  },
  {
    letter: 'A',
    name: 'Accelerate',
    tagline: 'Applied Practice',
    summary: 'Theory without practice is academic. This phase puts new skills under pressure in realistic enterprise scenarios.',
    details: [
      'Mock discovery calls and sales presentations',
      'Negotiation simulations in target language or skill area',
      'Stakeholder management role-play',
      'Real-time feedback and coaching during exercises',
      'Peer practice sessions for reinforcement',
    ],
    outcome: 'Confidence and competence in applying new skills under real workplace conditions - not just in a classroom.',
    cost: 'Included in programme',
  },
  {
    letter: 'T',
    name: 'Transform',
    tagline: 'Certification and Outcomes',
    summary: 'The finish line is documentation. Every programme ends with proof - a certificate, a measurable result, a tangible career asset.',
    details: [
      'Industry-recognised certification (CEFR, leadership, digital marketing)',
      'Documented learning outcomes report',
      'Before-and-after skill comparison',
      'Promotion readiness assessment',
      'Career advancement recommendations',
    ],
    outcome: 'A certified, documented transformation - evidence your employer, your manager, and your next interviewer can see.',
    cost: 'Included in programme',
  },
];

// ── Five Phases Overview ──────────────────────────────────────
function PhasesOverview() {
  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory, borderBottom: `1px solid ${U.rule}` }}>
      <SectionHead
        kicker="Five Phases"
        title="From Assessment to Certification"
        sub="Each phase builds on the last. No shortcuts, no filler - every step exists because it produces measurable results."
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
        {phases.map((p, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{
              padding: '32px 24px',
              borderRight: i < 4 ? `1px solid ${U.rule}` : 'none',
              textAlign: 'center', height: '100%',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <div style={{
                width: 56, height: 56, margin: '0 auto 16px',
                border: `1.5px solid ${U.gold}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: Ufonts.display, fontSize: 26, fontWeight: 600, color: U.navy,
              }}>
                {p.letter}
              </div>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 8 }}>
                Phase {i + 1}
              </div>
              <h3 style={{ fontFamily: Ufonts.display, fontSize: 24, fontWeight: 500, color: U.navy, margin: '0 0 6px' }}>
                {p.name}
              </h3>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.14em', color: U.inkMute, marginBottom: 12 }}>
                {p.tagline}
              </div>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 14, lineHeight: 1.65, color: U.inkSoft, margin: 0 }}>
                {p.summary}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Phase Deep Dives ──────────────────────────────────────────
function PhaseDeepDive() {
  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.white }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {phases.map((p, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div style={{
              display: 'grid', gridTemplateColumns: '80px 1fr', gap: 'clamp(20px, 3vw, 40px)',
              padding: 'clamp(32px, 4vw, 48px) 0',
              borderBottom: i < 4 ? `1px solid ${U.rule}` : 'none',
            }}>
              {/* Phase letter */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64,
                  border: `1.5px solid ${U.gold}`, background: U.parchment,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: Ufonts.display, fontSize: 32, fontWeight: 600, color: U.navy,
                  margin: '0 auto 8px',
                }}>
                  {p.letter}
                </div>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep }}>
                  Phase {i + 1}
                </div>
              </div>

              {/* Phase content */}
              <div>
                <h3 style={{
                  fontFamily: Ufonts.display, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500,
                  color: U.navy, margin: '0 0 4px', lineHeight: 1.1,
                }}>
                  {p.name}
                </h3>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 16 }}>
                  {p.tagline}
                </div>

                <p style={{ fontFamily: Ufonts.serif, fontSize: 17, lineHeight: 1.7, color: U.inkSoft, margin: '0 0 24px' }}>
                  {p.summary}
                </p>

                <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 12 }}>
                  What Happens
                </div>
                {p.details.map((d, j) => (
                  <div key={j} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: Ufonts.mono, fontSize: 9, color: U.gold, marginTop: 5, flexShrink: 0 }}>
                      0{j + 1}
                    </span>
                    <span style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.6, color: U.inkSoft }}>
                      {d}
                    </span>
                  </div>
                ))}

                <div style={{
                  marginTop: 20, padding: '16px 20px',
                  background: U.parchment, borderLeft: `3px solid ${U.gold}`,
                }}>
                  <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 6 }}>
                    Outcome
                  </div>
                  <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.6, color: U.navy, margin: 0, fontWeight: 500 }}>
                    {p.outcome}
                  </p>
                </div>

                <div style={{ marginTop: 12, fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.16em', color: U.inkMute }}>
                  {p.cost}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Why It Works Banner ───────────────────────────────────────
function WhyItWorks() {
  const points = [
    { stat: '85%', label: 'of generic online courses are never completed' },
    { stat: '6x', label: 'higher completion rate with structured, live instruction' },
    { stat: '50+', label: 'live contact hours in our flagship programme alone' },
    { stat: '100%', label: 'of graduates receive industry-recognised certification' },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.navy, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 24px)', border: '1px solid rgba(200,162,74,0.12)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHead
          light
          kicker="Why Structure Matters"
          title="The Problem with Self-Paced Learning"
          sub="Enterprise professionals don't fail because they lack motivation. They fail because generic platforms offer no structure, no accountability, and no real practice."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0 }}>
          {points.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: '32px 28px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{
                  fontFamily: Ufonts.display, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500,
                  color: U.gold, lineHeight: 1,
                }}>
                  {p.stat}
                </div>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.55)', marginTop: 10 }}>
                  {p.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Philosophy ────────────────────────────────────────────────
function Philosophy() {
  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.parchment }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <Crest size={48} color={U.gold} />
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, margin: '20px 0 16px' }}>
            The Name
          </div>
          <h2 style={{
            fontFamily: Ufonts.display, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500,
            color: U.navy, margin: '0 0 20px', lineHeight: 1.15, fontStyle: 'italic',
          }}>
            "Conatus est suum esse conservandi"
          </h2>
          <p style={{ fontFamily: Ufonts.serif, fontSize: 17, lineHeight: 1.75, color: U.inkSoft, margin: '0 0 20px' }}>
            Baruch Spinoza described conatus as the fundamental drive of every being to persist in its existence and to enhance itself. It is not ambition imposed from outside - it is the force that already lives inside every professional who refuses to stand still.
          </p>
          <p style={{ fontFamily: Ufonts.serif, fontSize: 17, lineHeight: 1.75, color: U.inkSoft, margin: 0 }}>
            The CONAT Method is built on this principle. We do not create motivation - we channel the drive that is already there into structured, measurable, certifiable growth. Five phases. No shortcuts. Real results.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="cta" style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory, textAlign: 'center' }}>
      <FadeIn>
        <h2 style={{
          fontFamily: Ufonts.display,
          fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, lineHeight: 1.1,
          color: U.navy, margin: '0 0 16px',
        }}>
          Start with Phase One
        </h2>
        <p style={{
          fontFamily: Ufonts.serif, fontStyle: 'italic',
          fontSize: 18, lineHeight: 1.6, color: U.inkSoft,
          maxWidth: 560, margin: '0 auto 36px',
        }}>
          The Calibrate phase is free. Book a Development Assessment and discover
          which programme fits your goals.
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
            NINJA Sp. z o.o.<br />
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
          <a href="#" style={{ display: 'block', fontFamily: Ufonts.serif, fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 10 }}>LinkedIn</a>
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
export default function ConatusMethod() {
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
        <PhasesOverview />
        <PhaseDeepDive />
        <WhyItWorks />
        <Philosophy />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
