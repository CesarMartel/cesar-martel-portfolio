"use client";

import { useEffect, useState } from "react";
import SplitText from "../SplitText/SplitText";
import LogoLoop from "../LogoLoop/LogoLoop";
import { dictionary } from "../../lib/i18n";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiPython,
  SiDjango,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostman,
  SiMysql,
  SiMongodb,
} from "react-icons/si";

export default function Tech() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const interval = setInterval(() => {
        const saved = localStorage.getItem("lang");
        if (saved && saved !== lang) setLang(saved);
    }, 500);
    return () => clearInterval(interval);
  }, [lang]);

  const t = dictionary[lang]?.sections.tech || dictionary.es.sections.tech;

  const techLogos = [
    { node: <SiReact size={32} color="#61DAFB" />, title: t.tools?.react || "React" },
    { node: <SiNextdotjs size={32} color="#ffffff" />, title: t.tools?.nextjs || "Next.js" },
    { node: <SiJavascript size={32} color="#F7DF1E" />, title: t.tools?.javascript || "JavaScript" },
    { node: <SiPython size={32} color="#3776AB" />, title: t.tools?.python || "Python" },
    { node: <SiDjango size={32} color="#092E20" />, title: t.tools?.django || "Django" },
    { node: <SiTailwindcss size={32} color="#06B6D4" />, title: t.tools?.tailwind || "Tailwind" },
    { node: <SiGit size={32} color="#F05032" />, title: t.tools?.git || "Git" },
    { node: <SiGithub size={32} color="#ffffff" />, title: t.tools?.github || "GitHub" },
    { node: <SiPostman size={32} color="#FF6C37" />, title: t.tools?.postman || "Postman" },
    { node: <SiMysql size={32} color="#4479A1" />, title: t.tools?.mysql || "MySQL" },
    { node: <SiMongodb size={32} color="#47A248" />, title: t.tools?.mongodb || "MongoDB" },
  ];

  return (
    <section id="tech" className="relative w-full max-w-6xl mx-auto px-6 py-24 scroll-mt-24">
      <div className="mb-12 bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-lg inline-block">
        <SplitText
          text={t.title}
          tag="h2"
          className="section-title text-4xl md:text-5xl font-bold mb-4"
          animationFrom={{ opacity: 0, y: 30 }}
          animationTo={{ opacity: 1, y: 0 }}
          threshold={0.3}
        />
        <p className="text-gray-400 text-lg">{t.subtitle}</p>
      </div>

      <div className="w-full bg-black/30 border border-white/10 rounded-3xl py-12 backdrop-blur-md shadow-lg overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={42}
          gap={48}
          scaleOnHover
          fadeOut
          fadeOutColor="rgba(0,0,0,0)" // Transparent because we are on a glass card or dark bg
          ariaLabel={t.title}
        />
      </div>
    </section>
  );
}
