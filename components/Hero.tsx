'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

const rotatingWords = ['beautiful', 'intelligent', 'scalable', 'modern']

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const textRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (current + 1) % rotatingWords.length
      
      const tl = gsap.timeline()
      
      tl.to('.rotating-word-active', {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setCurrent(next)
        }
      })
      
      tl.fromTo('.rotating-word-active', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }, 3500)

    return () => clearInterval(interval)
  }, [current])

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
      )
    }

    if (diagramRef.current) {
      gsap.fromTo(diagramRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 }
      )
      
      gsap.to(diagramRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })
    }
  }, [])

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center py-32 overflow-hidden px-[--spacing-container]">
      {/* Abstract background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10 w-full">
        {/* Text content */}
        <div ref={textRef} className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/70 font-mono tracking-wider uppercase">Available for freelance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white font-heading">
            Make your site{' '}
            <span className="block mt-2 h-[1.2em] overflow-hidden relative">
              <span className="rotating-word-active inline-block text-gradient-accent pb-1">
                {rotatingWords[current]}
              </span>
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-white/70 max-w-lg leading-relaxed font-body">
            I build high-end, responsive websites that convert. Bridging premium design and production-ready code with intelligent, scalable integrations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Let&apos;s collaborate
            </a>
            <a 
              href="#project" 
              className="border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
            >
              View Work
            </a>
          </div>
        </div>

        {/* Diagram / Graphic */}
        <div ref={diagramRef} className="flex-1 w-full flex justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-3xl blur-2xl -z-10" />
          
          <div className="glass-panel p-4 rounded-3xl w-full max-w-[550px] shadow-2xl shadow-black/80 hover:border-white/15 transition-colors duration-500">
            <Image
              src="/diagram-flow.png"
              alt="System architecture diagram"
              width={700}
              height={500}
              className="object-contain w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
