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
                color: hoveredLink === l.label ? U.gold : (l.label === 'Bulletin' ? U.gold : U.ivory),
                textDecoration: 'none', paddingBottom: 4,
                borderBottom: l.label === 'Bulletin' ? `1.5px solid ${U.gold}` : '1.5px solid transparent',
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
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            <Crest size={48} color={U.gold} />
            <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold }}>
              Academy Bulletin
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 style={{
            fontFamily: Ufonts.display,
            fontSize: 'clamp(40px, 5.5vw, 76px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.018em',
            margin: '0 0 28px', color: U.ivory,
          }}>
            Insights for
            <br />
            <span style={{ color: U.gold, fontStyle: 'italic', fontWeight: 400 }}>Sales Professionals</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p style={{
            fontFamily: Ufonts.serif, fontSize: 'clamp(17px, 1.6vw, 21px)',
            lineHeight: 1.65, color: 'rgba(255,255,255,0.7)',
            maxWidth: 580, margin: '0 auto',
          }}>
            Frameworks, case studies, and practical thinking on professional development in enterprise sales.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Featured Article (Case Study: Adam) ───────────────────────
function FeaturedArticle() {
  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, background: U.gold, borderRadius: '50%' }} />
            <span style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: U.goldDeep }}>
              Featured - Case Study
            </span>
          </div>

          <h2 style={{
            fontFamily: Ufonts.display, fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500,
            lineHeight: 1.1, color: U.navy, margin: '0 0 20px',
          }}>
            From Conversational to Boardroom: How Three Months of Business German Changed a Career
          </h2>

          <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: U.inkMute, marginBottom: 32 }}>
            5 min read - Professional Development
          </div>

          <div style={{ borderTop: `1px solid ${U.rule}`, paddingTop: 32 }}>
            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
              Adam Krawiec was a Business Development Representative at a large enterprise technology company in Europe. He was good at his job - consistently hitting quota, building pipeline, running disciplined outreach. He could hold a conversation in German. Ordering dinner, small talk at conferences, casual messages with colleagues in the DACH region - no problem. But the Account Executive roles he wanted required something he did not have: professional business German.
            </p>

            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
              The DACH market - Germany, Austria, Switzerland - is one of the largest enterprise technology markets in Europe. Companies hiring AEs for the region do not just want someone who speaks German. They need someone who can negotiate contract terms, handle objections from procurement, and present to a boardroom full of German-speaking executives. Conversational fluency and professional fluency are two entirely different things - and the gap between them is where careers stall.
            </p>

            <h3 style={{ fontFamily: Ufonts.display, fontSize: 28, fontWeight: 500, color: U.navy, margin: '36px 0 16px' }}>
              The Ceiling of Conversational Fluency
            </h3>

            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
              Adam could get by in German. He had studied it at school, practised on holidays, picked up phrases from colleagues. But every time he tried to use it in a professional setting - a discovery call, a pricing discussion, a quarterly review - he hit a wall. The vocabulary was wrong. The register was wrong. The confidence disappeared the moment the stakes were real.
            </p>

            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
              This is the trap that catches thousands of sales professionals across Europe. They have enough German, French, or Spanish to socialise - but not enough to sell. And no amount of Duolingo or generic conversation classes will close that gap, because the gap is not about grammar. It is about industry vocabulary, professional register, and the confidence to perform under pressure in a second language.
            </p>

            <h3 style={{ fontFamily: Ufonts.display, fontSize: 28, fontWeight: 500, color: U.navy, margin: '36px 0 16px' }}>
              Twelve Weeks of Structured Training
            </h3>

            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
              Adam enrolled in a structured business language programme - twelve weeks of individual instruction with a dedicated language instructor. The curriculum was not about learning German from scratch. It was about rebuilding what he already knew into professional, sales-ready fluency. Every session was built around real enterprise scenarios: discovery call simulations, executive presentation practice, negotiation role-play, objection handling in real time.
            </p>

            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
              The difference between this and a language app is accountability. A live instructor corrects your grammar in real time. Simulation calls expose gaps you did not know you had. Weekly assessments make sure you are actually progressing, not just showing up.
            </p>

            <h3 style={{ fontFamily: Ufonts.display, fontSize: 28, fontWeight: 500, color: U.navy, margin: '36px 0 16px' }}>
              The Result
            </h3>

            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
              Adam completed the programme with a full CEFR level improvement - from conversational B1 to professional B2 - documented, certified, verifiable. He could now run a discovery call, present a proposal, and handle pricing objections entirely in German. Within months, he moved into an Account Executive role focused on the DACH market. Not at the same company. A better one.
            </p>

            <div style={{
              margin: '40px 0', padding: '28px 32px',
              borderLeft: `3px solid ${U.gold}`, background: U.parchment,
            }}>
              <p style={{
                fontFamily: Ufonts.display, fontSize: 24, fontWeight: 500,
                fontStyle: 'italic', lineHeight: 1.4, color: U.navy, margin: '0 0 12px',
              }}>
                "I could already speak German - or so I thought. But every time I tried to use it in a real sales situation, I froze. Twelve weeks of structured training turned my conversational German into something I could actually sell with. The difference was having someone who understood what business fluency really means."
              </p>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.goldDeep }}>
                Adam Krawiec - Account Executive, DACH Market
              </div>
            </div>

            <h3 style={{ fontFamily: Ufonts.display, fontSize: 28, fontWeight: 500, color: U.navy, margin: '36px 0 16px' }}>
              What This Tells Us
            </h3>

            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: '0 0 24px' }}>
              Adam's story is not exceptional. It is predictable. When you replace passive self-study with structured, instructor-led training designed for your actual job - the results follow. The variable is not talent or motivation. It is the quality of the training.
            </p>

            <p style={{ fontFamily: Ufonts.serif, fontSize: 18, lineHeight: 1.8, color: U.inkSoft, margin: 0 }}>
              This is why Conatus Academy exists. Not to motivate people - they are already motivated. To give them the structured training that actually produces results.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── More Articles (Coming Soon) ───────────────────────────────
function MoreArticles() {
  const upcoming = [
    {
      tag: 'Framework',
      title: 'The CONAT Method: Why Five Phases Beat One Course',
      desc: 'Most training fails because it starts and ends with content delivery. The CONAT Method starts before the first lesson and continues after the last one.',
    },
    {
      tag: 'Market Insight',
      title: 'The EUR 5,000 Most Sales Professionals Leave on the Table',
      desc: 'Enterprise technology companies offer generous education budgets. The vast majority goes unused every year. Here is why - and what to do about it.',
    },
    {
      tag: 'Practical Guide',
      title: 'Which Language Should You Learn for Enterprise Sales in Europe?',
      desc: 'French, German, Spanish, Italian - each opens different markets. A data-driven look at which language gives you the biggest career return.',
    },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.parchment }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <span style={{ width: 28, height: 1, background: U.goldDeep }} />
          <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep }}>
            Coming Soon
          </span>
          <span style={{ width: 28, height: 1, background: U.goldDeep }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 0 }}>
          {upcoming.map((a, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: '32px 28px',
                borderRight: i < upcoming.length - 1 ? `1px solid ${U.rule}` : 'none',
                height: '100%', display: 'flex', flexDirection: 'column',
                background: U.white,
              }}>
                <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 14 }}>
                  {a.tag}
                </div>
                <h3 style={{
                  fontFamily: Ufonts.display, fontSize: 24, fontWeight: 500, lineHeight: 1.2,
                  color: U.navy, margin: '0 0 12px',
                }}>
                  {a.title}
                </h3>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.65, color: U.inkSoft, margin: 0, flex: 1 }}>
                  {a.desc}
                </p>
                <div style={{ marginTop: 20, paddingTop: 14, borderTop: `1px solid ${U.ruleSoft}` }}>
                  <span style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: U.inkMute }}>
                    Publication pending
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory, textAlign: 'center' }}>
      <FadeIn>
        <Crest size={48} color={U.gold} />
        <h2 style={{
          fontFamily: Ufonts.display,
          fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500, lineHeight: 1.15,
          color: U.navy, margin: '24px 0 16px',
        }}>
          Ready to invest in your career?
        </h2>
        <p style={{
          fontFamily: Ufonts.serif, fontStyle: 'italic',
          fontSize: 17, lineHeight: 1.6, color: U.inkSoft,
          maxWidth: 520, margin: '0 auto 32px',
        }}>
          Book a free Development Assessment and discover which programme fits your goals.
        </p>
        <Link to="/assessment" style={{
          display: 'inline-block',
          fontFamily: Ufonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: U.ivory, background: U.navy, padding: '15px 32px', textDecoration: 'none',
        }}>
          Book Free Assessment
        </Link>
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
export default function ConatusBulletin() {
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
        <FeaturedArticle />
        <MoreArticles />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
