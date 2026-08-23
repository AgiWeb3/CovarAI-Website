import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import {
  ArrowRight,
  Sparkles,
  Clock,
  BookOpen,
} from 'lucide-react';
import { PromptSandboxMatrix } from './PromptSandboxMatrix';

interface HeroSectionProps {
  lang: Language;
  onGetStarted: () => void;
  onReadWhitepaper?: () => void;
  onRequestDemo?: () => void;
  onOpenWhitepaper?: () => void;
  isSubPage?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onGetStarted,
  onRequestDemo,
  onOpenWhitepaper,
  isSubPage = false,
}) => {
  const currentTrans = translations[lang] || translations['zh-CN'];
  const t = currentTrans.hero || translations['zh-CN'].hero;

  return (
    <section className={`relative pb-20 overflow-hidden bg-black ${isSubPage ? 'pt-8 sm:pt-12' : 'pt-28'}`}>
      {/* Background Lighting Meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial-gradient blur-3xl pointer-events-none opacity-50" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Futuristic Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs sm:text-sm font-mono mb-8 glow-cyan"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t.badge}</span>
          </div>

          {/* Slogan */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="mb-3 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 font-semibold"
          >
            {t.sloganPrimary} · {t.sloganSub}
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="150"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.15] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40"
          >
            {t.title}
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-base sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl mx-auto mb-4"
          >
            {t.subtitle}
          </p>

          <p
            data-aos="fade-up"
            data-aos-delay="250"
            className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto mb-9 font-light"
          >
            {t.desc}
          </p>

          {/* Action Buttons: Get Started & Whitepaper Modal Trigger */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              id="hero-get-started-btn"
              onClick={onRequestDemo || onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg glow-purple transition-all duration-300 active:scale-95 group cursor-pointer"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Whitepaper Button - Interactive Modal */}
            <button
              onClick={onOpenWhitepaper}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer glow-cyan"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>{t.readWhitepaper}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                v3.2 Spec
              </span>
            </button>
          </div>
        </div>

        {/* Visual Showcase: Interactive Multi-Scenario Prompt Obfuscation Matrix Visualizer */}
        <div
          data-aos="fade-up"
          data-aos-delay="350"
          className="max-w-5xl mx-auto"
        >
          <PromptSandboxMatrix lang={lang} />
        </div>
      </div>
    </section>
  );
};
