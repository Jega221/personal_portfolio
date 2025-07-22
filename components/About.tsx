'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Use destructuring for ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    // Ensure the trigger element exists before animating
    const bentoGrid = document.querySelector('.bento-grid');
    if (bentoGrid) {
      gsap.from('.bento-box', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: bentoGrid, // Reference the actual DOM element
          start: 'top 85%',
          once: true, // Animation plays only once when element enters viewport
        },
      });
    }

    // Cleanup for ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array means this runs once on mount

  // Define common classes for bento boxes to reduce repetition and ensure consistency
  // All bento boxes should have the same border-radius. Using rounded-xl for consistency.
  const bentoBoxBaseClasses = "bento-box bg-[--color-dark] border border-white/10 p-6 flex flex-col text-left rounded-xl";
  const imageBaseClasses = "mb-4 object-contain mx-auto block"; // Centralize image styling
  const headingClasses = "text-xl font-heading mb-2";
  const paragraphClasses = "text-sm text-white/80 font-body";

  return (
    <section id="about" className="py-12 px-[--spacing-container]">
      {/* Added max-w-6xl mx-auto wrapper for consistent desktop content width */}
      <div className="max-w-6xl mx-auto"> 
        <h2 className="text-3xl md:text-5xl font-bold mb-12">About Me</h2> {/* Added text-center for consistency */}

        {/* Adjusted gap for better responsiveness across more breakpoints */}
        <div className="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-3 sm:gap-4 md:gap-6">
        
          {/* Bento Box 1: Hi, I'm Jegabig */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-5`}>
            <Image
              src="/grid1.png" 
              alt="Creative Coder"
              width={290}
              height={290}
              className={imageBaseClasses}
            />
            <h3 className={headingClasses}>Hi, I am Jegabig</h3> 
            <p className={paragraphClasses}>I&apos;m a Web Developer and AI Engineer specializing in building custom AI. I have helped startups and solo founders bring their AI ideas to life.</p> {/* FIXED: Escaped apostrophe */}
          </div>

          {/* Bento Box 2: Tech Stack */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-5`}> 
            <Image
              src="/grid2.png"
              alt="AI Solutions"
              width={200}
              height={140}
              className={imageBaseClasses}
            />
            <h3 className={headingClasses}>Tech Stack</h3>
            <p className={paragraphClasses}>I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications.</p>
          </div>

          {/* Bento Box 3: My Passion */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-4`}> {/* Removed redundant rounded-2xl */}
            <Image
              src="/grid3.png"
              alt="Freelance Expert"
              width={320}
              height={350}
              className={imageBaseClasses} 
            />
            <h3 className={headingClasses}>My Passion</h3>
            <p className={paragraphClasses}>I love solving problems and building things through code. Programming isn&apos;t just my profession&mdash;it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.</p> {/* FIXED: Escaped apostrophes */}
          </div>

          {/* Bento Box 4: Time zone & location */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-3`}> {/* Removed redundant rounded-2xl */}
            <Image
              src="/grid4.png"
              alt="Time Zone and Location" // Improved alt text
              width={160}
              height={120}
              className={imageBaseClasses} 
            />
            <h3 className={headingClasses}>Time zone & location</h3>
            <p className={paragraphClasses}>I am based in Kyrenia, Cyprus and open to remote work worldwide.</p> {/* FIXED: Corrected spelling of Kyrenia */}
          </div>

          {/* Bento Box 5: Contact me */}
          <div className={`${bentoBoxBaseClasses} lg:col-span-3`}> {/* Removed redundant rounded-2xl */}
            <Image
              src="/grid5.png"
              alt="Contact Me" // Improved alt text
              width={200}
              height={290}
              className={imageBaseClasses} 
            />
            <h3 className={`${headingClasses} text-center`}>Contact me</h3>
            <p className={`${paragraphClasses} text-center`}>asjega11@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
