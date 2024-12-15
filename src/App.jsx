import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import TamingFintechMonster from './pages/TamingFintechMonster';
import HotelEntertainmentHub from './pages/HotelEntertainmentHub';
import PhoneCash from './pages/PhoneCash';
import FlatMagic from './pages/FlatMagic';
import AboutMe from './pages/AboutMe';
import TestPage from './pages/TestPage';
import emailjs from '@emailjs/browser';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ui/scroll-to-top';
import BackToTop from './components/ui/back-to-top';

// Loading component
const Loading = () => (
  <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize EmailJS
    try {
      emailjs.init("JCxo4QUF38r-E_SQZ");
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('EmailJS initialization error:', error);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-neutral-950 overflow-hidden">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<><Hero /><Projects /></>} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/fintech-monster" element={<TamingFintechMonster />} />
              <Route path="/hotel-hub" element={<HotelEntertainmentHub />} />
              <Route path="/phonecash" element={<PhoneCash />} />
              <Route path="/flatmagic" element={<FlatMagic />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Footer />
          <BackToTop />
          <SpeedInsights />
          <Analytics />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
