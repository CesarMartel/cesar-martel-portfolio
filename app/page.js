"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Lanyard from "../components/lanyard/Lanyard";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Tech from "../components/sections/Tech";
import Contact from "../components/sections/Contact";
import SplitText from "../components/SplitText/SplitText";
import { dictionary } from "../lib/i18n";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FiFileText } from "react-icons/fi";

export default function Home() {
  const [lang, setLang] = useState("es");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateLang = () => {
      const saved = localStorage.getItem("lang");
      if (saved) setLang(saved);
    };
    updateLang();
    // Poll for language changes since we aren't using a Context
    const interval = setInterval(() => {
        const saved = localStorage.getItem("lang");
        if (saved && saved !== lang) setLang(saved);
    }, 500);
    return () => clearInterval(interval);
  }, [lang]);

  const t = dictionary[lang]?.hero || dictionary.es.hero;

  if (!isMounted) return null; // Prevent hydration mismatch on first render

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          
          {/* Left Column: Text */}
          <div className="flex flex-col justify-center lg:pl-12 order-2 lg:order-1 z-20">
            <div className="mb-4">
              <SplitText
                text={t.name}
                tag="h1"
                className="hero-title text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 text-white"
                animationFrom={{ opacity: 0, y: 50 }}
                animationTo={{ opacity: 1, y: 0 }}
                delay={0.1}
                duration={0.8}
                ease="power3.out"
              />
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
              <h2 className="text-xl md:text-2xl text-gray-300 font-light mb-6">
                {t.role}
              </h2>
              
              <p className="text-gray-100 max-w-lg text-lg leading-relaxed mb-8">
                {t.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                  {t.buttons.contact}
                </a>
                <a href="https://github.com/cesarmartel" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 text-white font-medium rounded-full border border-white/10 hover:bg-white/20 transition-colors flex items-center gap-2">
                  <SiGithub /> {t.buttons.github}
                </a>
                <a href="/cv/cv.pdf" download="Cesar_Martel_CV.pdf" className="px-6 py-3 bg-white/10 text-white font-medium rounded-full border border-white/10 hover:bg-white/20 transition-colors flex items-center gap-2">
                  <FiFileText /> {t.buttons.cv}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lanyard */}
          <div className="relative h-[50vh] lg:h-[80vh] w-full flex items-center justify-center order-1 lg:order-2">
            <Lanyard position={[0, 0, 0]} gravity={[0, -40, 0]} />
          </div>

        </div>
      </section>

      {/* SECTIONS */}
      <About />
      <Projects />
      <Tech />
      <Contact />
      
      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-500 text-sm bg-black/40 border-t border-white/5">
        <p>© {new Date().getFullYear()} César Martel. All rights reserved.</p>
      </footer>
    </main>
  );
}
