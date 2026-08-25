import React from 'react';
import {
  Compass,
  Scale,
  HeartPulse,
  Landmark,
  ShieldCheck,
  Cpu,
  Sparkles,
  X,
  Layers,
  Calculator,
  Quote,
  Flame,
  BarChart3,
  Boxes,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Language, ActivePageView, IndustryScenarioId } from '../types';
import { translations } from '../translations';

interface MobileQuickDrawerProps {
  lang: Language;
  activeView: ActivePageView;
  selectedIndustry: IndustryScenarioId;
  isOpen: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
  onViewChange: (view: ActivePageView) => void;
  onSelectIndustry: (id: IndustryScenarioId) => void;
  onRequestDemo: (scenarioName?: string) => void;
  onOpenWhitepaper: () => void;
}

export const MobileQuickDrawer: React.FC<MobileQuickDrawerProps> = ({
  lang,
  activeView,
  selectedIndustry,
  isOpen,
  onToggleOpen,
  onClose,
  onViewChange,
  onSelectIndustry,
  onRequestDemo,
  onOpenWhitepaper,
}) => {
  const t = translations[lang];

  const handleNavigate = (action: () => void, targetElementId?: string) => {
    action();
    onClose();
    if (targetElementId) {
      setTimeout(() => {
        const el = document.getElementById(targetElementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  const getIndustryBadge = (id: IndustryScenarioId) => {
    switch (id) {
      case 'legal':
        return {
          icon: <Scale className="w-4 h-4 text-cyan-400" />,
          title: lang === 'en' ? 'Legal & Compliance' : '法律与法务合规',
          desc: lang === 'en' ? 'FRE 502 Privilege & NDA Protection' : 'FRE 502 律师特权保障 · 零泄密审查',
          tag: 'FRE 502',
          border: 'border-cyan-500/40',
          bg: 'bg-cyan-950/40',
        };
      case 'healthcare':
        return {
          icon: <HeartPulse className="w-4 h-4 text-purple-400" />,
          title: lang === 'en' ? 'Healthcare & Life Sciences' : '医疗与生命科学',
          desc: lang === 'en' ? 'HIPAA / PII De-identification' : 'HIPAA 临床病历保护 · 基因数据安全',
          tag: 'HIPAA',
          border: 'border-purple-500/40',
          bg: 'bg-purple-950/40',
        };
      case 'finance':
        return {
          icon: <Landmark className="w-4 h-4 text-emerald-400" />,
          title: lang === 'en' ? 'Finance & Quant' : '金融与量化资管',
          desc: lang === 'en' ? 'Proprietary Alpha & Audit Trail' : '量化策略私有化 · 投研数据零泄密',
          tag: 'FIN-SEC',
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-950/40',
        };
    }
  };

  const currentBadge = getIndustryBadge(selectedIndustry);

  return (
    <>
      {/* 1. Mobile Floating Bottom Bar (Sticky Dock) */}
      <div className="lg:hidden fixed bottom-4 inset-x-3 sm:inset-x-6 z-40 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto bg-zinc-950/90 border border-cyan-500/40 backdrop-blur-2xl rounded-2xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.2)] flex items-center justify-between gap-1 sm:gap-2 transition-all">
          {/* Button A: Open Drawer Hub */}
          <button
            onClick={onToggleOpen}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isOpen
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate">{lang === 'en' ? 'Explore' : '探索抽屉'}</span>
          </button>

          {/* Button B: Current Industry / Scenario Quick Switch */}
          {activeView === 'home' ? (
            <button
              onClick={() => {
                const next: IndustryScenarioId =
                  selectedIndustry === 'legal'
                    ? 'healthcare'
                    : selectedIndustry === 'healthcare'
                    ? 'finance'
                    : 'legal';
                onSelectIndustry(next);
                const el = document.getElementById('solutions');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 py-2 px-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 flex items-center justify-center gap-1.5 transition-all truncate cursor-pointer"
              title={lang === 'en' ? 'Click to toggle industry' : '点击快速切换行业'}
            >
              {currentBadge.icon}
              <span className="truncate">{currentBadge.tag}</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavigate(() => onViewChange('home'), 'solutions')}
              className="flex-1 py-2 px-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-1.5 transition-all truncate cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="truncate">{lang === 'en' ? 'Solutions' : '行业方案'}</span>
            </button>
          )}

          {/* Button C: View Mode Switcher */}
          <button
            onClick={() => {
              const target = activeView === 'home' ? 'products' : 'home';
              onViewChange(target);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 py-2 px-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 flex items-center justify-center gap-1.5 transition-all truncate cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="truncate">
              {activeView === 'home'
                ? (lang === 'en' ? 'Tech View' : '技术架构')
                : (lang === 'en' ? 'Home' : '方案首页')}
            </span>
          </button>

          {/* Button D: Quick Request Demo CTA */}
          <button
            onClick={() => onRequestDemo()}
            className="py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white flex items-center justify-center gap-1 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Demo' : '演示'}</span>
          </button>
        </div>
      </div>

      {/* 2. Bottom Sheet Drawer Modal (Full Categorized Navigation) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
          />

          {/* Drawer Content Card */}
          <div className="relative z-10 w-full max-h-[85vh] bg-zinc-950 border-t border-cyan-500/40 rounded-t-3xl p-5 sm:p-6 overflow-y-auto shadow-2xl flex flex-col gap-5 animate-slide-up">
            {/* Top Handle & Close Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px]">
                  <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center">
                    <Compass className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {lang === 'en' ? 'CovarAI Exploration Hub' : 'CovarAI 移动探索中心'}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    {lang === 'en' ? 'Quick Access to Scenarios & Architecture' : '快速切换行业方案与底层技术架构'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Page Mode Switcher Segmented Control */}
            <div>
              <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                {lang === 'en' ? 'Current Active View' : '当前浏览视图'}
              </div>
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
                <button
                  onClick={() => handleNavigate(() => onViewChange('home'))}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeView === 'home'
                      ? 'bg-cyan-500 text-black shadow-md glow-cyan'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Solutions Home' : '业务方案首页'}</span>
                </button>

                <button
                  onClick={() => handleNavigate(() => onViewChange('products'))}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeView === 'products'
                      ? 'bg-purple-600 text-white shadow-md glow-purple'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Products & Tech' : '产品与技术架构'}</span>
                </button>
              </div>
            </div>

            {/* Section A: 3 Vertical Industry Scenarios */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                <span>{lang === 'en' ? 'Industry Vertical Solutions' : '三大垂直行业落地方案'}</span>
                <span className="text-[10px] text-cyan-400">Tap to Switch</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {(['legal', 'healthcare', 'finance'] as IndustryScenarioId[]).map((id) => {
                  const badge = getIndustryBadge(id);
                  const isSelected = activeView === 'home' && selectedIndustry === id;
                  return (
                    <button
                      key={id}
                      onClick={() =>
                        handleNavigate(() => {
                          onViewChange('home');
                          onSelectIndustry(id);
                        }, 'solutions')
                      }
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? `${badge.border} ${badge.bg} ring-1 ring-cyan-400`
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                          {badge.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">
                              {badge.title}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-gray-300">
                              {badge.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {badge.desc}
                          </p>
                        </div>
                      </div>

                      {isSelected ? (
                        <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 shrink-0">
                          ACTIVE
                        </span>
                      ) : (
                        <ArrowRight className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section B: Enterprise Decisions & ROI */}
            <div>
              <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                {lang === 'en' ? 'Value, ROI & Decision Modules' : '企业商业价值与投资测算'}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() =>
                    handleNavigate(() => {
                      if (activeView !== 'home') onViewChange('home');
                    }, 'values')
                  }
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 text-left transition-all flex flex-col justify-between cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400 mb-1.5" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      {lang === 'en' ? '4 Core Pillars' : '四大核心价值'}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                      {lang === 'en' ? 'Privilege · Speed · TCO' : '特权 · 极速 · 低成本'}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() =>
                    handleNavigate(() => {
                      if (activeView !== 'home') onViewChange('home');
                    }, 'values')
                  }
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 text-left transition-all flex flex-col justify-between cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-purple-400 mb-1.5" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      {lang === 'en' ? 'TCO Calculator' : 'ROI 投资测算器'}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                      {lang === 'en' ? 'Compute ROI Model' : '算力成本节约估算'}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Section C: Deep-Tech Modules */}
            <div>
              <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                {lang === 'en' ? 'Deep-Tech & Cryptography' : '底层技术架构模块'}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() =>
                    handleNavigate(() => {
                      if (activeView !== 'products') onViewChange('products');
                    }, 'onion')
                  }
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 text-center transition-all cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-white">
                    {lang === 'en' ? 'Onion Defense' : '洋葱防御'}
                  </div>
                  <div className="text-[9px] text-gray-400 font-mono">3 Layers</div>
                </button>

                <button
                  onClick={() =>
                    handleNavigate(() => {
                      if (activeView !== 'products') onViewChange('products');
                    }, 'performance')
                  }
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 text-center transition-all cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-white">
                    {lang === 'en' ? '671B Benchmark' : '实测基准'}
                  </div>
                  <div className="text-[9px] text-gray-400 font-mono">&lt;3.5% Delta</div>
                </button>

                <button
                  onClick={() =>
                    handleNavigate(() => {
                      if (activeView !== 'products') onViewChange('products');
                    }, 'deployment')
                  }
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 text-center transition-all cursor-pointer"
                >
                  <Boxes className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-white">
                    {lang === 'en' ? 'Delivery' : '交付矩阵'}
                  </div>
                  <div className="text-[9px] text-gray-400 font-mono">SaaS / App</div>
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5 pb-4">
              <button
                onClick={() => {
                  onClose();
                  onRequestDemo();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.nav.requestDemo}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 font-mono py-1">
                <span>{t.nav.whitepaper} (v3.2 Spec)</span>
                <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-gray-400 border border-zinc-700">
                  {lang === 'en' ? 'UPDATING' : '更新中'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
