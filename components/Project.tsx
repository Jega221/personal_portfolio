"use client";

import { useEffect, useRef, useState } from "react";
import { animateProjectTransition } from "@/lib/gsap/animations";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import { projectsData } from "@/data/projects"; 

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);


const Project = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectContentRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const scrollTriggersRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  const [isMobile, setIsMobile] = useState(false); 

  const latestActiveProjectIndex = useRef(activeProjectIndex);
  useEffect(() => {
    latestActiveProjectIndex.current = activeProjectIndex;
  }, [activeProjectIndex]);

  
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };


    handleResize(); 

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // Effect to trigger project content animation
  useEffect(() => {
    if (isMobile) return; // Only run animation logic if it's the desktop layout

    if (projectContentRef.current && numbersRef.current) {
      animateProjectTransition(
        projectContentRef.current,
        numbersRef.current,
        activeProjectIndex
      );
    }
  }, [activeProjectIndex, isMobile]); // Dependency on isMobile to re-trigger if layout changes

  // Effect to set up ScrollTriggers
  useEffect(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.trigger instanceof HTMLElement &&
      trigger.trigger.classList.contains("project-scroll-trigger")
    ) {
      trigger.kill();
    }
  });

  if (!isMobile) {
  projectsData.forEach((_, i) => {
    const triggerElement = scrollTriggersRefs.current[i];
    if (triggerElement) {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (latestActiveProjectIndex.current !== i) {
            setActiveProjectIndex(i);
          }
        },
        onEnterBack: () => {
          if (latestActiveProjectIndex.current !== i) {
            setActiveProjectIndex(i);
          }
        },
        anticipatePin: 1,
        id: `project-trigger-${i}`,
      });
    }
  });
}


  return () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.trigger instanceof HTMLElement &&
        trigger.trigger.classList.contains("project-scroll-trigger")
      ) {
        trigger.kill();
      }
    });
  };
}, [isMobile]);


  const handleClickNumber = (index: number) => {
    if (scrollTriggersRefs.current[index]) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: scrollTriggersRefs.current[index]!,
          offsetY: window.innerHeight / 2,
        },
        ease: "power2.inOut",
        onComplete: () => {
          setActiveProjectIndex(index);
        },
      });
    }
  };

  const currentProject = projectsData[activeProjectIndex];

  return (
    <>
      {/* OUTSIDE SECTION - Heading */}
      <div className="relative py-20 px-[--spacing-container]">
        <div className="max-w-6xl mx-auto"> 
        <h2 className="text-5xl md:text-6xl font-bold text-white">Projects</h2>
      </div>
      </div>

      {/* Conditional Rendering based on isMobile state */}
      {/* On SSR, isMobile is false, so it renders the desktop section first */}

      {/* Conditional Rendering based on isMobile state */}
      {/* On SSR, isMobile is false, so it renders the desktop section first */}
      {isMobile ? (
        // MOBILE: Stack projects
        <section className="px-[--spacing-container] pb-20">
          <div className="max-w-6xl mx-auto"> 
          <div className="flex flex-col gap-20">
            {projectsData.map((project, index) => (
              <div key={index} className="fade-in">
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-full rounded-xl object-cover"
                />
                <div className="mt-4">
                  <h3 className="text-2xl font-heading text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/80 mt-2 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    className="mt-3 inline-flex items-center gap-1 text-sm text-primary underline"
                  >
                    Link
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-up-right"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17L17 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      ) : (
        // DESKTOP: Scroll-triggered animated layout
        <section id="projects" className="relative py-28 px-[--spacing-container]">
          <div className="max-w-6xl mx-auto"> 
          <div className="relative flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            {/* Number List */}
            <div
              ref={numbersRef}
              // Removed 'hidden md:flex' to prevent hydration mismatch
              // Changed to 'flex' directly, as it's only rendered on desktop now
              className="flex flex-col justify-start gap-12 text-white font-heading text-2xl sticky top-1/2 -translate-y-1/2 ml-6"
            >
              {projectsData.map((_, i) => (
                <span
                  key={i}
                  className={`project-number cursor-pointer transition-opacity duration-300 ${
                    activeProjectIndex === i ? "opacity-100" : "opacity-30"
                  }`}
                  data-index={i}
                  onClick={() => handleClickNumber(i)}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>

            {/* Project Content */}
            <div className="flex-1 relative">
              <div className="project-sticky-content md:sticky md:top-1/2 md:-translate-y-1/2 md:w-full max-w-xl mx-auto">
                <div ref={projectContentRef} className="project-content-item w-full">
                  {currentProject && (
                    <>
                      <img
                        src={currentProject.imageSrc}
                        alt={currentProject.title}
                        className="w-full rounded-xl object-cover"
                      />
                      <div className="mt-6">
                        <h3 className="text-2xl font-heading text-white">
                          {currentProject.title}
                        </h3>
                        <div className="flex justify-between items-start gap-6 mt-3">
                          <p className="text-white/80 max-w-[70%] text-sm leading-relaxed">
                            {currentProject.description}
                          </p>
                          <a
                            href={currentProject.link}
                            className="text-primary underline inline-flex items-center gap-1 text-sm"
                          >
                            Link
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-arrow-up-right"
                            >
                              <path d="M7 7h10v10" />
                              <path d="M7 17L17 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Scroll Triggers */}
              <div className="scroll-triggers-container">
                {projectsData.map((_, i) => (
                  <div
                    key={`scroll-trigger-${i}`}
                    ref={(el) => {
                      scrollTriggersRefs.current[i] = el;
                    }}
                    className="project-scroll-trigger"
                    style={{
                      height: "100vh",
                      pointerEvents: "none",
                      position: "relative",
                    }}
                  />
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Project;
