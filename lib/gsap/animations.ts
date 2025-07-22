
// lib/gsap/animations.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateProjectTransition = (
  projectContentElement: HTMLElement,
  numbersContainer: HTMLElement,
  activeProjectIndex: number
) => {
  const projectItem = projectContentElement.querySelector('.project-content-item') as HTMLElement;
  const numbers = gsap.utils.toArray<HTMLElement>(".project-number", numbersContainer);

  const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.inOut" } });

  tl.fromTo(projectItem,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
  );

  numbers.forEach((numEl, i) => {
    gsap.to(numEl, {
      opacity: i === activeProjectIndex ? 1 : 0.3,
      duration: 0.6,
      ease: "power2.inOut",
    });
  });
};
