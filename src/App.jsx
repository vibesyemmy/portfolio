import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import TamingFintechMonster from './pages/TamingFintechMonster';
import AboutMe from './pages/AboutMe';
import Test from './pages/Test';
import emailjs from '@emailjs/browser';
import ErrorBoundary from './components/ErrorBoundary';

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
        <div className="min-h-screen bg-neutral-950 overflow-hidden">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Projects />
                </>
              } />
              <Route path="/case-study/fintech-monster" element={<TamingFintechMonster />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/test" element={<Test />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Footer />
          <SpeedInsights />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
