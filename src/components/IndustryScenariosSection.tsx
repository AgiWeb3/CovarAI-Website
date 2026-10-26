import React from 'react';
import {
  Scale,
  HeartPulse,
  Landmark,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Fingerprint,
} from 'lucide-react';
import { Language, IndustryScenarioId } from '../types';
import { translations } from '../translations';

interface IndustryScenariosSectionProps {
  lang: Language;
  selectedIndustry: IndustryScenarioId;
  onSelectIndustry: (id: IndustryScenarioId) => void;
  onRequestDemo: (scenarioName?: string) => void;
}

export const IndustryScenariosSection: React.FC<IndustryScenariosSectionProps> = ({
  lang,
  selectedIndustry,
  onSelectIndustry,
  onRequestDemo,
}) => {
  const t = translations[lang].industrySection;
  const scenarios = t.scenarios;
  const currentScenario = scenarios.find((s) => s.id === selectedIndustry) || scenarios[0];

  const getIndustryIcon = (id: IndustryScenarioId) => {
    switch (id) {
      case 'legal':
        return <Scale className="w-5 h-5" />;
      case 'healthcare':
        return <HeartPulse className="w-5 h-5" />;
      case 'finance':
        return <Landmark className="w-5 h-5" />;
    }
  };

  const getThemeColor = (id: IndustryScenarioId) => {
    switch (id) {
      case 'legal':
        return {
          border: 'border-[#1f794d]/50',
          glow: 'glow-mint',
          accent: 'text-[#4ee48b]',
          bgBadge: 'bg-[#092915] text-[#4ee48b] border-[#1f794d]/80',
          tabActive: 'bg-[#4ee48b] text-[#05160b] font-bold shadow-lg shadow-[#4ee48b]/20',
        };
      case 'healthcare':
        return {
          border: 'border-[#0099ff]/50',
          glow: 'glow-mint',
          accent: 'text-[#0099ff]',
          bgBadge: 'bg-[#001f3f] text-[#0099ff] border-[#0099ff]/40',
          tabActive: 'bg-[#0099ff] text-white font-bold shadow-lg shadow-[#0099ff]/20',
        };
      case 'finance':
        return {
          border: 'border-[#1f794d]/50',
          glow: 'glow-mint',
          accent: 'text-[#80f2b0]',
          bgBadge: 'bg-[#092915] text-[#80f2b0] border-[#1f794d]/80',
          tabActive: 'bg-[#80f2b0] text-[#05160b] font-bold shadow-lg shadow-[#80f2b0]/20',
        };
    }
  };

  const theme = getThemeColor(currentScenario.id);

  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061c0e] border border-[#1f794d]/40 text-[#4ee48b] text-xs font-mono mb-4">
          <Fingerprint className="w-3.5 h-3.5 text-[#4ee48b]" />
          <span>{t.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
            {t.title}
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 3 Industry Tabs Switcher */}
      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 max-w-3xl mx-auto p-1.5 rounded-2xl bg-[#061c0e]/80 border border-[#1f794d]/30 backdrop-blur-md"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {(['legal', 'healthcare', 'finance'] as IndustryScenarioId[]).map((id) => {
          const isActive = selectedIndustry === id;
          const tabTheme = getThemeColor(id);
          return (
            <button
              key={id}
              onClick={() => {
                onSelectIndustry(id);
              }}
              className={`flex-1 min-w-[140px] sm:min-w-[180px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                isActive
                  ? tabTheme.tabActive
                  : 'text-gray-400 hover:text-white hover:bg-[#092915]'
              }`}
            >
              {getIndustryIcon(id)}
              <span>{t.tabs[id]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Scenario Container */}
      <div
        key={currentScenario.id}
        className={`rounded-3xl bg-[#061c0e]/80 border ${theme.border} p-6 sm:p-10 transition-all duration-500 mb-14 relative overflow-hidden backdrop-blur-xl shadow-xl`}
        data-aos="fade-up"
      >
        {/* Scenario Header Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#1f794d]/20">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl bg-[#092915] border ${theme.border} ${theme.accent}`}>
              {getIndustryIcon(currentScenario.id)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${theme.bgBadge}`}>
                  {currentScenario.badge}
                </span>
                <span className="text-xs font-mono text-gray-400">Vertical 0{selectedIndustry === 'legal' ? '1' : selectedIndustry === 'healthcare' ? '2' : '3'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentScenario.headline}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                {currentScenario.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => onRequestDemo(currentScenario.name)}
            className="px-6 py-2.5 rounded-full bg-[#4ee48b] hover:bg-[#38d677] text-[#05160b] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#4ee48b]/20 transition-all whitespace-nowrap self-start lg:self-center cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#05160b]" />
            <span>{translations[lang].nav.requestDemo}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#05160b]" />
          </button>
        </div>

        {/* Streamlined 2-Column Executive View: Redlines vs CovarAI Confidential Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Column A: Industry Compliance Redlines */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>{lang === 'en' ? 'Industry Compliance Redlines (Why Public AI Is Blocked)' : '行业合规红线（为什么不敢直接用公有云 AI？）'}</span>
            </div>

            {currentScenario.painPoints.map((pain, pIdx) => (
              <div
                key={pIdx}
                className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 hover:border-rose-500/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-bold text-white">
                    {pain.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/80 flex-shrink-0">
                    {pain.risk}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {pain.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Column B: CovarAI Plain-Language Solution */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-[#4ee48b] font-bold text-sm sm:text-base mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'en' ? 'CovarAI Zero-Knowledge Solution (100% Compliant)' : 'CovarAI 零知识密态解法（合规官直接签批）'}</span>
            </div>

            {currentScenario.solutionHighlights.map((sol, sIdx) => (
              <div
                key={sIdx}
                className="p-4 sm:p-5 rounded-2xl bg-[#092915]/50 border border-[#1f794d]/50 hover:border-[#4ee48b]/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-bold text-white">
                    {sol.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#061c0e] text-[#4ee48b] border border-[#1f794d] flex-shrink-0">
                    {sol.tag}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {sol.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Scannable Production Use Cases & ROI */}
        <div className="pt-6 border-t border-white/10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentScenario.useCases.map((useCase, uIdx) => (
              <div
                key={uIdx}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4ee48b]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h5 className="text-sm font-bold text-white">
                      {useCase.title}
                    </h5>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    {useCase.desc}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-white/10">
                  <span className="text-[11px] font-mono font-bold text-[#4ee48b] bg-[#092915] px-2.5 py-0.5 rounded border border-[#1f794d] inline-block">
                    ✓ {useCase.metrics}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Outcome & Regulatory Badges Bar */}
        <div className="p-4 rounded-2xl bg-[#092915]/60 border border-[#4ee48b]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#4ee48b] flex-shrink-0" />
            <div>
              <div className="text-xs font-mono font-bold text-[#80f2b0]">
                {lang === 'en' ? 'Verified Production Outcome & Audit Guarantee' : '标杆客户实测成效与合规审计背书'}
              </div>
              <div className="text-xs text-gray-200 mt-0.5">
                {currentScenario.businessOutcome}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {currentScenario.complianceBadges.map((badge, bIdx) => (
              <span
                key={bIdx}
                className="px-2.5 py-1 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-gray-300"
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
