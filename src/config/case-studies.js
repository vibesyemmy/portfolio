export const caseStudies = [
  {
    id: 'fintech-monster',
    title: 'Taming the Fintech Monster',
    path: '/fintech-monster'
  },
  {
    id: 'hotel-hub',
    title: 'Hotel Entertainment Hub',
    path: '/hotel-hub'
  },
  {
    id: 'phonecash',
    title: 'PhoneCash: A Fintech Solution',
    path: '/phonecash'
  },
  {
    id: 'flatmagic',
    title: 'FlatMagic: Figma Plugin',
    path: '/flatmagic'
  }
];

export const getNavigation = (currentId) => {
  const currentIndex = caseStudies.findIndex(study => study.id === currentId);
  
  if (currentIndex === -1) return { nextCase: null, prevCase: null };

  const prevCase = currentIndex > 0 ? {
    id: caseStudies[currentIndex - 1].id,
    title: caseStudies[currentIndex - 1].title,
    path: caseStudies[currentIndex - 1].path
  } : null;

  const nextCase = currentIndex < caseStudies.length - 1 ? {
    id: caseStudies[currentIndex + 1].id,
    title: caseStudies[currentIndex + 1].title,
    path: caseStudies[currentIndex + 1].path
  } : null;

  return { prevCase, nextCase };
};
