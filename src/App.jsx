import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/conatus-homepage';
import Programmes from './pages/conatus-programmes';
import LanguageProgramme from './pages/conatus-language-programme-v2';
import Method from './pages/conatus-method';
import Bulletin from './pages/conatus-bulletin';
import About from './pages/conatus-about';
import Contact from './pages/conatus-contact-v2';
import Assessment from './pages/conatus-assessment';
import Reimbursement from './pages/conatus-reimbursement';
import Privacy from './pages/conatus-privacy';
import Terms from './pages/conatus-terms';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/programmes/business-language" element={<LanguageProgramme />} />
        <Route path="/method" element={<Method />} />
        <Route path="/bulletin" element={<Bulletin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/reimbursement" element={<Reimbursement />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  );
}
