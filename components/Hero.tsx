'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const rotatingWords = ['beautiful', 'intelligent', 'scalable', 'modern']

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<HTMLSpanElement[][]>([])
  const [current, setCurrent] = useState(0)

  const diagramRef = useRef<HTMLDivElement>(null)

  // Character span logic
  const buildSpans = (word: string, wordIndex: number) =>
    word.split('').map((char, i) => (
      <span
        key={`${char}-${i}`}
        className="inline-block opacity-0"
        ref={(el) => {
          if (!wordRefs.current[wordIndex]) wordRefs.current[wordIndex] = []
          if (el) wordRefs.current[wordIndex][i] = el
        }}
      >
        {char}
      </span>
    ))

  // Animate word change
  useEffect(() => {
    const animateWordIn = (index: number) => {
      gsap.fromTo(
        wordRefs.current[index],
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 0.6, ease: 'power2.in' }
      )
    }

    const animateWordOut = (index: number) => {
      gsap.to(wordRefs.current[index], {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.Out',
      })
    }

    animateWordIn(current)
    const interval = setInterval(() => {
      animateWordOut(current)
      const next = (current + 1) % rotatingWords.length
      setTimeout(() => {
        setCurrent(next)
        animateWordIn(next)
      }, 600)
    }, 4000)

    return () => clearInterval(interval)
  }, [current])

  // Animate diagram on scroll
  useEffect(() => {
    if (!diagramRef.current) return

    gsap.fromTo(
      diagramRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: diagramRef.current,
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <section className="py-28 text-white"> 
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] font-bold leading-tight">
            Make your site{' '}
            <span className="inline-block relative w-[200px] h-[1em]" ref={containerRef}>
              {rotatingWords.map((word, i) => (
                <span
                  key={word}
                  className={`absolute top-0 left-0 w-full flex gap-[1px] justify-start ${
                    i === current ? 'block' : 'hidden'
                  }`}
                >
                  {buildSpans(word, i)}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-lg">
            I build clean, modern websites that look great and perform even better, powered by intelligent, scalable solutions.
          </p>

          <a href="#contact" className="mt-8 bg-[var(--color-primary)] text-white px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition flex items-center justify-center relative inline-flex">
            <span className="absolute left-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Let's Talk
          </a>
        </div>

        <div ref={diagramRef} className="flex-1 w-full flex justify-center">
          <Image
            src="/diagram-flow.png"
            alt="Diagram"
            width={700}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
