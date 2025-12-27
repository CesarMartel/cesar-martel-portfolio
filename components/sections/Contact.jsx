"use client";

import { useEffect, useState } from "react";
import SplitText from "../SplitText/SplitText";
import { dictionary } from "../../lib/i18n";
import { SiMinutemailer, SiGithub } from "react-icons/si";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function Contact() {
  const [lang, setLang] = useState("es");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        const saved = localStorage.getItem("lang");
        if (saved && saved !== lang) setLang(saved);
    }, 500);
    return () => clearInterval(interval);
  }, [lang]);

  const t = dictionary[lang]?.sections.contact || dictionary.es.sections.contact;

  const handleCopy = () => {
    navigator.clipboard.writeText(t.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full max-w-4xl mx-auto px-6 py-24 mb-24 scroll-mt-24 text-center">
      <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-lg inline-block w-full">
        <SplitText
          text={t.title}
          tag="h2"
          className="section-title text-4xl md:text-5xl font-bold mb-8"
          animationFrom={{ opacity: 0, y: 30 }}
          animationTo={{ opacity: 1, y: 0 }}
          threshold={0.3}
        />
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          {t.content}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={handleCopy}
            className="group relative flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all active:scale-95"
          >
            <SiMinutemailer className="text-xl" />
            <span className="text-lg font-medium">{t.email}</span>
            <div className="ml-2 p-1 rounded-md bg-white/10 text-gray-300">
              {copied ? <FiCheck /> : <FiCopy />}
            </div>
            {copied && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-black text-xs font-bold rounded">
                {t.copied}
              </span>
            )}
          </button>

          <a
            href={`https://${t.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-[#24292e]/80 hover:bg-[#24292e] text-white rounded-full transition-all hover:shadow-[0_0_20px_rgba(36,41,46,0.5)] active:scale-95"
          >
            <SiGithub className="text-xl" />
            <span className="text-lg font-medium">GitHub</span>
          </a>
        </div>

        <div className="mt-16">
          <a 
            href={`mailto:${t.email}`}
            className="inline-block px-12 py-5 text-xl font-bold text-black bg-white rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
