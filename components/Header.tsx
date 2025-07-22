'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Project', href: '#project' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 section-container ${
        scrolled ? 'bg-[var(--color-black)]/80 backdrop-blur border-b border-white/10' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto py-4 flex items-center justify-between"> 
        {/* Logo */}
        <Link href="home" className="text-xl font-bold font-[var(--font-heading)] text-white">
          Jegabig
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-white">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
  <div className="md:hidden bg-[var(--color-black)] py-6 text-white text-sm font-medium">
    <div className="max-w-6xl mx-auto px-[--spacing-container] space-y-4">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={() => setMobileMenuOpen(false)}
          className="block hover:text-[var(--color-primary)] transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
)}
    </header>
  );
}
