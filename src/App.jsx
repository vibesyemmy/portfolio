import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import TamingFintechMonster from './pages/TamingFintechMonster';
import TestPage from './pages/TestPage';

function App() {
  return (
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
          <Route path="/test" element={<TestPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
