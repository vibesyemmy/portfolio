import React from 'react';
import { IconBrandLinkedin, IconBrandDribbble, IconBrandBehance, IconMail } from '@tabler/icons-react';
import UxcelIcon from '../assets/uxcel.svg';

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
    icon: IconBrandBehance,
    href: 'https://behance.net/your-profile',
    label: 'Behance',
  },
  {
    icon: () => <img src={UxcelIcon} alt="UXcel" className="w-6 h-6 brightness-50 opacity-80 group-hover:brightness-200 group-hover:opacity-100" />,
    href: 'https://uxcel.com/your-profile',
    label: 'UXcel',
  },
];

export default function Footer() {
  return (
    <footer className="w-full pt-2 pb-8 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors group"
                aria-label={link.label}
              >
                {typeof link.icon === 'function' ? link.icon() : <link.icon className="w-6 h-6" />}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Opeyemi Ajagbe. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
