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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#4ee48b]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-[#0099ff]/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full text-center relative z-10">
        {/* Compliance / Category Pill */}
        <div
          data-aos="fade-down"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#092915]/90 via-[#061c0e]/95 to-[#092915]/90 border border-[#1f794d]/60 text-[#80f2b0] text-xs sm:text-sm font-medium mb-8 shadow-lg shadow-[#4ee48b]/5 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-[#4ee48b] animate-pulse" />
          <ShieldCheck className="w-4 h-4 text-[#4ee48b]" />
          <span>{t.badge}</span>
        </div>

        {/* Main Business Headline */}
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto"
        >
          {lang === 'en' ? (
            <>
              <span>Deploy Frontier AI. </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#80f2b0] via-[#4ee48b] to-[#00d2ff]">
                Zero Cloud Leaks. 100% Compliant.
              </span>
            </>
          ) : (
            <>
              <span className="block">{translations[lang].businessHero.title.split('，')[0] || translations[lang].businessHero.title}</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-[#80f2b0] via-[#4ee48b] to-[#00d2ff] mt-2">
                {translations[lang].businessHero.title.split('，')[1] || ''}
              </span>
            </>
          )}
        </h1>

        {/* Subtitle / Value Proposition */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-sm sm:text-base lg:text-lg text-[#e2e8f0]/85 max-w-3xl mx-auto leading-relaxed mb-8 font-normal"
        >
          {t.subtitle}
        </p>

        {/* Industry Quick Selector Pills with rich thematic color-coding */}
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <span className="text-xs font-mono text-[#80f2b0]/70 uppercase tracking-wider mr-1">
            {lang === 'en' ? 'Target Verticals:' : '核心垂直行业:'}
          </span>
          <button
            onClick={() => onSelectIndustry('legal')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1c1606]/80 to-[#271d07]/80 hover:from-[#2e2208] hover:to-[#382a09] border border-[#f59e0b]/40 hover:border-[#fbbf24] text-[#fde68a] text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <Scale className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>{translations[lang].industrySection.tabs.legal}</span>
          </button>
          <button
            onClick={() => onSelectIndustry('healthcare')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#031926]/80 to-[#042436]/80 hover:from-[#052e47] hover:to-[#073c5c] border border-[#0099ff]/40 hover:border-[#38bdf8] text-[#38bdf8] text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <HeartPulse className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>{translations[lang].industrySection.tabs.healthcare}</span>
          </button>
          <button
            onClick={() => onSelectIndustry('finance')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#061c0e]/80 to-[#092915]/80 hover:from-[#092915] hover:to-[#0e3b20] border border-[#1f794d]/50 hover:border-[#4ee48b] text-[#80f2b0] text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <Landmark className="w-3.5 h-3.5 text-[#4ee48b]" />
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4ee48b] to-[#38d677] hover:from-[#38d677] hover:to-[#22c55e] text-[#05160b] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#4ee48b]/25 hover:shadow-[#4ee48b]/40 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#05160b]" />
            <span>{t.ctaDemo}</span>
            <ArrowRight className="w-4 h-4 ml-1 text-[#05160b]" />
          </button>

          <button
            onClick={onSwitchToProducts}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#061c0e]/90 to-[#0a2615]/90 hover:from-[#092915] hover:to-[#0f381f] text-[#f2f5f3] hover:text-[#4ee48b] font-semibold text-sm sm:text-base border border-[#1f794d]/50 hover:border-[#4ee48b]/60 flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-sm shadow-md"
          >
            <Cpu className="w-4 h-4 text-[#4ee48b]" />
            <span>{t.ctaTech}</span>
          </button>

          <div
            className="w-full sm:w-auto text-xs text-zinc-400 flex items-center justify-center gap-1.5 font-mono py-2 cursor-not-allowed select-none"
            title={lang === 'en' ? 'Whitepaper is currently being updated for official release' : '技术白皮书正在完善中，后续正式放出'}
          >
            <span>{translations[lang].nav.whitepaper}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/80 font-mono">
              {lang === 'en' ? 'Updating' : '完善中'}
            </span>
          </div>
        </div>

        {/* Key Commercial Metrics Strip with diversified multi-spectrum color accents */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-6 border-t border-[#1f794d]/30 text-left"
        >
          {t.stats.map((stat, idx) => {
            // Give each metric a distinctive chromatic identity to prevent green fatigue
            const colorScheme = [
              { valColor: 'text-[#fbbf24]', borderGlow: 'hover:border-[#f59e0b]/50', topAccent: 'from-[#f59e0b]/10' }, // TCO Savings - Gold
              { valColor: 'text-[#4ee48b]', borderGlow: 'hover:border-[#4ee48b]/50', topAccent: 'from-[#4ee48b]/10' }, // Zero Plaintext - Mint
              { valColor: 'text-[#00d2ff]', borderGlow: 'hover:border-[#0099ff]/50', topAccent: 'from-[#0099ff]/10' }, // Latency Delta - Azure Cyan
              { valColor: 'text-[#80f2b0]', borderGlow: 'hover:border-[#80f2b0]/50', topAccent: 'from-[#80f2b0]/10' }, // Deployment Speed - Emerald White
            ][idx % 4];

            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-b ${colorScheme.topAccent} via-[#061c0e]/90 to-[#041209]/95 border border-[#1f794d]/40 ${colorScheme.borderGlow} backdrop-blur-md flex flex-col justify-between transition-all duration-300 shadow-lg hover:-translate-y-0.5`}
              >
                <div className={`text-2xl sm:text-3xl font-black font-mono ${colorScheme.valColor} mb-1 tracking-tight`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-300/80 leading-tight font-normal">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Trust Regulatory Badges */}
        <div
          data-aos="fade-up"
          data-aos-delay="450"
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-400 font-mono"
        >
          {t.trustBadges.map((badge, bIdx) => (
            <div key={bIdx} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4ee48b]" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
