'use client'

import React from 'react'

export default function Footer() {
  const contactMethods = [
    {
      label: 'Email',
      value: 'asjega11@gmail.com',
      href: 'mailto:asjega11@gmail.com',
      actionText: 'Write me an email',
      color: 'from-primary/20 to-primary/0',
    },
    {
      label: 'WhatsApp',
      value: '+90 548 852 71 43',
      href: 'https://wa.me/905488527143',
      actionText: 'Send a message',
      color: 'from-green-500/10 to-green-500/0',
    },
    {
      label: 'Upwork',
      value: 'jegabig',
      href: 'https://www.upwork.com/freelancers/~01bdbc178c8da49e17?viewMode=1',
      actionText: 'Hire me on Upwork',
      color: 'from-accent/20 to-accent/0',
    },
  ];

  return (
    <footer id="contact" className="text-white py-20 px-[--spacing-container] relative bg-transparent">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#CE7659]/30 to-transparent mb-16"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Headline */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-gradient-primary">
              Let&apos;s start a project together
            </h2>
            <p className="text-white/70 max-w-sm leading-relaxed font-body">
              Looking for a custom web app, an AI integration, or want to collaborate? Reach out through any of these platforms!
            </p>
          </div>

          {/* Cards & Socials */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative min-h-[160px]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50">{method.label}</span>
                  <h3 className="text-lg font-semibold mt-1 text-white group-hover:text-primary transition-colors duration-300">
                    {method.value}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/60 group-hover:text-white mt-6 font-semibold transition-colors duration-300">
                  <span>{method.actionText}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17L17 7" />
                  </svg>
                </div>
              </a>
            ))}

            {/* Socials Card */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[160px]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">Follow Me</span>
                <h3 className="text-lg font-semibold mt-1 text-white">Social Channels</h3>
              </div>
              
              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.linkedin.com/in/abubakar-sani-391332170/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all hover:-translate-y-0.5 text-[#0A66C2]"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25zM19 19h-3v-5.625c0-1.002-.017-2.723-1.666-2.723-1.667 0-1.923 1.298-1.923 2.64v5.708h-3v-9h2.891l.133 1.341h.063c.381-.656 1.306-1.667 3.013-1.667 3.22 0 3.815 2.115 3.815 4.858V19z" />
                  </svg>
                </a>
                
                <a
                  href="https://x.com/jegabig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all hover:-translate-y-0.5 text-white"
                  aria-label="Twitter / X"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.21-6.917L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.714 6.255L18.244 2.25zm-2.91 16.607h1.44L6.132 4.41H4.56l11.774 14.447z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-20 pt-8 border-t border-white/[0.05] text-xs text-white/40 font-mono gap-4 w-full">
          <p>© {new Date().getFullYear()} Jegabig. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS & GSAP</p>
        </div>
      </div>
    </footer>
  )
}
