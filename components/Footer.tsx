'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="text-white py-8 px-[--spacing-container]">
      <div className="max-w-6xl mx-auto"> 
      
      <div className="w-full h-px bg-[#CE7659] mb-12"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-6">Get in touch</h3>
          <ul className="space-y-3 text-lg">
            <li>
              <span className="text-white/70">Email: </span>
              <a href="mailto:asjega11@gmail.com" className="text-white hover:text-primary transition-colors">
                asjega11@gmail.com
              </a>
            </li>
            <li>
              <span className="text-white/70">Whatsapp: </span>
              <a href="[https://wa.me/905488527143](https://wa.me/905488527143)" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                +90 548 852 71 43
              </a>
            </li>
            <li>
              <span className="text-white/70">Upwork: </span>
              <a href="https://www.upwork.com/freelancers/~01bdbc178c8da49e17?viewMode=1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                jegabig
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-6">Socials</h3>
          <ul className="space-y-4">
            <li>
              <a href="https://www.linkedin.com/in/abubakar-sani-391332170/" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-primary transition-colors">
                
                <svg
                  xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 mr-3 text-[#0A66C2]" 
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25zM19 19h-3v-5.625c0-1.002-.017-2.723-1.666-2.723-1.667 0-1.923 1.298-1.923 2.64v5.708h-3v-9h2.891l.133 1.341h.063c.381-.656 1.306-1.667 3.013-1.667 3.22 0 3.815 2.115 3.815 4.858V19z" />
                </svg>
                <span className="text-lg">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://x.com/jegabig" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-primary transition-colors">
                
                <svg
                  xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 mr-3 text-[#CE7659]" 
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.21-6.917L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.714 6.255L18.244 2.25zm-2.91 16.607h1.44L6.132 4.41H4.56l11.774 14.447z" />
                </svg>
                <span className="text-lg">Twitter</span>
              </a>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
