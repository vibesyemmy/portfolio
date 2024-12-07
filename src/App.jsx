import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import TamingFintechMonster from './pages/TamingFintechMonster';
import AboutMe from './pages/AboutMe';
import Test from './pages/Test';
import emailjs from '@emailjs/browser';
import ErrorBoundary from './components/ErrorBoundary';

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
          </Routes>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
