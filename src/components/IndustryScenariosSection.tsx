import React, { useState } from 'react';
import {
  Scale,
  HeartPulse,
  Landmark,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  FileText,
  Play,
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

  // Interactive live simulator state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedComplete, setSimulatedComplete] = useState(false);

  // Mobile segmented sub-tab state ('solution' | 'cases' | 'simulator' | 'all')
  const [mobileSubTab, setMobileSubTab] = useState<'solution' | 'cases' | 'simulator' | 'all'>('solution');

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedComplete(true);
    }, 900);
  };

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
          border: 'border-cyan-500/40',
          glow: 'glow-cyan',
          accent: 'text-cyan-400',
          bgBadge: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80',
          tabActive: 'bg-cyan-500 text-black font-bold shadow-lg glow-cyan',
        };
      case 'healthcare':
        return {
          border: 'border-purple-500/40',
          glow: 'glow-purple',
          accent: 'text-purple-400',
          bgBadge: 'bg-purple-950/80 text-purple-300 border-purple-800/80',
          tabActive: 'bg-purple-500 text-white font-bold shadow-lg glow-purple',
        };
      case 'finance':
        return {
          border: 'border-emerald-500/40',
          glow: 'glow-cyan',
          accent: 'text-emerald-400',
          bgBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80',
          tabActive: 'bg-emerald-500 text-black font-bold shadow-lg',
        };
    }
  };

  const theme = getThemeColor(currentScenario.id);

  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono mb-4 glow-cyan">
          <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
            {t.title}
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 3 Industry Tabs Switcher */}
      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 max-w-3xl mx-auto p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
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
                setSimulatedComplete(false);
              }}
              className={`flex-1 min-w-[140px] sm:min-w-[180px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                isActive
                  ? tabTheme.tabActive
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
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
        className={`rounded-3xl bg-white/5 border ${theme.border} p-6 sm:p-10 ${theme.glow} transition-all duration-500 mb-14 relative overflow-hidden backdrop-blur-xl`}
        data-aos="fade-up"
      >
        {/* Scenario Header Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl bg-white/5 border ${theme.border} ${theme.accent}`}>
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
            className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-cyan-400 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all whitespace-nowrap self-start lg:self-center"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{translations[lang].nav.requestDemo}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Progressive Disclosure Segmented Switcher (Visible on < lg screens) */}
        <div className="lg:hidden mb-8 p-1 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-1 overflow-x-auto">
          <button
            onClick={() => setMobileSubTab('solution')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mobileSubTab === 'solution'
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Pain & Solution' : '痛点与解法'}
          </button>
          <button
            onClick={() => setMobileSubTab('cases')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mobileSubTab === 'cases'
                ? 'bg-purple-600 text-white font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Use Cases' : '落地案例'}
          </button>
          <button
            onClick={() => setMobileSubTab('simulator')}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              mobileSubTab === 'simulator'
                ? 'bg-emerald-500 text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Live Simulator' : '密态仿真'}
          </button>
          <button
            onClick={() => setMobileSubTab('all')}
            className={`py-2 px-2.5 rounded-xl text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
              mobileSubTab === 'all'
                ? 'bg-white/20 text-white font-bold'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            title={lang === 'en' ? 'Show all sections at once' : '展开全部内容'}
          >
            {lang === 'en' ? 'All' : '全部'}
          </button>
        </div>

        {/* 2-Column: Pain Points vs CovarAI Solutions (Shown on desktop OR when mobileSubTab is 'solution' / 'all') */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 ${mobileSubTab !== 'solution' && mobileSubTab !== 'all' ? 'hidden lg:grid' : ''}`}>
          {/* Column A: Pain Points & Risks */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{lang === 'en' ? 'Existential Industry Pain Points' : '核心业务痛点与合规红线'}</span>
            </div>

            {currentScenario.painPoints.map((pain, pIdx) => (
              <div
                key={pIdx}
                className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 hover:border-rose-500/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {pain.title}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/80 flex-shrink-0">
                    {pain.risk}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {pain.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Column B: CovarAI Business Solutions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm sm:text-base mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'en' ? 'CovarAI Confidential Solutions' : 'CovarAI 专属密态商业解法'}</span>
            </div>

            {currentScenario.solutionHighlights.map((sol, sIdx) => (
              <div
                key={sIdx}
                className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {sol.title}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 flex-shrink-0">
                    {sol.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {sol.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section C: Real-World Use Cases & Enterprise ROI (Shown on desktop OR when mobileSubTab is 'cases' / 'all') */}
        <div className={`pt-8 border-t border-white/10 mb-10 ${mobileSubTab !== 'cases' && mobileSubTab !== 'all' ? 'hidden lg:block' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'en' ? 'Validated Production Use Cases' : '生产级落地场景与实测成效'}</span>
            </div>
            <span className="text-xs font-mono text-gray-400">
              {lang === 'en' ? 'Zero Compromise on Capability' : '全功能大模型 · 零能力妥协'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentScenario.useCases.map((useCase, uIdx) => (
              <div
                key={uIdx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-gray-400 mb-1">
                    Scenario 0{uIdx + 1}
                  </div>
                  <h5 className="text-sm sm:text-base font-bold text-white mb-2">
                    {useCase.title}
                  </h5>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {useCase.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/50 inline-block">
                    ✓ {useCase.metrics}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section D: Interactive Live Pipeline Simulator (Shown on desktop OR when mobileSubTab is 'simulator' / 'all') */}
        <div className={`p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/10 ${mobileSubTab !== 'simulator' && mobileSubTab !== 'all' ? 'hidden lg:block' : ''}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Play className="w-3 h-3 fill-cyan-400" />
                <span>{t.interactiveDemoTitle}</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {currentScenario.name} · {lang === 'en' ? 'Confidential Execution Flow' : '密态推理全生命周期体验'}
              </h4>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isSimulating ? (lang === 'en' ? 'Obfuscating Tensors...' : '正在执行代数协变加密...') : (lang === 'en' ? 'Run Live Simulation' : '运行密态推理仿真')}</span>
            </button>
          </div>

          {/* Before vs After Pipeline Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Raw Input vs Cloud Execution */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span className="flex items-center gap-1.5 text-rose-300">
                  <FileText className="w-3.5 h-3.5" />
                  {t.statusLabels.rawInput}
                </span>
                <span className="text-[10px] text-gray-500">Client Side</span>
              </div>
              <div className="text-xs text-gray-200 font-mono bg-black/60 p-3 rounded-lg border border-white/5 leading-relaxed">
                {currentScenario.samplePrompt}
              </div>
            </div>

            {/* Cloud Execution State */}
            <div className="p-4 rounded-xl bg-white/5 border border-cyan-500/20">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Lock className="w-3.5 h-3.5" />
                  {t.statusLabels.cloudState}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">0% Plaintext Exposed</span>
              </div>
              <div className="text-xs text-cyan-300 font-mono bg-black/60 p-3 rounded-lg border border-cyan-900/50 leading-relaxed overflow-x-auto">
                {isSimulating ? (
                  <span className="animate-pulse text-purple-400">
                    [Computing CovarPri Permutation Tensor: P·(A⊗B)·P⁻¹ ... 7.2ms]
                  </span>
                ) : (
                  currentScenario.obfuscatedResultPreview
                )}
              </div>
            </div>
          </div>

          {/* Outcome & Proof */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-xs font-mono font-bold text-emerald-300">
                  {lang === 'en' ? 'Verified Business Outcome & Audit Proof' : '实测业务成效与合规证明'}
                </div>
                <div className="text-xs text-gray-300 mt-0.5">
                  {currentScenario.businessOutcome}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentScenario.complianceBadges.map((badge, bIdx) => (
                <span
                  key={bIdx}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
