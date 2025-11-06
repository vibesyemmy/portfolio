import React, { useMemo } from 'react';
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconBrandLinkedin, IconBrandDribbble, IconBrandFigma, IconMail, IconDownload } from '@tabler/icons-react';
import { Experience } from '@/components/ui/Experience';
import { Education } from '@/components/ui/Education';
import { Certification } from '@/components/ui/Certification';
import { MovingBorder } from '@/components/ui/moving-border';
import { BorderButton } from '@/components/ui/border-button';

const socialLinks = [
  {
    icon: IconMail,
    href: 'mailto:your.email@example.com',
    label: 'Email',
  },
  {
    icon: IconBrandLinkedin,
    href: 'https://linkedin.com/in/your-profile',
    label: 'LinkedIn',
  },
  {
    icon: IconBrandDribbble,
    href: 'https://dribbble.com/your-profile',
    label: 'Dribbble',
  },
  {
    icon: IconBrandFigma,
    href: 'https://www.figma.com/@opeyemi_ajagbe',
    label: 'Figma',
  },
  {
    icon: () => <img src="/images/uxcel.svg" alt="UXcel" className="w-6 h-6 brightness-50 opacity-80 group-hover:brightness-200 group-hover:opacity-100" />,
    href: 'https://uxcel.com/your-profile',
    label: 'UXcel',
  },
];

const experiences = [
  {
    company: "Kobo360",
    companyUrl: "https://kobo360.com",
    role: "UI/UX Lead Engineer",
    period: "Dec 2021 - Present",
    description: "At Kobo360 as the UI/UX Lead, I directed the design of their global logistics operating system, ensuring an enhanced user experience for diverse stakeholders. This innovative contribution was instrumental in fuelling a marked surge in platform adoption and overall business expansion. My user-centric methodologies, coupled with a collaborative spirit, fortified Kobo360's reputation as an industry frontrunner.",
    accomplishments: [
      "Championed user-centred design by leading research efforts through interviews, surveys, and competitive analyses.",
      "Pioneered a holistic design system, expediting prototype development and ensuring consistent brand representation.",
      "Streamlined the design process by bridging gaps between functional requirements and actionable design solutions, leading to a 15% reduction in project delivery time."
    ]
  },
  {
    company: "Kobo360",
    companyUrl: "https://kobo360.com",
    role: "Senior UI/UX Designer",
    period: "May 2019 - Oct 2021",
    accomplishments: [
      "Delivered intuitive interfaces and wireframes that improved user engagement by 20%.",
      "Fostered collaborations with cross-functional teams, ensuring alignment between design and business objectives, which resulted in a 10% increase in goal conversions.",
      "Introduced and maintained an evolving set of design patterns and guidelines, elevating design consistency and improving user comprehension."
    ]
  },
  {
    company: "Kobo360",
    companyUrl: "https://kobo360.com",
    role: "UI/UX Designer",
    period: "Nov 2018 - Apr 2019",
    accomplishments: [
      "Developed MVP designs instrumental in securing over $80 million in investor funding.",
      "Solely managed the design and maintenance of Kobo360's digital assets, leading to a 25% increase in user satisfaction ratings.",
      "Established effective communication channels with developers and stakeholders, improving workflow efficiency by 20%."
    ]
  },
  {
    company: "Hydrogen Pay",
    companyUrl: "https://hydrogenpay.com",
    role: "Senior Product Designer (Contract)",
    period: "Jan 2023 - Mar 2024",
    description: "At Hydrogen Pay, as a Senior Product Designer, I spearheaded design solutions that enhanced user experience, leading to significant growth in engagement and retention. My cross-functional collaborations refined the product interface, bolstering Hydrogen Pay's market stance and user confidence.",
    accomplishments: [
      "Pioneered the design of the API portal, serving as a comprehensive guide for customer developer teams, and facilitating smooth integration with the HydrogenPay payment solution.",
      "Designed an intuitive POS solution interface, enhancing the customer payment experience and accelerating transaction times.",
      "Played an instrumental role in developing a dispute resolution and reconciliation portal, a critical tool for internal operations, resulting in reduced conflicts and a more streamlined reconciliation process.",
      "Collaborated closely with the broader design team to architect a robust design system, laying the foundation for consistent user interfaces across all of Hydrogen's web and mobile applications."
    ]
  },
  {
    company: "ggCircuit",
    companyUrl: "https://ggcircuit.com",
    role: "Senior Product Designer",
    period: "Nov 2021 - Jun 2022",
    accomplishments: [
      "Spearheaded the design initiatives for products like Omega, ggLeap, ggRock, and EGL Arcade, introducing an enhanced self-service esports experience, resulting in an uptick in user satisfaction by 25%.",
      "Successfully orchestrated a website overhaul, slashing bounce rates by a notable 40%, and enhancing user engagement and retention.",
      "Pioneered user research projects, translating insights into actionable design recommendations. Consequently, the product's core user tasks witnessed a design evolution, leading to increased user efficiency.",
      "Conceived and implemented a comprehensive design system, cementing a unified visual identity across ggCircuit's product suite, which boosted brand recall and user comfort."
    ]
  }
];

const education = [
  {
    institution: "Federal University of Technology, Minna",
    degree: "Mechanical Engineering (B.Eng.)",
    graduationDate: "Nov 2011"
  }
];

const certifications = [
  {
    title: "UI/UX Designer (Professional Certification)",
    organization: "Uxcel",
    year: "2024",
    url: "https://app.uxcel.com/certificates/41MFU7RO4LWW"
  },
  {
    title: "UI Designer (Professional Certification)",
    organization: "Uxcel",
    year: "2024",
    url: "https://app.uxcel.com/certificates/RIHKDBG9G4HC"
  },
  {
    title: "Strategic Innovation",
    organization: "Hydrogen Pay",
    year: "2022"
  },
  {
    title: "Google UX Design",
    organization: "Google",
    year: "2021"
  },
  {
    title: "Product Management",
    organization: "Product School",
    year: "2021"
  },
  {
    title: "UI/UX Design Thinking",
    organization: "Uxcel",
    year: "2020"
  },
  {
    title: "Product Design",
    organization: "Udacity",
    year: "2019"
  }
];

export default function AboutMe() {
  // Add timestamp for cache busting
  const timestamp = useMemo(() => new Date().getTime(), []);
  
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section with Card */}
        <section className="relative pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative z-10 backdrop-blur-md">
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="w-20 h-20 md:w-32 md:h-32 mb-6">
                  <HoverBorderGradient>
                    <img 
                      src={`/images/avatar.png?v=${timestamp}`}
                      alt="Opeyemi Ajagbe" 
                      className="w-full h-full object-cover rounded-full bg-neutral-950"
                    />
                  </HoverBorderGradient>
                </div>
                
                {/* Name and Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
                  Opeyemi Ajagbe
                </h1>
                <h2 className="text-base md:text-lg font-normal mb-4 text-neutral-400 text-center">
                  Snr. Product Designer
                </h2>

                {/* Social Links */}
                <div className="flex items-center gap-6 mb-8">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors group"
                      aria-label={link.label}
                    >
                      {typeof link.icon === 'function' ? 
                        link.icon() : 
                        <link.icon className="w-6 h-6" />
                      }
                    </a>
                  ))}
                </div>

                {/* Download Resume Button */}
                <BorderButton
                  as="a"
                  href={`/OpeyemiAjagbe-Resume.pdf?v=${timestamp}`}
                  download
                  className="w-full max-w-[280px] h-[52px] text-base"
                >
                  <span className="flex items-center justify-center gap-3">
                    <IconDownload className="w-6 h-6" />
                    Download Resume
                  </span>
                </BorderButton>
                
                {/* Bio */}
                <p className="text-neutral-300 leading-relaxed text-left pt-8">
                  A seasoned UX/UI Designer with a track record spanning 9+ years across diverse sectors such as Fintech, Logistics, Edu-tech, and E-Sport Entertainment. Demonstrated expertise in the full design lifecycle, from conceptualization to deployment, achieving a 50% boost in user satisfaction and contributing to a 30% company growth. Possesses a keen aptitude for integrating cutting-edge technologies with user-centric designs. Recognized for collaborative ethos, clear communication, and aligning product visions with organizational objectives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Professional Experience</h2>
            <div className="bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors p-6">
              {experiences.map((experience, index) => (
                <Experience 
                  key={index} 
                  {...experience} 
                  isLast={index === experiences.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
            <div className="bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors p-6">
              {education.map((edu, index) => (
                <Education 
                  key={index} 
                  {...edu}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trainings & Certifications Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Trainings & Certifications</h2>
            <div className="bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors p-6">
              {certifications.map((cert, index) => (
                <Certification 
                  key={index} 
                  {...cert} 
                  isLast={index === certifications.length - 1}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
