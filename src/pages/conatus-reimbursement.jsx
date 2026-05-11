import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Design Tokens ──────────────────────────────────────────────
const U = {
  navy: '#0E2240', navyDeep: '#081628', navyMid: '#173759',
  ivory: '#FFFFFF', parchment: '#F1F4F8',
  gold: '#C8A24A', goldDeep: '#A4812B', goldLight: '#E0C277',
  ink: '#1A1A1A', inkSoft: '#3A3A40', inkMute: '#6B7280',
  rule: '#E5E7EB', ruleSoft: '#EEF0F3', white: '#FFFFFF',
};
const Ufonts = {
  display: "'Cormorant Garamond', 'EB Garamond', 'Times New Roman', serif",
  serif: "'Source Serif 4', 'EB Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

function Crest({ size = 64, color = U.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-label="Conatus seal">
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="1" />
      <circle cx="40" cy="40" r="34" stroke={color} strokeWidth="0.6" />
      <path d="M40 16 L58 22 L58 42 Q58 56 40 64 Q22 56 22 42 L22 22 Z" stroke={color} strokeWidth="1.4" fill="none" strokeLinejoin="miter" />
      <path d="M28 38 L40 36 L52 38 L52 50 L40 48 L28 50 Z" stroke={color} strokeWidth="1" fill="none" />
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

function Shield({ size = 36, color = U.gold }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none" aria-label="Conatus Academy">
      <path d="M20 2 L37 7 L37 26 Q37 36 20 44 Q3 36 3 26 L3 7 Z" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="miter" />
      <text x="20" y="25" fontFamily={Ufonts.display} fontSize="13" fontWeight="600" fill={color} textAnchor="middle" letterSpacing="0">CA</text>
      <line x1="10" y1="29" x2="30" y2="29" stroke={color} strokeWidth="0.6" />
      <text x="20" y="36" fontFamily={Ufonts.display} fontSize="4" fill={color} textAnchor="middle" letterSpacing="1.5">ACADEMIA</text>
    </svg>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay * 1000); observer.unobserve(el); } }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (<div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>{children}</div>);
}

function SectionHead({ kicker, title, sub, light }) {
  const kickerColor = light ? U.gold : U.goldDeep;
  const titleColor = light ? U.ivory : U.navy;
  const subColor = light ? 'rgba(255,255,255,0.7)' : U.inkSoft;
  return (
    <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 18 }}>
        <span style={{ width: 28, height: 1, background: kickerColor }} />
        <span style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: kickerColor }}>{kicker}</span>
        <span style={{ width: 28, height: 1, background: kickerColor }} />
      </div>
      <h2 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.012em', margin: 0, color: titleColor }}>{title}</h2>
      {sub && (<p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 18, lineHeight: 1.55, color: subColor, margin: '16px 0 0' }}>{sub}</p>)}
    </div>
  );
}

function UtilityBar() {
  return (
    <div style={{ background: U.navyDeep, color: 'rgba(255,255,255,0.6)', padding: '8px 5%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
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

function Masthead() {
  const [hoveredLink, setHoveredLink] = useState(null);
  return (
    <header style={{ background: U.navy, color: U.ivory, padding: '20px 5%', borderBottom: `3px solid ${U.gold}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Shield size={42} color={U.gold} />
          <div>
            <div style={{ fontFamily: Ufonts.display, fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, lineHeight: 1, color: U.ivory }}>Conatus Academy</div>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', color: U.gold, textTransform: 'uppercase', marginTop: 4 }}>A School for Sales Professionals - Est. MMXXIV</div>
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
            <Link key={l.label} to={l.to} onMouseEnter={() => setHoveredLink(l.label)} onMouseLeave={() => setHoveredLink(null)}
              style={{ fontFamily: Ufonts.display, fontSize: 16, fontWeight: 500, color: hoveredLink === l.label ? U.gold : U.ivory, textDecoration: 'none', paddingBottom: 4, borderBottom: '1.5px solid transparent', transition: 'color 0.2s ease' }}>{l.label}</Link>
          ))}
          <Link to="/assessment" style={{ fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: U.navy, background: U.gold, padding: '10px 18px', textDecoration: 'none' }}>Free Assessment</Link>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ padding: 'clamp(100px, 10vw, 160px) 5% clamp(80px, 8vw, 120px)', background: U.navy, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 32px)', border: '1px solid rgba(200,162,74,0.18)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 'clamp(20px, 2.2vw, 36px)', border: '1px solid rgba(200,162,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            <Crest size={48} color={U.gold} />
            <div style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.gold }}>Education Reimbursement</div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(40px, 5.5vw, 76px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.018em', margin: '0 0 28px', color: U.ivory }}>
            Your employer may cover
            <br /><span style={{ color: U.gold, fontStyle: 'italic', fontWeight: 400 }}>the full cost.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.35}>
          <p style={{ fontFamily: Ufonts.serif, fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', maxWidth: 620, margin: '0 auto' }}>
            Most enterprise technology companies offer education reimbursement budgets of up to EUR 5,000 per year. Our programmes are designed to qualify.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Check Your Eligibility', desc: 'Most enterprise technology companies offer education reimbursement as an employee benefit. Check with your HR department or benefits portal to confirm your annual allowance and any specific requirements.' },
    { num: '02', title: 'Book a Free Assessment', desc: 'Contact us for a complimentary Development Assessment. We will help you identify the right programme and provide all the documentation you need for your approval process.' },
    { num: '03', title: 'Get Manager Approval', desc: 'Submit the programme for approval through your employer\'s process. We provide a structured programme description, learning objectives, and tuition details - everything your manager and HR need to see.' },
    { num: '04', title: 'Enrol and Complete', desc: 'Once approved, enrol in your programme. On completion, you receive an institution-named invoice, a certificate of completion, and a learning outcomes report - the documents required for reimbursement.' },
    { num: '05', title: 'Submit for Reimbursement', desc: 'Submit your invoice and certificate through your employer\'s reimbursement system. We are happy to assist with any additional documentation your employer may require.' },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory }}>
      <SectionHead
        kicker="Step by Step"
        title="How Education Reimbursement Works"
        sub="A straightforward process. We handle the documentation - you focus on learning."
      />
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {steps.map((s, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', padding: '28px 0', borderBottom: i < steps.length - 1 ? `1px solid ${U.rule}` : 'none' }}>
              <span style={{ fontFamily: Ufonts.mono, fontSize: 12, letterSpacing: '0.2em', color: U.goldDeep, flexShrink: 0, marginTop: 4 }}>{s.num}</span>
              <div>
                <h3 style={{ fontFamily: Ufonts.display, fontSize: 24, fontWeight: 500, color: U.navy, margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.7, color: U.inkSoft, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── What We Provide ───────────────────────────────────────────
function WhatWeProvide() {
  const docs = [
    { title: 'Institution-Named Invoice', desc: 'Issued by a registered company with full legal details - institution name, NIP, registered address, programme name, dates, and amount.' },
    { title: 'Structured Programme Description', desc: 'A detailed programme overview with learning objectives, syllabus, contact hours, and delivery method - suitable for manager review and HR approval.' },
    { title: 'Certificate of Completion', desc: 'Issued on programme completion with your name, programme title, dates, and - where applicable - recognised accreditation (e.g., CEFR level for language programmes).' },
    { title: 'Learning Outcomes Report', desc: 'A documented record of your progress and achievements throughout the programme, including assessment results and skill development.' },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.parchment }}>
      <SectionHead
        kicker="Documentation"
        title="What We Provide"
        sub="Everything your employer needs to process your reimbursement."
      />
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 0 }}>
        {docs.map((d, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{ padding: '28px 24px', borderRight: i < docs.length - 1 ? `1px solid ${U.rule}` : 'none', height: '100%', display: 'flex', flexDirection: 'column', background: U.white }}>
              <span style={{ fontFamily: Ufonts.mono, fontSize: 9, color: U.gold, marginBottom: 12 }}>0{i + 1}</span>
              <h3 style={{ fontFamily: Ufonts.display, fontSize: 22, fontWeight: 500, color: U.navy, margin: '0 0 10px', lineHeight: 1.2 }}>{d.title}</h3>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 15, lineHeight: 1.65, color: U.inkSoft, margin: 0 }}>{d.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  const faqs = [
    { q: 'How much can I get reimbursed?', a: 'Most enterprise technology companies offer between EUR 3,000 and EUR 5,250 per year in education reimbursement. The exact amount depends on your employer\'s policy and your country of residence. Check your benefits portal or ask HR for details.' },
    { q: 'Do I need approval before I enrol?', a: 'Yes. Most employers require manager approval before enrolment, not after. We recommend securing approval before your programme start date. We provide all documentation needed for the approval process.' },
    { q: 'What if my reimbursement does not cover the full tuition?', a: 'You are responsible for the difference between your reimbursement allowance and the programme tuition. We are transparent about pricing so you can plan accordingly. Contact us to discuss your specific situation.' },
    { q: 'Do your programmes qualify for education reimbursement?', a: 'Our programmes are structured professional education delivered by qualified instructors at established institutions. They are designed to meet common eligibility criteria for corporate education reimbursement. However, each employer has their own policy and we cannot guarantee approval.' },
    { q: 'When do I submit the reimbursement claim?', a: 'Typically after programme completion, when you have received your invoice and certificate. Most employers require submission within 6 months of completion. Check your employer\'s specific deadlines.' },
    { q: 'Can you help me with the paperwork?', a: 'Absolutely. We provide all required documentation and are happy to assist with any additional information your employer may request. Book a free Development Assessment and we will walk you through the process.' },
  ];

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory }}>
      <SectionHead
        kicker="Common Questions"
        title="Reimbursement FAQ"
      />
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {faqs.map((f, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <details style={{ borderBottom: `1px solid ${U.rule}`, padding: '20px 0' }}>
              <summary style={{ fontFamily: Ufonts.display, fontSize: 20, fontWeight: 500, color: U.navy, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none' }}>
                {f.q}
                <span style={{ fontFamily: Ufonts.sans, fontSize: 18, color: U.gold, flexShrink: 0, marginLeft: 16 }}>+</span>
              </summary>
              <p style={{ fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.75, color: U.inkSoft, margin: '14px 0 0', paddingRight: 40 }}>
                {f.a}
              </p>
            </details>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="cta" style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.navy, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 'clamp(16px, 2vw, 24px)', border: '1px solid rgba(200,162,74,0.12)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <Crest size={56} color={U.gold} />
          <h2 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, lineHeight: 1.1, color: U.ivory, margin: '28px 0 16px' }}>
            Not sure if you qualify?
          </h2>
          <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 36px' }}>
            Book a free Development Assessment. We will check your eligibility and walk you through the entire reimbursement process.
          </p>
          <Link to="/assessment" style={{ display: 'inline-block', fontFamily: Ufonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: U.navy, background: U.gold, padding: '16px 36px', textDecoration: 'none' }}>
            Book Free Assessment
          </Link>
          <div style={{ marginTop: 20, fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.45)' }}>
            admissions@conatus.academy
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
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, paddingBottom: 36, borderBottom: '1px solid rgba(200,162,74,0.2)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <Shield size={40} color={U.gold} />
            <div>
              <div style={{ fontFamily: Ufonts.display, fontSize: 22, fontWeight: 600, color: U.ivory }}>Conatus Academy</div>
              <div style={{ fontFamily: Ufonts.mono, fontSize: 9, letterSpacing: '0.24em', color: U.gold, textTransform: 'uppercase', marginTop: 4 }}>Est. MMXXIV - Krakow</div>
            </div>
          </div>
          <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 300 }}>From Spinoza's conatus - the innate drive to persist and excel.</p>
          <p style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, marginTop: 18 }}>ul. Zamknieta 10/1.5, Krakow 30-554<br />NIP 6342934938</p>
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
        <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>2024-2026 CONATUS ACADEMY - ALL RIGHTS RESERVED</div>
        <div style={{ display: 'flex', gap: 18, fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)' }}>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>PRIVACY</Link>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>TERMS</Link>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>ACCESSIBILITY</a>
        </div>
      </div>
    </footer>
  );
}

export default function ConatusReimbursement() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: Ufonts.serif, color: U.ink, background: U.ivory, margin: 0, padding: 0, minHeight: '100vh', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        <UtilityBar />
        <Masthead />
        <Hero />
        <HowItWorks />
        <WhatWeProvide />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
