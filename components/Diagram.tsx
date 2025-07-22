'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Define a type for our path data, including control points for Bezier curves
interface PathData {
  id: string; // Unique ID for the path
  startElId: string;
  startElPos: 'left' | 'right' | 'top' | 'bottom' | 'center';
  endElId: string;
  endElPos: 'left' | 'right' | 'top' | 'bottom' | 'center';
  type: 'bezier' | 'line';
  cp1Offset?: number; // Horizontal offset for control point 1 (from start)
  cp2Offset?: number; // Horizontal offset for control point 2 (from end)
  cp1VerticalOffset?: number; // Vertical offset for control point 1
  cp2VerticalOffset?: number; // Vertical offset for control point 2
}

// Define all the paths for the diagram
const diagramPaths: PathData[] = [
  // Left blocks to LLM Models
  { id: 'design-llm', startElId: 'design', startElPos: 'right', endElId: 'llm-models', endElPos: 'left', type: 'bezier', cp1Offset: 80, cp2Offset: -80 },
  { id: 'webdev-llm', startElId: 'web-develop', startElPos: 'right', endElId: 'llm-models', endElPos: 'left', type: 'bezier', cp1Offset: 80, cp2Offset: -80 },
  { id: 'dataprepA-llm', startElId: 'data-prep-a', startElPos: 'right', endElId: 'llm-models', endElPos: 'left', type: 'bezier', cp1Offset: 80, cp2Offset: -80 },
  { id: 'dataprepB-llm', startElId: 'data-prep-b', startElPos: 'right', endElId: 'llm-models', endElPos: 'left', type: 'bezier', cp1Offset: 80, cp2Offset: -80 },

  // LLM Models to Right blocks
  { id: 'llm-airesp', startElId: 'llm-models', startElPos: 'right', endElId: 'ai-resp', endElPos: 'left', type: 'bezier', cp1Offset: 80, cp2Offset: -80 },
  { id: 'llm-automations', startElId: 'llm-models', startElPos: 'right', endElId: 'automations', endElPos: 'left', type: 'bezier', cp1Offset: 80, cp2Offset: -80 },
  { id: 'llm-apiresp', startElId: 'llm-models', startElPos: 'right', endElId: 'api-resp', endElPos: 'left', type: 'bezier', cp1Offset: 80, cp2Offset: -80 },
  { id: 'llm-deployment', startElId: 'llm-models', startElPos: 'right', endElId: 'deployment', endElPos: 'left', type: 'bezier', cp1Offset: 80, cp2Offset: -80 },
];


export default function LLMDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the main diagram container
  const connectionPoints = useRef<{ [key: string]: HTMLElement | null }>({}); // To store refs to elements for line connections
  const animationFrameId = useRef<number | null>(null); // To store requestAnimationFrame ID for cleanup
  const animationProgress = useRef<{ [key: string]: number }>({}); // To store progress of light for each path

  // Helper to get coordinates relative to the canvas
  const getCoords = (elementId: string, position: 'left' | 'right' | 'top' | 'bottom' | 'center') => {
    const el = connectionPoints.current[elementId];
    const container = containerRef.current;
    if (!el || !container) return null;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let x, y;
    if (position === 'left') {
      x = elRect.left - containerRect.left;
      y = elRect.top - containerRect.top + elRect.height / 2;
    } else if (position === 'right') {
      x = elRect.right - containerRect.left;
      y = elRect.top - containerRect.top + elRect.height / 2;
    } else if (position === 'top') {
      x = elRect.left - containerRect.left + elRect.width / 2;
      y = elRect.top - containerRect.top;
    } else if (position === 'bottom') {
      x = elRect.left - containerRect.left + elRect.width / 2;
      y = elRect.bottom - containerRect.top;
    } else { // center
      x = elRect.left - containerRect.left + elRect.width / 2;
      y = elRect.top - containerRect.top + elRect.height / 2;
    }
    return { x, y };
  };

  // Function to get a point along a Bezier curve (t from 0 to 1)
  const getBezierPoint = (p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }, t: number) => {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const t2 = t * t;
    const mt3 = mt2 * mt;
    const t3 = t2 * t;

    return {
      x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
      y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
    };
  };

  // Function to draw all base lines and then animate the moving lights
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      animationFrameId.current = null; // Stop animation if elements are gone
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      animationFrameId.current = null;
      return;
    }

    // Set canvas dimensions to match container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas for redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Draw Base Lines (Subtle, no glow) ---
    ctx.strokeStyle = 'rgba(255, 165, 0, 0.2)'; // Subtle orange (primary color)
    ctx.lineWidth = 1;
    ctx.shadowBlur = 0; // No glow for base lines

    diagramPaths.forEach(pathDef => {
      const start = getCoords(pathDef.startElId, pathDef.startElPos);
      const end = getCoords(pathDef.endElId, pathDef.endElPos);

      if (start && end) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);

        if (pathDef.type === 'bezier') {
          const cp1 = { x: start.x + (pathDef.cp1Offset || 0), y: start.y + (pathDef.cp1VerticalOffset || 0) };
          const cp2 = { x: end.x + (pathDef.cp2Offset || 0), y: end.y + (pathDef.cp2VerticalOffset || 0) };
          ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
        } else { // type === 'line'
          ctx.lineTo(end.x, end.y);
        }
        ctx.stroke();
      }
    });

    // --- Draw Moving Glowing Lights ---
    ctx.strokeStyle = '#FF8C00'; // Bright orange (primary color) for glow
    ctx.lineWidth = 2; // Slightly thicker for glow
    ctx.shadowBlur = 15; // Stronger glow intensity
    ctx.shadowColor = '#FF8C00'; // Glow color

    const lightSpeed = 0.005; // How fast the light moves (adjust as needed)
    const lightLength = 0.08; // Length of the glowing segment (as a fraction of total path)
    const totalProgressRange = 1 + lightLength; 

    diagramPaths.forEach(pathDef => {
      if (animationProgress.current[pathDef.id] === undefined) {
        animationProgress.current[pathDef.id] = Math.random() * totalProgressRange; 
      }

      animationProgress.current[pathDef.id] = (animationProgress.current[pathDef.id] + lightSpeed); 

      const tCurrent = animationProgress.current[pathDef.id];
      const tStartSegment = Math.max(0, tCurrent - lightLength); 
      const tEndSegment = Math.min(1, tCurrent); 

      const start = getCoords(pathDef.startElId, pathDef.startElPos);
      const end = getCoords(pathDef.endElId, pathDef.endElPos);

      if (start && end) {
        if (tEndSegment > tStartSegment) {
          let point1, point2;

          if (pathDef.type === 'bezier') {
            const cp1 = { x: start.x + (pathDef.cp1Offset || 0), y: start.y + (pathDef.cp1VerticalOffset || 0) };
            const cp2 = { x: end.x + (pathDef.cp2Offset || 0), y: end.y + (pathDef.cp2VerticalOffset || 0) };
            point1 = getBezierPoint(start, cp1, cp2, end, tStartSegment);
            point2 = getBezierPoint(start, cp1, cp2, end, tEndSegment);
          } else { // type === 'line'
            point1 = {
              x: start.x + (end.x - start.x) * tStartSegment,
              y: start.y + (end.y - start.y) * tStartSegment,
            };
            point2 = {
              x: start.x + (end.x - start.x) * tEndSegment,
              y: start.y + (end.y - start.y) * tEndSegment,
            };
          }

          ctx.beginPath();
          ctx.moveTo(point1.x, point1.y);
          ctx.lineTo(point2.x, point2.y);
          ctx.stroke();
        }

        if (animationProgress.current[pathDef.id] >= totalProgressRange) {
          animationProgress.current[pathDef.id] = 0;
        }
      }
    });

    animationFrameId.current = requestAnimationFrame(renderCanvas);
  };

  // Effect for drawing lines on mount and resize
  useEffect(() => {
    const initDraw = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      diagramPaths.forEach(pathDef => {
        animationProgress.current[pathDef.id] = 0;
      });
      renderCanvas();
    };

    const timeoutId = setTimeout(initDraw, 50);

    window.addEventListener('resize', initDraw);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', initDraw);
    };
  }, []);

  // Optional: Scroll animation for the entire section
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  // Common styles for the diagram blocks
  // Adjusted for responsive scaling with max-w/h
  const blockClasses = "p-2 sm:p-3 md:p-4 rounded-lg border border-white/10 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center text-center flex-col";
  const iconClasses = "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-1 sm:mr-2 text-primary"; // Adjust size and color as needed
  const textResponsive = "text-xs sm:text-sm md:text-base"; // Responsive text size

  return (
    <section className="py-10 sm:py-16 md:py-20 px-[--spacing-container] bg-black text-white overflow-hidden">
      <div
        ref={containerRef}
        // Apply max-width and min-height for overall size control
        // Reduced max-w for desktop, smaller min-h for all screens
        className="relative w-full max-w-5xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl mx-auto
                   min-h-[100px] sm:min-h-[100px] md:min-h-[100px] lg:min-h-[150px]
                   flex flex-col md:flex-row items-center justify-center py-4 sm:py-6 md:py-8"
      >
        {/* Canvas for Lines - positioned absolutely behind content */}
        <canvas ref={canvasRef} className="absolute top-0 left-0 z-0"></canvas>

        {/* Content Blocks - z-10 to be above canvas */}
        {/* Adjusted gap values for responsiveness */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Left Column Blocks */}
          {/* Adjusted gap for responsiveness */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full md:w-1/4 lg:w-1/5">
            <div ref={el => { connectionPoints.current['design'] = el; }} className={blockClasses}>
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              <span className={textResponsive}>Design</span>
            </div>
            <div ref={el => { connectionPoints.current['web-develop'] = el; }} className={blockClasses}>
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M6 10h.01"/><path d="M10 10h.01"/></svg>
              <span className={textResponsive}>Web</span>
            </div>
            <div ref={el => { connectionPoints.current['data-prep-a'] = el; }} className={blockClasses}>
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              <span className={textResponsive}>Data</span>
            </div>
            {/* Added dataprepB back for consistency with diagramPaths */}
          
          </div>

          {/* Central LLM Models Block */}
          {/* Adjusted padding, text, min-h for responsiveness */}
          <div ref={el => { connectionPoints.current['llm-models'] = el; }} className="p-4 sm:p-5 md:p-6 rounded-lg border border-white/10 bg-gray-900/50 backdrop-blur-sm text-center w-full md:w-1/3 lg:w-1/4 flex flex-col items-center justify-center min-h-[150px] sm:min-h-[180px] md:min-h-[200px]">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">LLM</h3>
            <ul className="list-disc list-inside text-left text-xs sm:text-sm md:text-base space-y-0.5 sm:space-y-1">
              <li>Agent</li>
              <li>RAG</li>
              <li>Fine-Tuning</li>
            </ul>
          </div>

          {/* Right Column Blocks */}
          {/* Adjusted gap for responsiveness */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full md:w-1/4 lg:w-1/5">
            <div ref={el => { connectionPoints.current['automations'] = el; }} className={blockClasses}>
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><path d="M12 22a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4 4 4 0 0 0-4 4v12a4 4 0 0 0 4 4Z"/><path d="M12 6h.01"/></svg>
              <span className={textResponsive}>Automations</span>
            </div>
            <div ref={el => { connectionPoints.current['api-resp'] = el; }} className={blockClasses}>
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M10 9h5"/><path d="M10 13h5"/><path d="M10 17h5"/></svg>
              <span className={textResponsive}>API Resp.</span>
            </div>
            <div ref={el => { connectionPoints.current['deployment'] = el; }} className={blockClasses}>
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><path d="M12 22v-4"/><path d="M12 14v-4"/><path d="M12 6V2"/><path d="M4 12H2"/><path d="M22 12h-2"/><path d="M19 5l-1.5 1.5"/><path d="M5 19l1.5-1.5"/><path d="M19 19l-1.5-1.5"/><path d="M5 5l1.5 1.5"/></svg>
              <span className={textResponsive}>Deployment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
