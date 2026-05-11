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

// ── Policy Content ────────────────────────────────────────────
function PolicyContent() {
  const sectionStyle = { marginBottom: 40 };
  const h2Style = { fontFamily: Ufonts.display, fontSize: 28, fontWeight: 500, color: U.navy, margin: '0 0 16px', lineHeight: 1.2 };
  const h3Style = { fontFamily: Ufonts.display, fontSize: 22, fontWeight: 500, color: U.navy, margin: '28px 0 12px', lineHeight: 1.2 };
  const pStyle = { fontFamily: Ufonts.serif, fontSize: 16, lineHeight: 1.75, color: U.inkSoft, margin: '0 0 16px' };

  return (
    <section style={{ padding: 'clamp(64px, 7vw, 96px) 5%', background: U.ivory }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontFamily: Ufonts.mono, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: U.goldDeep, marginBottom: 16 }}>
          Legal
        </div>
        <h1 style={{ fontFamily: Ufonts.display, fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 500, color: U.navy, margin: '0 0 12px', lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: Ufonts.mono, fontSize: 11, letterSpacing: '0.16em', color: U.inkMute, marginBottom: 48 }}>
          Last updated: May 2026
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Data Controller</h2>
          <p style={pStyle}>
            The data controller is NINJA Sp. z o.o., operating as Conatus Academy, with its registered office at ul. Zamknieta 10/1.5, 30-554 Krakow, Poland, NIP: 6342934938 (hereinafter "the Academy", "we", or "us").
          </p>
          <p style={pStyle}>
            For any matters related to personal data processing, you may contact us at: admissions@conatus.academy
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. What Data We Collect</h2>
          <p style={pStyle}>We collect and process the following categories of personal data:</p>

          <h3 style={h3Style}>Contact Form and Assessment Requests</h3>
          <p style={pStyle}>
            When you submit an enquiry through our contact form or book a Development Assessment, we collect: your full name, email address, company name (optional), job title (optional), programme of interest, and any information you voluntarily include in your message.
          </p>

          <h3 style={h3Style}>Programme Enrolment</h3>
          <p style={pStyle}>
            When you enrol in a programme, we additionally collect: billing information (company name, address, tax identification number), programme participation records, assessment results, and certificates of completion.
          </p>

          <h3 style={h3Style}>Website Usage</h3>
          <p style={pStyle}>
            We use essential cookies only to ensure the proper functioning of our website. We do not use tracking cookies, analytics tools, or advertising pixels. We do not track your browsing behaviour across other websites.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Legal Basis for Processing</h2>
          <p style={pStyle}>We process your personal data on the following legal grounds under the General Data Protection Regulation (GDPR / RODO):</p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Consent (Art. 6(1)(a) GDPR)</strong> - when you voluntarily submit a contact form or request a Development Assessment. You may withdraw your consent at any time by contacting us.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Performance of a contract (Art. 6(1)(b) GDPR)</strong> - when processing is necessary for the delivery of a programme you have enrolled in, including communication, scheduling, assessment, and certification.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Legitimate interest (Art. 6(1)(f) GDPR)</strong> - for responding to your enquiries and maintaining records necessary for our institutional operations.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Legal obligation (Art. 6(1)(c) GDPR)</strong> - for accounting and tax documentation as required by Polish law.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Data Sharing</h2>
          <p style={pStyle}>
            We do not sell, rent, or trade your personal data. We may share your data only with:
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Training partners</strong> (Highline, Altkom) - only the information necessary to deliver the programme you have enrolled in, such as your name, contact details, and learning objectives. Our partners process this data solely for the purpose of instruction delivery.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Service providers</strong> - hosting, email, and payment processing services that act as data processors on our behalf under appropriate data processing agreements.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Legal authorities</strong> - only when required by applicable law.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Data Retention</h2>
          <p style={pStyle}>
            Contact form submissions and assessment requests are retained for up to 24 months from the date of submission, unless you request earlier deletion.
          </p>
          <p style={pStyle}>
            Programme enrolment records, certificates, and assessment results are retained for 5 years after programme completion, as required for institutional record-keeping and potential verification by employers.
          </p>
          <p style={pStyle}>
            Accounting and tax records are retained as required by Polish law (currently 5 years from the end of the tax year in which the transaction occurred).
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Your Rights</h2>
          <p style={pStyle}>Under GDPR, you have the following rights regarding your personal data:</p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Right of access</strong> - you may request a copy of the personal data we hold about you.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Right to rectification</strong> - you may request correction of inaccurate or incomplete data.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Right to erasure</strong> - you may request deletion of your data where there is no compelling reason for its continued processing.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Right to restrict processing</strong> - you may request that we limit how we use your data.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Right to data portability</strong> - you may request your data in a structured, machine-readable format.
          </p>
          <p style={pStyle}>
            <strong style={{ color: U.navy }}>Right to object</strong> - you may object to processing based on legitimate interest.
          </p>
          <p style={pStyle}>
            To exercise any of these rights, contact us at admissions@conatus.academy. We will respond within 30 days.
          </p>
          <p style={pStyle}>
            You also have the right to lodge a complaint with the Polish supervisory authority: Prezes Urzedu Ochrony Danych Osobowych (PUODO), ul. Stawki 2, 00-193 Warszawa, Poland.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. International Transfers</h2>
          <p style={pStyle}>
            Your data is processed and stored within the European Economic Area (EEA). If any data processing requires transfer outside the EEA, we ensure appropriate safeguards are in place in accordance with GDPR Chapter V.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Cookies</h2>
          <p style={pStyle}>
            Our website uses only essential cookies necessary for the website to function correctly. These cookies do not collect personal data and cannot be used to identify you. We do not use marketing, analytics, or third-party tracking cookies.
          </p>
        </div>

        <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${U.rule}` }}>
          <p style={{ fontFamily: Ufonts.serif, fontStyle: 'italic', fontSize: 14, color: U.inkMute, lineHeight: 1.65 }}>
            This policy may be updated periodically. The current version is always available at this page. Material changes will be communicated via our website.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ConatusPrivacy() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: Ufonts.serif, color: U.ink, background: U.ivory, margin: 0, padding: 0, minHeight: '100vh', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        <UtilityBar />
        <Masthead />
        <PolicyContent />
        <Footer />
      </div>
    </>
  );
}
