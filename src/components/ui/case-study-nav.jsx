import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

const NavCard = ({ title, path, direction }) => {
  const isNext = direction === 'next';
  
  return (
    <Link 
      to={path}
      className={`group flex flex-col justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 w-full md:max-w-[400px] max-w-[160px]`}
    >
      <div className={`flex items-center ${isNext ? 'justify-end' : 'justify-start'} space-x-2 text-neutral-400`}>
        {!isNext && <IconArrowLeft className="w-4 h-4" />}
        <span className="text-sm uppercase tracking-wider">{isNext ? 'Next' : 'Previous'}</span>
        {isNext && <IconArrowRight className="w-4 h-4" />}
      </div>
      <motion.h3 
        className={`text-lg font-medium text-white group-hover:text-neutral-200 ${isNext ? 'text-right' : 'text-left'} hidden md:block mt-2`}
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        {title}
      </motion.h3>
    </Link>
  );
};

const CaseStudyNav = ({ prevCase, nextCase, className = '' }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-4 ${className}`}>
      <div className="flex justify-between items-center gap-4 md:gap-6">
        <div className={`${!prevCase ? 'hidden' : ''} flex-1 flex justify-start`}>
          {prevCase && <NavCard title={prevCase.title} path={prevCase.path} direction="prev" />}
        </div>
        <div className={`${!nextCase ? 'hidden' : ''} flex-1 flex justify-end`}>
          {nextCase && <NavCard title={nextCase.title} path={nextCase.path} direction="next" />}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyNav;
