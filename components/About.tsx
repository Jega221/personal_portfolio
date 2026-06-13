'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.bento-box');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const bentoBoxBaseClasses = "bento-box glass-panel p-6 flex flex-col justify-between text-left rounded-2xl transition-all duration-500 group overflow-hidden relative min-h-[320px]";
  const imageBaseClasses = "mb-4 object-contain mx-auto block group-hover:scale-[1.03] transition-transform duration-500 max-h-[160px]";
  const headingClasses = "text-xl font-semibold mb-2 text-white font-heading group-hover:text-primary transition-colors duration-300 relative z-10";
  const paragraphClasses = "text-sm text-white/70 font-body leading-relaxed relative z-10";

  return (
    <section ref={sectionRef} id="about" className="py-24 px-[--spacing-container] relative">
      {/* Decorative Blur blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto"> 
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-left text-white font-heading">
          About Me
        </h2>

        <div className="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-4 md:gap-6">
        
          {/* Bento Box 1: Hi, I'm Jegabig */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-5`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Image
              src="/grid1.png" 
              alt="Creative Coder"
              width={290}
              height={290}
              className={imageBaseClasses}
            />
            <div>
              <h3 className={headingClasses}>Hi, I am Jegabig</h3> 
              <p className={paragraphClasses}>I&apos;m a Web Developer and AI Engineer specializing in building custom AI. I have helped startups and solo founders bring their AI ideas to life.</p>
            </div>
          </div>

          {/* Bento Box 2: Tech Stack */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-5`}> 
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Image
              src="/grid2.png"
              alt="AI Solutions"
              width={200}
              height={140}
              className={imageBaseClasses}
            />
            <div>
              <h3 className={headingClasses}>Tech Stack</h3>
              <p className={paragraphClasses}>I specialize in a variety of languages, frameworks, and tools that allow me to build robust, scalable, and intelligent applications.</p>
            </div>
          </div>

          {/* Bento Box 3: My Passion */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-4`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Image
              src="/grid3.png"
              alt="Freelance Expert"
              width={320}
              height={350}
              className={imageBaseClasses} 
            />
            <div>
              <h3 className={headingClasses}>My Passion</h3>
              <p className={paragraphClasses}>I love solving problems and building things through code. Programming isn&apos;t just my profession&mdash;it&apos;s my passion. I enjoy exploring new technologies and continuously enhancing my skills.</p>
            </div>
          </div>

          {/* Bento Box 4: Time zone & location */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-3`}>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Image
              src="/grid4.png"
              alt="Time Zone and Location"
              width={160}
              height={120}
              className={imageBaseClasses} 
            />
            <div>
              <h3 className={headingClasses}>Time zone & location</h3>
              <p className={paragraphClasses}>I am based in Kyrenia, Cyprus and open to remote work worldwide.</p>
            </div>
          </div>

          {/* Bento Box 5: Contact me */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-3 justify-center items-center`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Image
              src="/grid5.png"
              alt="Contact Me"
              width={200}
              height={290}
              className={`${imageBaseClasses} max-h-[140px]`} 
            />
            <div className="text-center w-full mt-4">
              <h3 className="text-xl font-semibold mb-2 text-white font-heading group-hover:text-primary transition-colors duration-300">Contact me</h3>
              <a href="mailto:asjega11@gmail.com" className="text-sm text-primary underline hover:text-primary-hover transition-colors font-body block truncate">
                asjega11@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
