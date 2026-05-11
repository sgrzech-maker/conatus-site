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
          ].map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onMouseEnter={() => setHoveredLink(l.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontFamily: Ufonts.display, fontSize: 16, fontWeight: 500,
                color: hoveredLink === l.label ? U.gold : (l.label === 'About' ? U.gold : U.ivory),
                textDecoration: 'none', paddingBottom: 4,
                borderBottom: l.label === 'About' ? `1.5px solid ${U.gold}` : '1.5px solid transparent',
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
    <section style={{
      padding: 'clamp(100px, 10vw, 160px) 5% clamp(80px, 8vw, 120px)',
      background: U.navy, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Crest size={48} color={U.gold} />
            <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold }}>
              About the Academy
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 style={{
            fontFamily: Ufonts.display,
            fontSize: 'clamp(40px, 5.5vw, 76px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.018em',
            margin: '0 0 28px', color: U.ivory, maxWidth: 800,
          }}>
            Built by sales professionals,
            <br />
            <span style={{ color: U.gold, fontStyle: 'italic', fontWeight: 400 }}>for sales professionals.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p style={{
            fontFamily: Ufonts.serif, fontSize: 'clamp(17px, 1.6vw, 21px)',
            lineHeight: 1.65, color: 'rgba(255,255,255,0.7)',
            maxWidth: 620, margin: 0,
          }}>
            Conatus Academy exists because we spent years watching talented people stall - not from lack of ambition, but from lack of the right training at the right time. We built the school we wish we had.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Origin Story ──────────────────────────────────────────────
function Origin() {
  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 20 }}>
            Why We Started
          </div>

          <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
            Enterprise sales is one of the most demanding professions in business. You are expected to master languages, navigate complex stakeholder maps, present to executives, negotiate multi-year contracts - and somehow develop all of these skills on your own time with a Udemy subscription.
          </p>

          <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
            Most companies offer generous education budgets. Most employees never use them - because the options available are either too generic, too passive, or too disconnected from the reality of enterprise sales.
          </p>

          <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
            We built Conatus Academy to close that gap. Structured programmes with live instruction, real practice, and measurable outcomes - designed specifically for people who sell for a living.
          </p>

          <div style={{
            marginTop: 40, padding: '28px 32px',
            borderLeft: `3px solid ${U.gold}`, background: U.parchment,
          }}>
            <p style={{
              fontFamily: Ufonts.display, fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 500,
              fontStyle: 'italic', lineHeight: 1.4, color: U.navy, margin: '0 0 12px',
            }}>
              "Conatus est suum esse conservandi"
            </p>
            <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.65, color: U.inkSoft, margin: 0 }}>
              Baruch Spinoza described conatus as the innate drive of every being to persist and enhance itself. It is not ambition imposed from outside - it is the force that already lives inside every professional who refuses to stand still. We named the Academy after it because we believe development is not something you do to people. It is something you unlock.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Founders ──────────────────────────────────────────────────
function Founders() {
  const founders = [
    {
      name: 'Stanislaw Grzech',
      role: 'Co-Founder',
      bio: 'Sales professional and entrepreneur with international experience across Poland, Denmark, and Ireland. Co-founder of Call\'n\'Grow, a sales consulting firm working with enterprise clients. Built Conatus Academy from the conviction that structured, instructor-led training produces results that self-paced platforms never will.',
      focus: 'Strategy, Admissions, Programme Design',
      linkedin: '#',
    },
    {
      name: 'Maciej Kasprzycki',
      role: 'Co-Founder and CEO',
      bio: 'CEO of Call\'n\'Grow and experienced operator in the enterprise technology ecosystem. Brings deep knowledge of corporate training procurement, partner management, and institutional operations. Responsible for Conatus Academy\'s partnerships, compliance, and business operations.',
      focus: 'Operations, Partnerships, Compliance',
      linkedin: '#',
    },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.parchment }}>
      <SectionHead
        kicker="Leadership"
        title="The People Behind the Academy"
      />

      <div className="m-grid-stack" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 0 }}>
        {founders.map((f, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div style={{
              padding: 'clamp(32px, 4vw, 48px)',
              borderRight: i === 0 ? `1px solid ${U.rule}` : 'none',
              height: '100%', display: 'flex', flexDirection: 'column',
            }}>
              {/* Photo placeholder */}
              <div style={{
                width: 88, height: 88, marginBottom: 24,
                background: U.navy, border: `1.5px solid ${U.gold}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: Ufonts.display, fontSize: 28, fontWeight: 600, color: U.gold,
              }}>
                {f.name.split(' ').map(n => n[0]).join('')}
              </div>

              <h3 style={{
                fontFamily: Ufonts.display, fontSize: 28, fontWeight: 500,
                color: U.navy, margin: '0 0 4px', lineHeight: 1.1,
              }}>
                {f.name}
              </h3>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 18 }}>
                {f.role}
              </div>

              <p style={{ fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.7, color: U.inkSoft, margin: '0 0 20px', flex: 1 }}>
                {f.bio}
              </p>

              <div style={{ paddingTop: 16, borderTop: `1px solid ${U.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: U.inkMute }}>
                  {f.focus}
                </span>
                {/* <a href={f.linkedin} style={{
                  fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600,
                  color: U.goldDeep, textDecoration: 'none',
                }}>LinkedIn</a> */}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Training Partners ─────────────────────────────────────────
function Partners() {
  const partners = [
    {
      name: 'Highline',
      type: 'Language Training Partner',
      desc: 'Specialist provider of business language programmes for corporate professionals. They deliver structured, instructor-led courses with CEFR certification - the European standard for language proficiency recognised by employers across the continent. Their trainers are qualified professionals employed by the institution, not freelancers.',
      programmes: 'Business Language for Sales Professionals (CONA-101)',
      credentials: [
        'CEFR-certified assessment and outcomes',
        'Qualified, institution-employed instructors',
        'Established corporate training provider',
        'Structured syllabi with documented learning objectives',
      ],
    },
    {
      name: 'Altkom',
      type: 'Professional Development Partner',
      desc: 'One of the largest professional training companies in Central Europe, with over 30 years of experience delivering technical and business skills programmes to enterprise clients. Altkom holds industry-recognised accreditations and partners with global technology providers for certification programmes.',
      programmes: 'Applied AI, Sales Leadership, Digital Marketing (CONA-201, 301, 401)',
      credentials: [
        'Over 30 years in corporate training',
        'Accredited by international certification bodies',
        'Enterprise client portfolio across Europe',
        'Certified e-learning and live instruction capability',
      ],
    },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory }}>
      <SectionHead
        kicker="Our Partners"
        title="Instruction Delivered by Established Institutions"
        sub="We do not employ freelance tutors. Every programme is delivered in partnership with established, accredited training institutions."
      />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {partners.map((p, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="m-grid-stack" style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 0,
              border: `1px solid ${U.rule}`, marginBottom: i === 0 ? 24 : 0,
              background: U.white,
            }}>
              <div style={{ padding: 'clamp(28px, 3vw, 40px)', borderRight: `1px solid ${U.rule}` }}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 8 }}>
                  {p.type}
                </div>
                <h3 style={{
                  fontFamily: Ufonts.display, fontSize: 32, fontWeight: 500,
                  color: U.navy, margin: '0 0 16px',
                }}>
                  {p.name}
                </h3>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.7, color: U.inkSoft, margin: 0 }}>
                  {p.desc}
                </p>
              </div>

              <div style={{ padding: 'clamp(28px, 3vw, 40px)' }}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 8 }}>
                  Conatus Programmes
                </div>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.6, color: U.navy, fontWeight: 500, margin: '0 0 24px' }}>
                  {p.programmes}
                </p>

                <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 12 }}>
                  Credentials
                </div>
                {p.credentials.map((c, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: Ufonts.mono, fontSize: 9, color: U.gold, marginTop: 4, flexShrink: 0 }}>0{j + 1}</span>
                    <span style={{ fontFamily: Ufonts.serif, fontSize: 14, lineHeight: 1.55, color: U.inkSoft }}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Principles ────────────────────────────────────────────────
function Principles() {
  const items = [
    {
      title: 'No Passive Learning',
      desc: 'Every programme includes live instruction, real-time feedback, and applied practice. We do not sell access to pre-recorded videos.',
    },
    {
      title: 'Institutional Standards',
      desc: 'Structured syllabi, qualified instructors, documented outcomes, and recognised certifications. The standard your employer expects.',
    },
    {
      title: 'Enterprise Sales Focus',
      desc: 'Our curriculum is built for people who sell in complex, multi-stakeholder, enterprise environments. Not generic soft skills - specific, applied training.',
    },
    {
      title: 'Transparent Pricing',
      desc: 'One price, all-inclusive. No hidden fees, no upsells, no premium tiers. You see the cost before you start.',
    },
    {
      title: 'No Incentives Policy',
      desc: 'We do not offer referral fees, rebates, discounts for volume, or any form of financial incentive. Our programmes stand on their quality alone.',
    },
    {
      title: 'Measurable Results',
      desc: 'Every programme ends with documentation - a CEFR level, a certification, a skill assessment. Something your manager and your CV can point to.',
    },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.navy, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 24px)', border: '1px solid rgba(200,162,74,0.12)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHead
          light
          kicker="What We Stand For"
          title="Academy Principles"
          sub="Six commitments that define how we operate. Non-negotiable."
        />

        <div className="m-grid-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 0 }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{
                padding: '28px 32px',
                borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: Ufonts.mono, fontSize: 10, color: U.gold, marginTop: 4, flexShrink: 0 }}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: Ufonts.display, fontSize: 22, fontWeight: 500,
                      color: U.ivory, margin: '0 0 8px',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: Ufonts.serif, fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Institutional Info ────────────────────────────────────────
function Institutional() {
  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.parchment }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <FadeIn>
          <SectionHead
            kicker="Registered Institution"
            title="Legal and Administrative Information"
          />

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 0,
            border: `1px solid ${U.rule}`, background: U.white,
          }}>
            {[
              { label: 'Tax Identification (NIP)', value: '6342934938' },
              { label: 'Registered Address', value: 'ul. Zamknieta 10/1.5\nKrakow 30-554, Poland' },
              { label: 'Programme Email', value: 'admissions@conatus.academy' },
              { label: 'Country of Operation', value: 'Poland (EU)' },
              { label: 'Established', value: '2024' },
              { label: 'KRS Registry', value: 'Available upon request' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '24px 28px',
                borderBottom: i < 4 ? `1px solid ${U.rule}` : 'none',
                borderRight: i % 2 === 0 ? `1px solid ${U.rule}` : 'none',
              }}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.inkMute, marginBottom: 8 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: Ufonts.serif, fontSize: 16, color: U.navy, fontWeight: 500, whiteSpace: 'pre-line' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14,
            color: U.inkMute, textAlign: 'center', marginTop: 20, lineHeight: 1.6,
          }}>
            Conatus Academy is a registered professional education institution
            operating under Polish commercial law.
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
        <Crest size={56} color={U.gold} />
        <h2 style={{
          fontFamily: Ufonts.display,
          fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, lineHeight: 1.1,
          color: U.navy, margin: '28px 0 16px',
        }}>
          Ready to start?
        </h2>
        <p style={{
          fontFamily: Ufonts.serif, fontStyle: 'italic',
          fontSize: 18, lineHeight: 1.6, color: U.inkSoft,
          maxWidth: 560, margin: '0 auto 36px',
        }}>
          Book a free Development Assessment. No obligation, no cost -
          just an honest conversation about where you are and where you want to be.
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

// ── Main ──────────────────────────────────────────────────────
export default function ConatusAbout() {
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
        <Origin />
        {/* <Founders /> */}
        <Partners />
        <Principles />
        <Institutional />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
