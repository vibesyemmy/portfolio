import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const NavCard = ({ title, link, direction }) => {
  const isNext = direction === 'next';
  
  return (
    <Link 
      to={link}
      className={`group flex flex-col justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 w-full max-w-[400px]`}
    >
      <div className={`flex items-center space-x-2 text-neutral-400 mb-2 ${isNext ? 'justify-end' : 'justify-start'}`}>
        {!isNext && <ArrowLeftIcon className="w-4 h-4" />}
        <span className="text-sm uppercase tracking-wider">{isNext ? 'Next' : 'Previous'}</span>
        {isNext && <ArrowRightIcon className="w-4 h-4" />}
      </div>
      <motion.h3 
        className={`text-lg font-medium text-white group-hover:text-neutral-200 ${isNext ? 'text-right' : 'text-left'}`}
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        {title}
      </motion.h3>
    </Link>
  );
};

const CaseStudyNav = ({ prevCase, nextCase }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center gap-6">
        <div className={`${!prevCase ? 'hidden' : ''} flex-1 flex justify-start`}>
          {prevCase && <NavCard title={prevCase.title} link={prevCase.link} direction="prev" />}
        </div>
        <div className={`${!nextCase ? 'hidden' : ''} flex-1 flex justify-end`}>
          {nextCase && <NavCard title={nextCase.title} link={nextCase.link} direction="next" />}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyNav;
