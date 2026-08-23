import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Scale, HeartPulse, Landmark, CheckCircle2, Cpu } from 'lucide-react';
import { Language, IndustryScenarioId } from '../types';
import { translations } from '../translations';

interface BusinessHeroProps {
  lang: Language;
  onRequestDemo: () => void;
  onSelectIndustry: (id: IndustryScenarioId) => void;
  onSwitchToProducts: () => void;
  onOpenWhitepaper: () => void;
}

export const BusinessHero: React.FC<BusinessHeroProps> = ({
  lang,
  onRequestDemo,
  onSelectIndustry,
  onSwitchToProducts,
  onOpenWhitepaper,
}) => {
  const t = translations[lang].businessHero;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full text-center relative z-10">
        {/* Compliance / Category Pill */}
        <div
          data-aos="fade-down"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs sm:text-sm font-medium mb-8 glow-cyan"
        >
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>{t.badge}</span>
        </div>

        {/* Main Business Headline */}
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.15]"
        >
          <span className="block">{translations[lang].businessHero.title.split('，')[0] || translations[lang].businessHero.title}</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-white mt-2">
            {translations[lang].businessHero.title.includes('，') 
              ? translations[lang].businessHero.title.split('，')[1] 
              : lang === 'en' ? 'Absolute Sovereignty for Regulated Enterprises' : ''}
          </span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal"
        >
          {t.subtitle}
        </p>

        {/* Industry Quick Selector Pills */}
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider mr-1">
            {lang === 'en' ? 'Target Verticals:' : '核心垂直行业:'}
          </span>
          <button
            onClick={() => onSelectIndustry('legal')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
          >
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>{translations[lang].industrySection.tabs.legal}</span>
          </button>
          <button
            onClick={() => onSelectIndustry('healthcare')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
          >
            <HeartPulse className="w-3.5 h-3.5 text-purple-400" />
            <span>{translations[lang].industrySection.tabs.healthcare}</span>
          </button>
          <button
            onClick={() => onSelectIndustry('finance')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
          >
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>{translations[lang].industrySection.tabs.finance}</span>
          </button>
        </div>

        {/* CTA Buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={onRequestDemo}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl glow-purple transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.ctaDemo}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onSwitchToProducts}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-semibold text-sm sm:text-base border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-sm"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{t.ctaTech}</span>
          </button>

          <button
            onClick={onOpenWhitepaper}
            className="w-full sm:w-auto text-xs text-gray-400 hover:text-cyan-300 font-mono underline underline-offset-4 transition-colors py-2"
          >
            {translations[lang].nav.whitepaper} (PDF)
          </button>
        </div>

        {/* Key Commercial Metrics Strip */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-6 border-t border-white/10 text-left"
        >
          {t.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-gray-400 leading-tight">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Trust Regulatory Badges */}
        <div
          data-aos="fade-up"
          data-aos-delay="450"
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-400 font-mono"
        >
          {t.trustBadges.map((badge, bIdx) => (
            <div key={bIdx} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
