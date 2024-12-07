export const caseStudies = [
  {
    id: 'fintech-monster',
    title: 'Taming the Fintech Monster',
    link: '/case-study/fintech-monster'
  },
  {
    id: 'hotel-entertainment',
    title: 'Crafting a Hotel Entertainment Hub',
    link: '/case-study/hotel-entertainment'
  }
];

export const getNavigation = (currentId) => {
  const currentIndex = caseStudies.findIndex(study => study.id === currentId);
  
  return {
    prevCase: currentIndex > 0 ? caseStudies[currentIndex - 1] : null,
    nextCase: currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null
  };
};
