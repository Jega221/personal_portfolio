'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Define your service data
const servicesData = [
  {
    icon: (
      <svg
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 text-orange-400" // Icon color
      >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16" />
        <path d="M22 10h-6" />
        <path d="M22 14h-6" />
      </svg>
    ),
    title: 'Web design',
    description:
      'I create websites that are not just beautiful to look at, but also incredibly easy for your visitors to use. My goal is to build an online presence that feels effortless and looks stunning.',
  },
  {
    icon: (
      <svg
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 text-purple-400" 
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Web development',
    description:
      'I build your projects with organized code. This means your website will be reliable, easy to update, and ready to grow with your business, allowing us to add new features efficiently whenever you need them.',
  },
  {
    icon: (
      <svg
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 text-blue-400" 
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
    title: 'AI & Automation Solutions',
    description:
      'I integrate intelligent systems to automate tasks, personalize experiences, and optimize operations. This brings efficiency and innovation to your business.',
  },
  {
    icon: (
      <svg
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 text-teal-400" 
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Intelligent Data & Search',
    description:
      'I develop solutions that leverage advanced data processing and semantic understanding to deliver powerful insights and highly accurate search capabilities.',
  },
]

export default function Services() {
  useEffect(() => {
    
    gsap.to('.service-card', {
      opacity: 1, 
      y: 0,     
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#services',
        start: '50',
        end: 'bottom 10%',
      },
    })
  }, [])

  return (
    <section id="services" className="py-20 px-[--spacing-container] bg-black text-white">
      <div className="max-w-6xl mx-auto"> 
      {/* Section Heading */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12 ">Services</h2> {/* Added text-center */}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map((service, index) => (
          <div
            key={index}
            
            className="service-card bg-transparent p-6 rounded-lg flex flex-col items-start text-left opacity-0 translate-y-12" // Added opacity-0 and translate-y-12
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
