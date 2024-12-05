import React from 'react';
import { FloatingNav } from './ui/floating-navbar';

const navItems = [
  { name: 'My Projects', link: '#' },
  { name: 'About Me', link: '/about' },
  { name: 'Send a Message', link: '#' },
];

export default function Navbar() {
  return <FloatingNav navItems={navItems} />;
}
