"use client";

import { useEffect, useState } from "react";
import SplitText from "../SplitText/SplitText";
import { dictionary } from "../../lib/i18n";
import { SiGithub } from "react-icons/si";

export default function Projects() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const interval = setInterval(() => {
        const saved = localStorage.getItem("lang");
        if (saved && saved !== lang) setLang(saved);
    }, 500);
    return () => clearInterval(interval);
  }, [lang]);

  const t = dictionary[lang]?.sections.projects || dictionary.es.sections.projects;

  return (
    <section id="projects" className="relative w-full max-w-6xl mx-auto px-6 py-24 scroll-mt-24">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.cards.map((project, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col justify-between p-6 rounded-3xl bg-black/30 border border-white/10 backdrop-blur-md shadow-lg hover:bg-black/40 transition-all duration-300 hover:-translate-y-2"
          >
            <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {project.title}
                </h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                    <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium text-white bg-white/10 rounded-full border border-white/5"
                    >
                    {tech}
                    </span>
                ))}
                </div>
            </div>
            
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline decoration-purple-500 underline-offset-4"
            >
              <SiGithub /> GitHub Repo
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
