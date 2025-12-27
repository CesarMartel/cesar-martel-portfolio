"use client";

import React, { useEffect, useRef, useState } from "react";
import "./LogoLoop.css";

export default function LogoLoop({
  logos = [],
  speed = 100, // slower is higher number? No, typically speed in seconds or simple 'fast'/'slow'. Let's map number to duration.
  direction = "left",
  logoHeight = 40,
  gap = 40,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "#000",
  ariaLabel = "Logo Loop",
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicamos el contenido para asegurar el loop infinito
      // Lo hacemos suficientes veces para llenar pantallas anchas si es necesario
      // Para seguridad, duplicamos 2 veces el set original
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      // Convert numeric speed to CSS duration. 
      // Higher speed prop should mean faster movement? Or duration? 
      // Usually "speed" in these components implies duration string or number.
      // Let's assume input is "seconds" or relative factor.
      // If user passed "120" in prompt, it might be seconds for a full loop.
      containerRef.current.style.setProperty("--duration", `${speed}s`);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`logo-loop-container ${fadeOut ? "fade-out" : ""}`}
      aria-label={ariaLabel}
      style={{
        "--gap": `${gap}px`,
        "--logo-height": `${logoHeight}px`,
      }}
    >
      <div
        ref={scrollerRef}
        className={`logo-loop-scroller ${start ? "animate-scroll" : ""}`}
      >
        {logos.map((item, idx) => (
          <a
            href={item.href || "#"}
            key={idx}
            className={`logo-item ${scaleOnHover ? "scale-on-hover" : ""}`}
            title={item.title}
            aria-label={item.title}
            onClick={(e) => !item.href && e.preventDefault()}
            style={{
                textDecoration: 'none'
            }}
          >
            <div className="logo-content">
              {item.node}
              {item.title && <span className="logo-title">{item.title}</span>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
