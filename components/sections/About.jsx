"use client";

import { useEffect, useState } from "react";
import SplitText from "../SplitText/SplitText";
import { dictionary } from "../../lib/i18n";

export default function About() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const updateLang = () => {
      const saved = localStorage.getItem("lang");
      if (saved) setLang(saved);
    };
    updateLang();
    window.addEventListener("storage", updateLang);
    // Also listen to custom event if we used one, but storage event works across tabs
    // For same tab updates, we can use a custom interval or context. 
    // Since we want simple, let's just check interval or rely on parent passing props.
    // For now, let's use a quick interval to check localStorage change for this 'simple' approach without context.
    const interval = setInterval(() => {
        const saved = localStorage.getItem("lang");
        if (saved && saved !== lang) setLang(saved);
    }, 500);

    return () => clearInterval(interval);
  }, [lang]);

  const t = dictionary[lang]?.sections.about || dictionary.es.sections.about;

  return (
    <section id="about" className="relative w-full max-w-6xl mx-auto px-6 py-24 scroll-mt-24">
      <SplitText
        text={t.title}
        tag="h2"
        className="section-title text-4xl md:text-5xl font-bold mb-12"
        animationFrom={{ opacity: 0, y: 30 }}
        animationTo={{ opacity: 1, y: 0 }}
        threshold={0.3}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-lg space-y-6 text-lg text-gray-300 leading-relaxed">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md shadow-lg hover:bg-black/40 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">{t.highlights.exp}</h3>
            <p className="text-sm text-gray-400">{t.highlights.exp_desc}</p>
          </div>
          <div className="p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md shadow-lg hover:bg-black/40 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">{t.highlights.stack}</h3>
            <p className="text-sm text-gray-400">{t.highlights.stack_desc}</p>
          </div>
          <div className="col-span-1 sm:col-span-2 p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md shadow-lg hover:bg-black/40 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">{t.highlights.focus}</h3>
            <p className="text-sm text-gray-400">{t.highlights.focus_desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
