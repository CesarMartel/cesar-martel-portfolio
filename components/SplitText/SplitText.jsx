"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text = "",
  className = "",
  tag = "div", // h1, h2, p, etc.
  delay = 0,
  animationFrom = { opacity: 0, y: 30 },
  animationTo = { opacity: 1, y: 0 },
  ease = "power4.out",
  duration = 0.4, // Duration per character
  stagger = 0.1, // Stagger between characters
  threshold = 0.1,
  rootMargin = "-50px",
  textAlign = "left",
  onLetterAnimationComplete,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  
  // Flatten text if it's not a string (basic handling)
  const safeText = typeof text === 'string' ? text : String(text);
  const words = safeText.split(" ").map(word => word.split(""));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!isMounted) return;

      const elements = gsap.utils.toArray(".split-char");
      
      gsap.fromTo(
        elements,
        animationFrom,
        {
          ...animationTo,
          duration,
          ease,
          stagger,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none none",
            // markers: true, // Uncomment for debugging
          },
        }
      );
    },
    { scope: ref, dependencies: [isMounted, delay, duration, ease, stagger] }
  );

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ 
        textAlign, 
        display: "inline-block",
        willChange: "transform, opacity" 
      }}
    >
      <span className="split-word" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        {words.map((word, i) => (
          <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.map((char, j) => (
              <span
                key={j}
                className="split-char"
                style={{ display: "inline-block", willChange: "transform, opacity" }}
              >
                {char}
              </span>
            ))}
            {i < words.length - 1 ? (
              <span className="split-char" style={{ display: "inline-block" }}>
                &nbsp;
              </span>
            ) : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
