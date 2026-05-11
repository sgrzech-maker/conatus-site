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
      <div className="m-masthead-inner" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
          <Shield size={42} color={U.gold} />
          <div>
            <div style={{ fontFamily: Ufonts.display, fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, lineHeight: 1, color: U.ivory }}>Conatus Academy</div>
            <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', color: U.gold, textTransform: 'uppercase', marginTop: 4 }}>A School for Sales Professionals - Est. MMXXIV</div>
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
            <Link key={l.label} to={l.to} onMouseEnter={() => setHoveredLink(l.label)} onMouseLeave={() => setHoveredLink(null)}
              style={{ fontFamily: Ufonts.display, fontSize: 16, fontWeight: 500, color: hoveredLink === l.label ? U.gold : U.ivory, textDecoration: 'none', paddingBottom: 4, borderBottom: '1.5px solid transparent', transition: 'color 0.2s ease' }}>{l.label}</Link>
          ))}
          <Link to="/assessment" style={{ fontFamily: Ufonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: U.navy, background: U.gold, padding: '10px 18px', textDecoration: 'none' }}>Free Assessment</Link>
        </nav>
      </div>
    </header>
  );
}

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

function TermsContent() {
  const h2Style = { fontFamily: Ufonts.display, fontSize: 28, fontWeight: 500, color: U.navy, margin: '0 0 16px', lineHeight: 1.2 };
  const pStyle = { fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.75, color: U.inkSoft, margin: '0 0 16px' };
  const sectionStyle = { marginBottom: 40 };

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 16 }}>Legal</div>
        <h1 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 500, color: U.navy, margin: '0 0 12px', lineHeight: 1.1 }}>Terms and Conditions</h1>
        <p style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.16em', color: U.inkMute, marginBottom: 48 }}>Last updated: May 2026</p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. General Provisions</h2>
          <p style={pStyle}>These Terms and Conditions govern the use of the website conatus.academy and the educational services provided by NINJA Sp. z o.o., operating as Conatus Academy, with its registered office at ul. Zamknieta 10/1.5, 30-554 Krakow, Poland, NIP: 6342934938.</p>
          <p style={pStyle}>By using this website or enrolling in any programme, you agree to these Terms and Conditions.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Services</h2>
          <p style={pStyle}>Conatus Academy provides professional education programmes for enterprise sales professionals. Programmes are delivered in partnership with established training institutions and include live instruction, assessment, and certification.</p>
          <p style={pStyle}>The Development Assessment is a complimentary consultation offered at no cost and with no obligation to enrol.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Enrolment and Payment</h2>
          <p style={pStyle}>Enrolment in a programme is confirmed upon receipt of a signed enrolment agreement and payment of the programme tuition, or confirmation of approved education reimbursement from the participant's employer.</p>
          <p style={pStyle}>All prices displayed on the website are gross prices and include applicable taxes unless stated otherwise. Payment is due in full before the programme start date, unless an alternative payment schedule has been agreed in writing.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Cancellation and Refunds</h2>
          <p style={pStyle}>Participants may cancel their enrolment up to 14 days before the programme start date for a full refund. Cancellations made within 14 days of the start date are subject to a cancellation fee of 20% of the programme tuition.</p>
          <p style={pStyle}>Once a programme has commenced, refunds are available only in exceptional circumstances and at the discretion of the Academy. Requests should be submitted in writing to admissions@conatus.academy.</p>
          <p style={pStyle}>Consumers (individuals not acting in a professional capacity) have the right to withdraw from a distance contract within 14 days of enrolment without giving a reason, in accordance with Polish consumer protection law.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Programme Delivery</h2>
          <p style={pStyle}>Programmes are delivered by qualified instructors employed by our training partner institutions. The Academy reserves the right to adjust schedules, instructors, or delivery methods where necessary, provided that the overall programme objectives and contact hours are maintained.</p>
          <p style={pStyle}>Participants are responsible for attending scheduled sessions. Missed sessions may be rescheduled subject to instructor availability, but the Academy does not guarantee rescheduling.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Certificates</h2>
          <p style={pStyle}>Certificates of completion are issued upon successful completion of a programme, subject to meeting attendance and assessment requirements as specified in the programme syllabus. Certificates are issued by Conatus Academy and, where applicable, include partner institution accreditation (e.g., CEFR level certification for language programmes).</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Intellectual Property</h2>
          <p style={pStyle}>All content on this website - including text, design, logos, graphics, and programme materials - is the intellectual property of NINJA Sp. z o.o. or its licensors and is protected by applicable copyright law. Reproduction, distribution, or modification without written consent is prohibited.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. No Incentives Policy</h2>
          <p style={pStyle}>Conatus Academy does not offer referral fees, rebates, discounts for volume enrolment, or any other form of financial incentive to participants, employers, or third parties. Our programmes are priced transparently and stand on their educational merit.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Limitation of Liability</h2>
          <p style={pStyle}>The Academy provides educational services in good faith and to the best of its professional ability. We do not guarantee specific career outcomes, promotions, or employment results as a consequence of programme completion.</p>
          <p style={pStyle}>To the fullest extent permitted by law, the Academy's total liability for any claim arising from or related to a programme shall not exceed the amount of tuition paid for that programme.</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Governing Law</h2>
          <p style={pStyle}>These Terms and Conditions are governed by Polish law. Any disputes arising from these terms shall be resolved by the competent courts in Krakow, Poland, subject to mandatory consumer protection provisions that may grant jurisdiction to the consumer's place of residence.</p>
        </div>

        <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${U.rule}` }}>
          <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14, color: U.inkMute, lineHeight: 1.65 }}>
            These terms may be updated periodically. The current version is always available at this page. Continued use of the website or services after changes constitutes acceptance of the updated terms.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ConatusTerms() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: Ufonts.serif, color: U.ink, background: U.ivory, margin: 0, padding: 0, minHeight: '100vh', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        <UtilityBar />
        <Masthead />
        <TermsContent />
        <Footer />
      </div>
    </>
  );
}
