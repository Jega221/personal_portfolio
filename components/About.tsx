'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useEffect(() => {
    gsap.from('.bento-box', {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 85%',
      },
    })
  }, [])

  return (
    <section id="about" className="py-12 px-[--spacing-container]">
      <div className="max-w-6xl mx-auto"> 
      <h2 className="text-3xl md:text-5xl font-bold mb-12">About Me</h2>

      <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-2">
      
        <div className="bento-box bg-[--color-dark] rounded-2xl border border-white/10 p-6 flex flex-col text-left lg:col-span-5">
          <Image
            src="/grid1.png" 
            alt="Creative Coder"
            width={290}
            height={290}
            className="mb-4 object-contain mx-auto block"
          />
          <h3 className="text-xl font-heading mb-2">Hi, am jegabig</h3>
          <p className="text-sm text-white/80 font-body">I'm a Web Developer and AI Engineer specializing in building custom AI. I have helped startups and solo founders bring their AI ideas to life.</p>
        </div>

        <div className="bento-box bg-[--color-dark] rounded-2xl border border-white/10 p-6 flex flex-col text-left lg:col-span-5">
          <Image
            src="/grid2.png"
            alt="AI Solutions"
            width={200}
            height={140}
            className="mb-4 object-contain mx-auto block"
          />
          <h3 className="text-xl font-heading mb-2">Tech Stack</h3>
          <p className="text-sm text-white/80 font-body">I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications</p>
        </div>

        <div className="bento-box bg-[--color-dark] rounded-2xl border border-white/10 p-6 flex flex-col text-left lg:col-span-4">
          <Image
            src="/grid3.png"
            alt="Freelance Expert"
            width={320}
            height={350}
            className="mb-4 object-contain mx-auto block" 
          />
          <h3 className="text-xl font-heading mb-2">My Passion</h3>
          <p className="text-sm text-white/80 font-body">I love solving problems and building things through code. Programming isn't just my profession—it's my passion. I enjoy exploring new technologies, and enhancing my skills. </p>
        </div>

        <div className="bento-box bg-[--color-dark] rounded-2xl border border-white/10 p-6 flex flex-col text-left lg:col-span-3">
          <Image
            src="/grid4.png"
            alt="Tech Stack"
            width={160}
            height={120}
            className="mb-4 object-contain mx-auto block" 
          />
          <h3 className="text-xl font-heading mb-2">Time zone & location</h3>
          <p className="text-sm text-white/80 font-body">I am based in Kyrania, Cyprus and open to remote work worldwide.</p>
        </div>

        <div className="bento-box bg-[--color-dark] rounded-2xl border border-white/10 p-6 flex flex-col text-left lg:col-span-3">
          <Image
            src="/grid5.png"
            alt="Remote"
            width={200}
            height={290}
            className="mb-4 object-contain mx-auto block"
          />
          <h3 className="text-xl text-center font-heading mb-2">Contact me</h3>
          <p className="text-sm text-center text-white/80 font-body">asjega11@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  )
}
