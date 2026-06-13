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
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 transition-all duration-500 rounded-2xl ${
        scrolled
          ? 'bg-[#050508]/75 backdrop-blur-md border border-white/10 shadow-lg shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto px-6 flex items-center justify-between"> 
        {/* Logo */}
        <Link href="#home" className="text-xl font-bold font-heading text-white tracking-tight hover:opacity-80 transition-opacity">
          Jegabig<span className="text-primary font-bold font-sans">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white transition-all relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-semibold px-4 py-2 rounded-full text-white"
          >
            Get in Touch
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050508]/95 backdrop-blur-lg mt-3 rounded-2xl border border-white/10 py-6 text-white text-sm font-medium">
          <div className="space-y-4 px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center border border-white/15 bg-white/5 py-2 rounded-xl text-white text-xs"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
